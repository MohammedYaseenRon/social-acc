import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient();

export const getAllCategories = async (req: Request, res: Response): Promise<void> => {
    try{
        const categories = await prisma.category.findMany({
            select:{
                id:true,
                name:true
            },
            orderBy:{
                name:"asc"
            }
        });
        res.status(200).json(categories);
    }catch(error) {
        res.status(500).json({ message: "Failed to fetch categories" });
    }
}