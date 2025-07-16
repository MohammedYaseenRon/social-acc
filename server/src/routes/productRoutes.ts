import { Router } from "express";
import { createProduct, getProducts, getProductsById, updateProduct, deleteProduct, getProductsByCategory, getProductsBySlug, getVendorProducts } from "../controller/productController";
import upload from "../middleware/upload";
import { authenticateToken, requireVendor } from "../middleware/auth";

const router = Router();

router.post("/", upload.array('images'),authenticateToken, createProduct);
router.get("/", getProducts);
router.get("/vendor",authenticateToken, requireVendor, getVendorProducts);
router.get("/:id", getProductsById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/category/:id", getProductsByCategory);
router.get("/details/:slug", getProductsBySlug);



export default router;