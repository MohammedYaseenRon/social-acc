import { Router } from "express";
import { createOrder, getOrders, getVendorOrder } from "../controller/orderController";
import { authenticateToken, requireVendor } from "../middleware/auth";

const router = Router();


router.post("/", createOrder);
router.get("/", getOrders);
router.get("/vendor", authenticateToken, requireVendor, getVendorOrder);

export default router;
