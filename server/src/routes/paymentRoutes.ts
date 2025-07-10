import  { Router } from "express";
import { createRazorOrder } from "../controller/paymentController";

const router = Router();

router.post("/create-order", createRazorOrder);


export default router;
