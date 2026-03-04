import { Router } from "express";
import {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProduct,
} from "./product.controller";
import { protect } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProduct);

// Seller routes
router.post("/", protect, authorize("seller"), createProduct);
router.put("/:id", protect, authorize("seller"), updateProduct);
router.delete("/:id", protect, authorize("seller"), deleteProduct);

export default router;