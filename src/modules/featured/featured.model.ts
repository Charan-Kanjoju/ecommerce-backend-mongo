import mongoose, { Schema, Document } from "mongoose";

export interface IFeatured extends Document {
  product: mongoose.Types.ObjectId;
}

const featuredSchema = new Schema<IFeatured>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product" },
  },
  { timestamps: true }
);

export default mongoose.model<IFeatured>("Featured", featuredSchema);