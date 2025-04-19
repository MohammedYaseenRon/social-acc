import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();


export const addToCart = async (req: Request, res: Response): Promise<void> => {
    const userId = req.user?.id;
    const { quantity, productId } = req.body;

    if (!userId || !productId || !quantity) {
        res.status(400).json({ message: "Missing fields" });
        return;
    }
    try {
        let cart = await prisma.cart.findUnique({
            where: {
                userId
            }
        })
        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId
                },
            });

        }

        const existingItem = await prisma.cartItem.findUnique({
            where: {
                productId_cartId: {
                    productId,
                    cartId: cart.id
                }
            }
        })
        if (existingItem) {
            await prisma.cartItem.update({
                where: {
                    id: existingItem.id
                },
                data: {
                    quantity: existingItem.quantity + quantity
                }

            });
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    productId,
                    quantity
                }
            });
        }
        res.status(200).json({ message: "Item added to cart" });
    } catch (error) {
        console.error("Add to cart error", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const getCart = async (req: Request, res: Response): Promise<void> => {
        const userId = req.user?.id;
        if (!userId) {
            res.status(400).json({ message: "Missing fields" });
            return;
        }
    try {
        const cart = await prisma.cart.findUnique({
            where: {
                userId
            },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }
        res.status(200).json(cart);

    } catch (error) {
        console.error("Get cart error", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const updateCartItem = async (req: Request, res: Response): Promise<void> => {
    const itemsId = parseInt(req.params.itemsId)
    const { quantity } = req.body;

    try {
        const updateItem = await prisma.cartItem.update({
            where: {
                id: itemsId
            },
            data: {
                quantity
            }
        });
        res.status(200).json({ message: "Cart item updated" });
    } catch (error) {
        console.error("Get cartItem update error", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const removeCartItem = async (req: Request, res: Response): Promise<void> => {
    const itemId = parseInt(req.params.itemId)
    try {
        const cartItem = await prisma.cartItem.delete({
            where: {
                id: itemId
            },
        });
        res.status(200).json({ message: "Successfully removed a item from cart", cartItem });
    } catch (error) {
        console.error("Remove cart item error", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const clearCart = async (req: Request, res: Response): Promise<void> => {
    const userId = parseInt(req.params.userId)
    try {
        const cart = await prisma.cart.findUnique({
            where: {
                userId
            }
        });
        if (!cart) {
            res.status(404).json({ message: "Cart not found" });
            return;
        }

        await prisma.cartItem.deleteMany({
            where: {
                cartId: cart.id
            }
        });
        res.status(200).json({ message: "Removed all Items from cart" });
    } catch (error) {
        console.error("Clear cart error", error);
        res.status(500).json({ message: "Internal server error" });
    }
}


