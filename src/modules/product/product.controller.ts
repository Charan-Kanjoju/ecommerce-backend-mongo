import { Response } from "express";
import Product from "./product.model";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const createProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.create({
      ...req.body,
      seller: req.user.id,
    });

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.seller.toString() !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });

    Object.assign(product, req.body);
    await product.save();

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    if (product.seller.toString() !== req.user.id)
      return res.status(403).json({ message: "Forbidden" });

    await product.deleteOne();
    return res.json({ message: "Product deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getProducts = async (_: any, res: Response) => {
  try {
    const products = await Product.find().populate("seller", "name");
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getProduct = async (req: any, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });

    return res.json(product);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};