import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  product_img: string;
  price: number;
  seller: mongoose.Types.ObjectId;
}

const productSchema = new Schema<IProduct>(
  {
    title: String,
    description: String,
    product_img: String,
    price: Number,
    seller: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export default mongoose.model<IProduct>("Product", productSchema);