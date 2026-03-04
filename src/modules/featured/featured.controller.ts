import { Request, Response } from "express";
import Featured from "./featured.model";
import Product from "../product/product.model";

export const markAsFeatured = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    const existing = await Featured.findOne({ product: productId });
    if (existing)
      return res.status(400).json({ message: "Already featured" });

    const featured = await Featured.create({ product: productId });

    return res.status(201).json(featured);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getFeaturedProducts = async (_: Request, res: Response) => {
  try {
    const featured = await Featured.find().populate("product");
    return res.json(featured);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};