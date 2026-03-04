import { Router } from "express";
import {
  createOrder,
  getMyOrders,
  getAllOrders,
} from "./order.controller";
import { protect } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

// Buyer routes
router.post("/", protect, authorize("buyer"), createOrder);
router.get("/my", protect, authorize("buyer"), getMyOrders);

// Admin route
router.get("/", protect, authorize("admin"), getAllOrders);

export default router;