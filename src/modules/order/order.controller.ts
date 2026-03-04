import { Response } from "express";
import Order from "./order.model";
import Cart from "../cart/cart.model";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { payment_method, shipping_address } = req.body;

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const expected_delivery = new Date();
    expected_delivery.setDate(expected_delivery.getDate() + 5);

    const order = await Order.create({
      user: req.user.id,
      items: cart.items,
      payment_method,
      shipping_address,
      expected_delivery,
    });

    cart.items = [];
    await cart.save();

    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "items.product"
    );

    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getAllOrders = async (_: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.product");

    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};