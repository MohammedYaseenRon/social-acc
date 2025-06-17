import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;

    if (!userId) {
        res.status(401).json({ message: "Unauthorized: User ID missing" });
        return;
    }

    try {
        const { name, price, sku, stock, categoryName, isActive, status } = req.body;
        const files = req.files as Express.Multer.File[];

        const vendor = await prisma.vendor.findUnique({
            where: { userId: userId },
        });

        if (!vendor) {
            res.status(403).json({ message: "Vendor profile not found for this user" });
            return;
        }

        if (!name || !price || !sku || !stock || !status || !categoryName) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }

        const images = files.map(file => (file as any).path);

        let category = await prisma.category.findUnique({
            where: { name: categoryName.trim() }
        });

        if (!category) {
            category = await prisma.category.create({
                data: { name: categoryName.trim() }
            });
        }

        const product = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
                sku,
                stock: parseInt(stock),
                images,
                isActive: isActive === "true" || isActive === true,
                status: status.toUpperCase().replace(' ', '_'),
                categoryId: category.id,
                vendorId: vendor.id
            },
            include: {
                category: true
            }
        });

        res.status(201).json({ message: "Product added successfully", product });
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error" });
    }
};


export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            sortBy,
            status,
            page: pageStr = "1",
            limit: limitStr = "10"
        } = req.query as Record<string, string>;

        const pageNum = Math.max(1, parseInt(pageStr, 10));
        const limitNum = Math.max(1, parseInt(limitStr, 10));

        const filters: any = {};
        if (category) {
            const foundCategory = await prisma.category.findUnique({
                where: {
                    name: category
                },
            });

            if (foundCategory) {
                filters.categoryId = foundCategory.id;
            }
        }

        if (minPrice || maxPrice) {
            filters.price = {};
            if (minPrice) filters.price.gte = parseFloat(minPrice);
            if (maxPrice) filters.price.gte = parseFloat(maxPrice);

        }

        if (status) {
            filters.status = status.toUpperCase();
        }

        const sortMap: Record<string, any> = {
            price_asc: { price: "asc" },
            price_desc: { price: "desc" },
            name_asc: { name: "asc" },
            name_desc: { name: "desc" },
            latest: { createdAt: "desc" }
        };

        const products = await prisma.product.findMany({
            where: filters,
            include: {
                category: true,
                Vendor: {
                    select: {
                        id: true,
                        storeName: true
                    }
                }
            },
            orderBy: sortMap[sortBy || "latest"],
            skip: (pageNum - 1) * limitNum,
            take: limitNum
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProductsById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const products = await prisma.product.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                category: true
            }
        });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, price, sku, stock, images, vendorId, categoryId, isActive } = req.body;
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
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const product = await prisma.product.delete({
            where: {
                id: Number(id)
            },
            include: {
                category: true
            }
        });
        res.status(200).json({ message: "Product deleted successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getProductsByCategory = async (req: Request, res: Response): Promise<void> => {
    const { name } = req.params;


    if (!name) {
        res.status(400).json({ message: "Category name is required" });
        return;
    }

    try {
        const category = await prisma.category.findUnique({
            where: {
                name
            },
        });
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        const products = await prisma.product.findMany({
            where: {
                categoryId: category.id
            },

            include: {
                category: {
                    include: {
                        subcategories: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                },
                Vendor: true
            }
        })


        res.status(200).json({
            category: category.name,
            products
        });
    } catch (error) {
        console.log("Error while getting products by category", error)
        res.status(500).json({ message: "Server error while getting prodcts by category" });
    }
}
