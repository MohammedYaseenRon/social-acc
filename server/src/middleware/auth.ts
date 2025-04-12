import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface JwtPayload {
  userId: number;
  role: string;
}
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: number;
        role: string;
      };
    }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {

  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, role: true },
    });


    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    req.user = { id: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    console.log("Error in authentication", error);
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
}

export const requireVendor = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    console.log("No user object in request");
    res.status(403).json({ message: "Access Denied" });
    return;
  }

  if (req.user.role !== "VENDOR") {
    res.status(403).json({ message: "Access Denied" });
    return;
  }
  next();
};

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {

  if (!req.user || req.user.role !== "ADMIN") {
    res.status(403).json({ message: "Access Denied" });
    return;
  }
  next();
};