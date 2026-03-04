import mongoose, { Document, Schema } from "mongoose";

export interface IAddress {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "buyer" | "seller" | "admin";
  addresses: IAddress[];
}

const addressSchema = new Schema<IAddress>({
  street: String,
  city: String,
  state: String,
  country: String,
  pincode: String,
});

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["buyer", "seller", "admin"], default: "buyer" },
    addresses: [addressSchema],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);