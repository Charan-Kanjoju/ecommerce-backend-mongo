import { Response } from "express";
import Cart from "./cart.model";
import Product from "../product/product.model";
import { AuthRequest } from "../../middlewares/auth.middleware";

/**
 * ADD TO CART
 */
export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body;

    const qty = Number(quantity);

    if (!productId || isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: "Invalid product or quantity" });
    }

    const product = await Product.findById(productId);
    if (!product || product.price === undefined) {
      return res.status(404).json({ message: "Product not found" });
    }

    const price = Number(product.price);

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = await Cart.create({ user: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += qty;
      existingItem.total_price = existingItem.quantity * price;
    } else {
      cart.items.push({
        product: product._id,
        quantity: qty,
        total_price: qty * price,
      });
    }

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Add To Cart Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * UPDATE CART ITEM
 */
export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const qty = Number(quantity);

    if (isNaN(qty) || qty <= 0) {
      return res.status(400).json({ message: "Invalid quantity" });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart)
      return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    const product = await Product.findById(productId);
    if (!product || product.price === undefined)
      return res.status(404).json({ message: "Product not found" });

    const price = Number(product.price);

    item.quantity = qty;
    item.total_price = qty * price;

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Update Cart Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * REMOVE CART ITEM
 */
export const removeCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart)
      return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Remove Cart Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET CART
 */
export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate(
      "items.product"
    );

    if (!cart)
      return res.status(404).json({ message: "Cart not found" });

    return res.status(200).json(cart);
  } catch (error) {
    console.error("Get Cart Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};