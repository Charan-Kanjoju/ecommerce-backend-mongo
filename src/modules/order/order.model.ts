import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: {
    product: mongoose.Types.ObjectId;
    quantity: number;
    total_price: number;
  }[];
  payment_method: string;
  expected_delivery: Date;
  shipping_address: string;
}

const orderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    items: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: Number,
        total_price: Number,
      },
    ],
    payment_method: String,
    expected_delivery: Date,
    shipping_address: String,
  },
  { timestamps: true }
);

export default mongoose.model<IOrder>("Order", orderSchema);