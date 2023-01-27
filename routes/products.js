import Product from "../models/product.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);

  } catch (error) {
    console.log(error.message);
    res.status(500).send("Error: " + error.message);
  }
});

export default router;
