import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const prisma = new PrismaClient();

export const RegisterUser = async (req: Request, res: Response): Promise<void> =>  {
    const {name,email,password} = req.body;
    if (!name || !email || !password) {
        res.status(400).json({message:"Please fill all the fields"});
        return
    }

    try {
        const existing = await prisma.user.findUnique({
            where:{
                email:email
            }
        });
        if(existing) {
            res.status(400).json({message:"User already exists"});
            return;
        }

        const JWT_SECRET = process.env.JWT_SECRET;
        if(!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data:{
                name,
                email,
                password:hashedPassword,
                role:"USER",
            }
        })
        const token = jwt.sign(
            {userId:user.id, role:user.role},
            JWT_SECRET,
            {expiresIn:"1d"}
        )
        res.status(201).json({message:"User created successfully",token,user:{id:user.id,name:user.name,email:user.email,role:user.role}});
    }catch(error) {
        console.log("Error in creating user",error);
        res.status(500).json({message:"Internal server error"});    
    }
}

export const LoginUser = async (req: Request, res: Response): Promise<void> => {
    const {email,password} = req.body;
    if(!email || !password) {
        res.status(400).json({message:"Please fill all the fields"});
        return;
    }
    try {
        const user = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(!user) {
            res.status(400).json({message:"User not found"});
            return;
        }

        const validatePassword = await bcrypt.compare(password, user.password);
        if(!validatePassword) {
            res.status(400).json({message:"Invalid password"});
            return;
        }
        const JWT_SECRET = process.env.JWT_SECRET;
        if(!JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign({
            userId:user.id,
            role:user.role
        },JWT_SECRET,{expiresIn: "1d"});
        res.status(200).json({message:"User logged in successfully",token,user:{id:user.id,name:user.name,email:user.email,role:user.role}});
    }catch(error) {
        console.log("Error in login user",error);
        res.status(500).json({message:"Internal server error"});
    }
} 

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
    const {email} = req.body;
    if(!email) {
        res.status(400).json({message:"Please fill all the fields"});
        return;
    }

    try{
        const user = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if (!user){
            res.status(400).json({message:"User not found"});
            return;
        } 
        const JWT_SECRET = process.env.JWT_SECRET;
        if(!JWT_SECRET) {   
            throw new Error("JWT_SECRET is not defined");
        }
        const token = jwt.sign({
            userId:user.id,role:user.role

        },JWT_SECRET,{expiresIn:"1d"});

        // send email to user with the link
        const link = `http://localhost:3000/reset-password/${user.id}/${token}`;
        console.log("link",link);
        
        res.status(200).json({message:"Password reset link sent to your email",link});
    }catch(error) {
        console.log("Error in forgot password",error);
        res.status(500).json({message:"Internal server error"});
    }
}


//Vendor auth 

export const RequestVendorAccess = async (req: Request, res: Response): Promise<void> => {
    
}