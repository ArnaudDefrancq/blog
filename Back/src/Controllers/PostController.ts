import { Request, Response, NextFunction } from "express";
import { Post } from "../Types/Post";
import { PostModel } from "../Models/PostModel";
import { Tools } from "../Tools/Tools";

export class PostController {
    public static async createPost(req: Request, res: Response, next: NextFunction): Promise<number | any> {
        try {
            const postModel: PostModel = new PostModel();
            var reqFile = req.file as Express.Multer.File;

            const newPost: Post = {
                title: req.body.title,
                content: req.body.content,
                media: reqFile ? String(reqFile.path.split('\\').at(-1)) : undefined,
                created_at: Tools.dateToTimestamp(),
                updated_at: Tools.dateToTimestamp(),
                id_user: req.session.id_user
            }            

            postModel.createPost(newPost, (error, insertId) => {
                if (error) {
                    return res.status(400).json({error: "Probleme lors de la création du post | " + error});
                }
                res.status(201).json({message: "Création du post | " + insertId});
                return insertId;
            })

        } catch (error) {
            return res.status(500).json({error});
        }
    }
}