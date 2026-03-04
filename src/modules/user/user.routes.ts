import { Router } from "express";
import { protect } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
import {
  getProfile,
  addAddress,
  getAllUsers,
} from "./user.controller";

const router = Router();

// Get logged-in user profile
router.get("/profile", protect, getProfile);

// Add address (buyer/seller/admin)
router.post("/address", protect, addAddress);

// Admin: Get all users
router.get("/", protect, authorize("admin"), getAllUsers);

export default router;