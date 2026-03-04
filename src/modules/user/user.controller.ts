import { Response } from "express";
import User from "./user.model";
import { AuthRequest } from "../../middlewares/auth.middleware";

export const getProfile = async (req: AuthRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user)
      return res.status(404).json({ message: "User not found" });

    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const addAddress = async (req: AuthRequest, res: Response) => {
  try {
    const { street, city, state, country, pincode } = req.body;

    const user = await User.findById(req.user.id);
    if (!user)
      return res.status(404).json({ message: "User not found" });

    user.addresses.push({ street, city, state, country, pincode });
    await user.save();

    return res.json({ message: "Address added", addresses: user.addresses });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getAllUsers = async (_: AuthRequest, res: Response) => {
  try {
    const users = await User.find().select("-password");
    return res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error });
  }
};