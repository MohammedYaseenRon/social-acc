import { Router } from "express";
import { getAllCategories } from "../controller/categoryController";
const router = Router();


router.get("/", getAllCategories);


export default router;

