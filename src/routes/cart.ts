import express, { Request, Response } from 'express';
import CartProduct from '../models/cartProduct';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const cartProducts = await CartProduct.find();
    res.send(cartProducts);
  } catch (error: any) {
    res.status(500).send('Error: ' + error.message);
  }
});

router.delete('/:id/delete', async (req: Request, res: Response) => {
  try {
    await CartProduct.deleteOne({ id: req.params.id });

    const cartProducts = await CartProduct.find();
    res.send(cartProducts);
  } catch (error: any) {
    res.status(404).send({ error: "Product doesn't exist!" });
  }
});

router.put('/:id/add', async (req: Request, res: Response) => {
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
        quantity: quantity,
      });

      await cartProduct.save();
      return res.send(cartProduct);
    }

    await product.updateOne({
      $inc: { quantity: quantity },
    });

    const cartProducts = await CartProduct.find();
    res.send(cartProducts);
  } catch (error: any) {
    res.status(404).send({ error: "Product doesn't exist!" });
  }
});

router.put('/:id/increaseQuantity', async (req: Request, res: Response) => {
  try {
    const product = await CartProduct.findOne({ id: req.params.id });

    await product?.updateOne({
      $inc: { quantity: 1 },
    });

    const updatedProducts = await CartProduct.find();
    res.send(updatedProducts);
  } catch (error: any) {
    res.status(404).send({ error: "Product doesn't exist!" });
  }
});

router.put('/:id/decreaseQuantity', async (req: Request, res: Response) => {
  try {
    const product = await CartProduct.findOne({ id: req.params.id });

    await product?.updateOne({
      $inc: { quantity: -1 },
    });

    const updatedProducts = await CartProduct.find();
    res.send(updatedProducts);
  } catch (error: any) {
    res.status(404).send({ error: "Product doesn't exist!" });
  }
});

export default router;
