import mongoose from "mongoose";

const cartProductSchema = new mongoose.Schema(
  {
    _id: Number,
    id: Number,
    author: String,
    title: String,
    price: Number,
    imageURL: String,
    quantity: Number
  },
  {
    value: String,
    _id: false
  }
);

const CartProduct = mongoose.model("CartProduct", cartProductSchema);

export default CartProduct;
