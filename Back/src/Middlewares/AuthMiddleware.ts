import { Request, Response, NextFunction } from "express";
import { Auth } from "../Tools/Auth";

export class AuthMiddleware {
    
    public static async authenticateJWT(req: Request, res: Response, next: NextFunction): Promise<void | any> {
        const token = req.cookies.token
        console.log(token)
        if (!token) {
          res.status(401).json({ message: "Accès non autorisé" });
          return;
        }
    
        const decoded = Auth.verifyToken(token);
        if (!decoded) {
          res.status(403).json({ message: "Token invalide" });
          return;
        }
    
        req.user = {
            id_user: decoded.user_id,
            id_role: decoded.role_id
          };
        next();
    }
}