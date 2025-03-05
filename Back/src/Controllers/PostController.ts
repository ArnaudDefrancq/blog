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

    public static async getAllPostWithUser(req: Request, res: Response, next: NextFunction): Promise<Array<Post> | any> {
        try {
            const postModel: PostModel = new PostModel()

            const queryString: string = `SELECT p.id_post, p.title, p.content, p.media, p.created_at, p.updated_at, u.pseudo FROM blog__posts as p JOIN blog__users as u ON p.id_user = u.id_user;`;

            const arrayPost: Array<Post> = await postModel.findPost('', '', queryString);

            if (!arrayPost || arrayPost.length == 0) {
                res.status(400).json({error: "Aucun post trouvé"})
                return [];
            }
            res.status(200).json(arrayPost);
            return arrayPost;
        } catch (error) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public static async getAllPost(req: Request, res: Response, next: NextFunction): Promise<Array<Post> | any> {
        try {
            const postModel: PostModel = new PostModel()
            const arrayPost: Array<Post> = await postModel.findPost('');

            if (!arrayPost || arrayPost.length == 0) {
                res.status(400).json({error: "Aucun post trouvé"})
                return [];
            }
            res.status(200).json(arrayPost);
            return arrayPost;
        } catch (error) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
}