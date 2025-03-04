import { Request, Response, NextFunction } from "express";
import { Post } from "../Types/Post";

export class PostController {
    public static async createPost(req: Request, res: Response, next: NextFunction): Promise<Post | any> {
        try {
            
        } catch (error) {
            return res.status(500).json({error});
        }
    }
}