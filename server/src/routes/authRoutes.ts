import { Router } from "express";
import { RegisterUser, LoginUser,forgotPassword,getAuthMe,RequestVendorAccess,getAllVendorRequest,updateVendorRequest } from "../controller/authController";
import { authenticateToken,requireAdmin } from "../middleware/auth";

const router = Router();


router.post("/register", RegisterUser);
router.post("/login", LoginUser);   
router.post("/forgot-password", forgotPassword);
router.get("/me", authenticateToken, getAuthMe);

//vendor
router.post("/vendor",authenticateToken,RequestVendorAccess);
router.get("/vendor", authenticateToken,requireAdmin,getAllVendorRequest);
router.put("/vendor/:id", authenticateToken,requireAdmin, updateVendorRequest);


export default router;
