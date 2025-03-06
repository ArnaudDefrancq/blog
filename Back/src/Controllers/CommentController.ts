import { Request, Response, NextFunction } from "express";

export class CommentController {
    public static async createComment(req: Request, res: Response, next: NextFunction): Promise<number | any> {
        try {

        } catch (error) {
            return res.status(500).json({error});
        }
    }
}