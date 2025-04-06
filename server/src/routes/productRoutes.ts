import { Router } from "express";
import { createProduct, getProducts, getProductsById, updateProduct, deleteProduct } from "../controller/productController";
import upload from "../middleware/upload";

const router = Router();

router.post("/", upload.array('images'), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductsById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;