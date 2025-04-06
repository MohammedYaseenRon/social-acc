import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"
import upload from "../middleware/upload";
import { parse } from "path";


const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response): Promise<void> => {
   try {
    const { name, price, sku, stock,categoryName,isActive,status } = req.body;
    console.log("Body:", req.body); 
    const files = req.files as Express.Multer.File[]; 
    console.log("FILES:", req.files);


    if(!name || !price || !sku || !stock || !status || !categoryName) {
        res.status(400).json({ message: "All fields are required" });
        return
    }

    const images = files.map(file => (file as any).path); 

    let category = await prisma.category.findUnique({
        where:{
            name:categoryName.trim()
        }
    });
    if(!category) {
        category = await prisma.category.create({
            data:{
                name:categoryName.trim()
            }
        })
    }
    const product = await prisma.product.create({
        data:{
            name,
            price:parseFloat(price),
            sku,
            stock:parseInt(stock),
            images,
            isActive: isActive === "true" || isActive === true,
            status:status.toUpperCase().replace(' ','_'),
            categoryId:category.id
        },
    });
    res.status(201).json({ message: "Product added successfully", product });
} catch (error: any) {
    console.error("Error creating product:", error?.message);
    console.error("Stack:", error?.stack);
    console.error("Full Error Object:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await prisma.product.findMany({
            include: {
                Category: true
            },
        });
        res.status(200).json(products);
    }catch(error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProductsById = async (req: Request, res: Response): Promise<void> => {
    try{
        const {id} = req.params;
        const products = await prisma.product.findUnique({
            where:{
                id:Number(id)
            },
            include:{
                Category:true
            }
        });
        res.status(200).json(products);
    }catch(error) { 
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try{
        const { id } = req.params;
        const { name, price, sku, stock, images,vendorId,categoryId,isActive } = req.body;
        const product = await prisma.product.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                price,
                sku,
                stock,
                images,
                isActive,
                categoryId
            },
        });
        res.status(200).json({ message: "Product updated successfully", product });
    }catch(error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try{
        const {id} = req.params;
        const product = await prisma.product.delete({
            where:{
                id:Number(id)
            },
            include:{
                Category:true
            }
        });
        res.status(200).json({ message: "Product deleted successfully", product });
    }catch(error) {
        res.status(500).json({ message: "Internal server error" });
    }
}