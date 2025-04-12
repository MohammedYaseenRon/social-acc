import { Router } from "express";
import { RegisterUser, LoginUser,forgotPassword,getAuthMe,createVendorProfile,updateVendorProfile,getVendorByUserId,RequestVendorAccess,getAllVendorRequest,updateVendorRequest, getVendorProfile } from "../controller/authController";
import { authenticateToken,requireAdmin, requireVendor } from "../middleware/auth";

const router = Router();


router.post("/register", RegisterUser);
router.post("/login", LoginUser);   
router.post("/forgot-password", forgotPassword);
router.get("/me", authenticateToken, getAuthMe);
router.get("/vendor/:userId", getVendorByUserId);
//vendor

router.post("/create/profile", authenticateToken,requireVendor, createVendorProfile);
router.get("/profile", authenticateToken,requireVendor, getVendorProfile);
router.put("/update/profile", authenticateToken,requireVendor, updateVendorProfile);
router.post("/vendor",authenticateToken,RequestVendorAccess);
router.get("/vendor", authenticateToken,requireAdmin,getAllVendorRequest);
router.put("/vendor/:id", authenticateToken,requireAdmin, updateVendorRequest);


export default router;
