import { Request, Response, NextFunction } from "express";

export class AuthMiddleware {
    
    public static async auth(req: Request, res: Response, next: NextFunction): Promise<void | any> {
        if (!req.session || !req.session.id_user || !req.session.id_role) {
            return res.status(401).json({ message: "Non autorisé" });
        }
        next();
    }
}