import { Router } from "express";
import {
  addToCart,
  updateCartItem,
  removeCartItem,
  getCart,
} from "./cart.controller";
import { protect} from "../../middlewares/auth.middleware";
import { authorize } from "../../middlewares/role.middleware";
    
const router = Router();

router.use(protect);
router.use(authorize("buyer"));

router.post("/", addToCart);
router.put("/:productId", updateCartItem);
router.delete("/:productId", removeCartItem);
router.get("/", getCart);

export default router;