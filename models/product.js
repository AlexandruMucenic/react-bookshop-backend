import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  id: Number,
  author: String,
  imageURL: String,
  title: String,
  price: Number
});

const Product = mongoose.model("Product", productSchema);

export default Product;
