// routes/cartRoutes.ts
import express from "express";
import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from "../controller/cartController";
import { authenticateToken } from "../middleware/auth";

const router = express.Router();

router.post("/add", authenticateToken, addToCart);
router.get("/",authenticateToken, getCart);
router.patch("/item/:itemId", updateCartItem);
router.delete("/item/:itemId", removeCartItem);
router.delete("/:userId", clearCart);

export default router;
