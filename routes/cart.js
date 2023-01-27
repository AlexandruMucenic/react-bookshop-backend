import express from "express";
import CartProduct from "../models/cartProduct.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cartProducts = await CartProduct.find();
    res.send(cartProducts);

  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

router.delete("/:id/delete", async (req, res) => {
  try {
    await CartProduct.deleteOne({ id: req.params.id });

    const cartProducts = await CartProduct.find();
    res.send(cartProducts);

  } catch (error) {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

router.put("/:id/add", async (req, res) => {
  try {
    const { id, author, title, imageURL, price, quantity } = req.body;
    const product = await CartProduct.findOne({ id: req.params.id });

    if (!product) {
      const cartProduct = new CartProduct({
        _id: id,
        id: id,
        author: author,
        title: title,
        price: price,
        imageURL: imageURL,
        quantity: quantity
      });

      await cartProduct.save();
      return res.send(cartProduct);
    }

    await product.updateOne({
      $inc: { quantity: quantity }
    });

    const cartProducts = await CartProduct.find();
    res.send(cartProducts);

  } catch (error) {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

router.put("/:id/increaseQuantity", async (req, res) => {
  try {
    const product = await CartProduct.findOne({ id: req.params.id });

    await product.updateOne({
      $inc: { quantity: 1 }
    });

    const updatedProducts = await CartProduct.find();
    res.send(updatedProducts);

  } catch (error) {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

router.put("/:id/decreaseQuantity", async (req, res) => {
  try {
    const product = await CartProduct.findOne({ id: req.params.id });

    await product.updateOne({
      $inc: { quantity: -1 }
    });

    const updatedProducts = await CartProduct.find();
    res.send(updatedProducts);

  } catch (error) {
    res.status(404);
    res.send({ error: "Product doesn't exist!" });
  }
});

export default router;
