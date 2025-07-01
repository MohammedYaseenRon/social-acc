import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const SearchProduct = async (req: Request, res: Response): Promise<void> => {

    try {

        //query
        const {
            query = "",
            category,
            minPrice,
            maxPrice,
            sort,
            page: pageStr = "1",
            limit: limitStr = "10",
        } = req.query as Record<string, string>;

        const pageNum = Math.max(1, parseInt(pageStr, 10));
        const limitNum = Math.max(1, parseInt(limitStr, 10));

        //filter
        const filters: any = {
            OR: [
                {name: {contains: query, mode: "insensitive"}},
                {
                    category: {
                        name:{contains: query, mode: "insensitive"}
                    }
                }
            ]
        }

        if(category) {
            filters.category = {name: {equals: category, mode: "insensitive"}}
        }
        if(minPrice || maxPrice) {
            filters.price = {};
            if(minPrice)  filters.price.gte = parseFloat(minPrice);
            if(maxPrice) filters.price.gte = parseFloat(maxPrice);
        }

        const sortMap: Record<string,any> = {
            price_asc: {price: "asc"},
            price_desc: {price: "asc"},
            name_asc: {price: "asc"},
            name_desc: {price: "asc"},
            latest: {createdAt: "desc"}

        }


        const products = await prisma.product.findMany({
            where: filters,
            orderBy: sortMap[sort || "latest"],
            include:{
                category:true,
                vendor:{
                    select:{
                        id:true,
                        storeName:true
                    }
                }
            },
            skip: (pageNum - 1) * limitNum,
            take: limitNum,
        });
        res.status(200).json({ message: "Searched product is this...", products })
    } catch (error) {
        res.status(500).json("Internal server error while searching products");
    }
}