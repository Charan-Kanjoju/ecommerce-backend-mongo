import { Router } from "express";
import {
  markAsFeatured,
  getFeaturedProducts,
} from "./featured.controller";
import { protect } from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";

const router = Router();

// Public
router.get("/", getFeaturedProducts);

// Admin only
router.post("/:productId", protect, authorize("admin"), markAsFeatured);

export default router;