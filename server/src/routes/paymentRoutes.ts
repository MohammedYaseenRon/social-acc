import  { Router } from "express";
import { createRazorOrder, verify } from "../controller/paymentController";

const router = Router();

router.post("/create-order", createRazorOrder);
router.post("/verify", verify);

export default router;
