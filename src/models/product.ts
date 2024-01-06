import mongoose, { Document, Schema } from 'mongoose';

interface IProduct extends Document {
  id: number;
  author: string;
  imageURL: string;
  title: string;
  price: number;
}

const productSchema = new Schema<IProduct>({
  id: { type: Number, required: true },
  author: { type: String, required: true },
  imageURL: { type: String, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
