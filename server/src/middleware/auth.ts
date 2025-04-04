import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


interface JwtPayload {
    userId: number;
    role:string;
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


export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if(!token) {
        res.status(401).json({message:"Unauthorized"});
        return;
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = {id:decoded.userId, role:decoded.role};
        console.log("User authenticated",req.user);
        next

    }catch(error) {
        console.log("Error in authentication",error); 
        res.status(401).json({message:"Unauthorized"});
        return;

    }
}