import { Request, Response } from "express";
import { PrismaClient, RequestStatus } from "@prisma/client"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const prisma = new PrismaClient();

export const RegisterUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password,role } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ message: "Please fill all the fields" });
        return
    }

    try {
        const existing = await prisma.user.findUnique({
            where: {
                email: email
            }
        });
        if (existing) {
            res.status(400).json({ message: "User already exists" });
            return;
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: role?.toUpperCase() === "VENDOR" ? "VENDOR" : "USER",
            }
        });

        if(user.role === "VENDOR") {
            await prisma.vendorRequest.create({
                data:{
                    userId:user.id,
                    status: "PENDING",
                }
            });
        }
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        )
        res.status(201).json({ message: "User created successfully", token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.log("Error in creating user", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const LoginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "Please fill all the fields" });
        return;
    }
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        const validatePassword = await bcrypt.compare(password, user.password);
        if (!validatePassword) {
            res.status(400).json({ message: "Invalid password" });
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign({
            userId: user.id,
            role: user.role
        }, JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ message: "User logged in successfully", token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (error) {
        console.log("Error in login user", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getAuthMe = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            },
        });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error })
    }
}

export const getVendorByUserId = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.userId);

    if (!userId) {
        res.status(400).json({ message: "User id is required" });
        return;
    }


    try {
        const vendor = await prisma.vendor.findUnique({
            where: {
                userId
            },
        });
        if (!vendor) {
            res.status(404).json({ message: "Vendor id is required", vendor });
        }

        res.status(200).json({ message: "Successfully got vendor id", })
    } catch (error) {
        res.status(500).json({ message: 'Error while getting vendor id or Internal server error', error });
    }

}

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: "Please fill all the fields" });
        return;
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        if (!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign({
            userId: user.id, role: user.role

        }, JWT_SECRET, { expiresIn: "1d" });

        // send email to user with the link
        const link = `http://localhost:3000/reset-password/${user.id}/${token}`;
        console.log("link", link);

        res.status(200).json({ message: "Password reset link sent to your email", link });
    } catch (error) {
        console.log("Error in forgot password", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


//Vendor auth 

export const RequestVendorAccess = async (req: Request, res: Response): Promise<void> => {
    console.log("Vendor request route hit");
    console.time("Vendor request time");
    const userId = req.user?.id;
    console.log("Vendor request started for user:", userId);
    if (!userId) {
        res.status(400).json({ error: "User ID not found in request" });
        return;
    }

    try {
        const existingVendor = await prisma.vendor.findUnique({
            where: {
                userId
            }
        });

        if (existingVendor) {
            res.status(400).json({ error: "You are already a vendor." });
            return;
        }

        const existingVendorRequest = await prisma.vendorRequest.findUnique({
            where: {
                userId
            }
        });
        if (existingVendorRequest) {
            res.status(400).json({ error: "Vendor request already submitted." });
            return;
        }

        const request = await prisma.vendorRequest.create({
            data: {
                userId,
                status: RequestStatus.PENDING
            },
        });

        res.status(201).json({ message: "Vendor request submitted.", request });
    } catch (error) {
        console.error("Vendor request error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
}

export const getAllVendorRequest = async (req: Request, res: Response): Promise<void> => {
    if (!req.user || req.user.role !== "ADMIN") {
        res.status(403).json({ message: "Access Denied" });
        return;
    }

    try {
        const vendorRequest = await prisma.vendorRequest.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true
                    },
                },
            },
            orderBy: {
                createdAt: "desc"
            }
        });
        res.status(200).json(vendorRequest);
    } catch (error) {
        console.error("Error fetching vendor requests", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateVendorRequest = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { status } = req.body;

    if (!req.user || req.user.role !== "ADMIN") {
        res.status(403).json({ message: "Access Denied" });
        return;
    }

    if (!["APPROVED", "REJECTED"].includes(status)) {
        res.status(400).json({ message: "Invalid status" });
        return;
    }

    try {
        const updateRequest = await prisma.vendorRequest.update({
            where: {
                id: parseInt(id)
            },
            data: {
                status: RequestStatus.ACCEPTED,
                updatedAt: new Date(),
            },
        });

        if (status === "APPROVED") {
            await prisma.user.update({
                where: { id: updateRequest.userId },
                data: { role: "VENDOR" },
            });
        }

        res.status(200).json({ message: `Request ${status.toLowerCase()} successfully`, updateRequest });
    } catch (error) {
        console.error("Error updating vendor request:", error);
        res.status(500).json("Error while updating status");
    }
}

export const updateVendorProfile = async (req: Request, res: Response): Promise<void> => {
    const { storeName, storeDescription, logo } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        res.status(400).json({ message: "User ID not found" });
        return;
    }

    try {
        const vendor = await prisma.vendor.findUnique({
            where: { userId }
        });

        if (!vendor) {
            res.status(404).json({ message: "Vendor not found" });
            return;
        }

        const updatedVendor = await prisma.vendor.update({
            where: { userId },
            data: {
                storeName,
                storeDescription,
                logo
            }
        });

        res.status(200).json({ message: "Vendor profile updated successfully", updatedVendor });
    } catch (error) {
        console.error("Error updating vendor profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const createVendorProfile = async (req: Request, res: Response): Promise<void> => {
    const { storeName, storeDescription, logo } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        res.status(400).json({ message: "User ID not found" });
        return;
    }

    try {
        const existingVendor = await prisma.vendor.findUnique({
            where: { userId }
        });

        if (existingVendor) {
            res.status(400).json({ message: "Vendor profile already exists" });
            return;
        }

        const newVendor = await prisma.vendor.create({
            data: {
                userId,
                storeName,
                storeDescription,
                logo
            }
        });

        res.status(201).json({ message: "Vendor profile created successfully", newVendor });
    } catch (error) {
        console.error("Error creating vendor profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getVendorProfile =  async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id;

        const vendor = await prisma.vendor.findUnique({
            where: {
                id: userId
            },
            include:{
                products:true,
                Order:true
            }
        });
        if (!vendor) {
            res.status(404).json({ error: "User not found" });
            return;
        }
        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error })
    }
}
