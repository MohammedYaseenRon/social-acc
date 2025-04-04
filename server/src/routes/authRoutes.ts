import { Router } from "express";
import { RegisterUser, LoginUser,forgotPassword } from "../controller/authController";


const router = Router();


router.post("/register", RegisterUser);
router.post("/login", LoginUser);   
router.post("/forgot-password", forgotPassword);


export default router;
