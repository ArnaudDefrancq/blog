import { Request, Response, NextFunction } from "express";
import { Post } from "../Types/Post";
import { PostModel } from "../Models/PostModel";
import { Tools } from "../Tools/Tools";
import path from "path";
import fs from 'fs';


export class PostController {
    private static async getOneById(id:number, withUser: boolean = false): Promise<Post | null> {
        const postModel: PostModel = new PostModel();
        var result: Array<Post> = [];
        result = await postModel.findById(id);
        if (withUser) {
            const queryString: string = `SELECT p.id_post, p.title, p.content, p.media, p.created_at, p.updated_at, u.pseudo FROM blog__posts as p JOIN blog__users as u ON p.id_user = u.id_user;`;
            result = await postModel.findById(id, '', queryString);
        }
        if (!result || result.length == 0) {
            return null;
        }
        return result[0];
    }

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

    public static async getOnePostWithUser(req: Request, res: Response, next: NextFunction) : Promise<Post | any> {
        try {
            const idPost: number = Number(req.params.id);
            if (isNaN(idPost)) {
                return res.status(400).json({ error: 'ID post invalide' });  
            }

            const post: Post | null = await PostController.getOneById(idPost, true);
            
            if (!post) {
                return res.status(400).json({error: "Pas de post trouvé"});
            }

            res.status(200).json(post);
            return post;
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    public static async getOnePost(req: Request, res: Response, next: NextFunction) : Promise<Post | any> {
        try {
            const idPost: number = Number(req.params.id);
            if (isNaN(idPost)) {
                return res.status(400).json({ error: 'ID post invalide' });  
            }

            const post: Post | null = await PostController.getOneById(idPost);
            
            if (!post) {
                return res.status(400).json({error: "Pas de post trouvé"});
            }

            res.status(200).json(post);
            return post;
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    public static async updatePost(req: Request, res: Response, next: NextFunction) : Promise<number | any> {
        try {
            const idPost: number = Number(req.params.id);
            if (isNaN(idPost)) {
                return res.status(400).json({ error: 'ID post invalide' });  
            }
            const post: Post | null = await PostController.getOneById(idPost);
            
            if (!post) {
                return res.status(400).json({error: "Pas de post trouvé"});
            }
            
            if  (post.id_user != req.session.id_user) {
                return res.status(401).json({error: "unauthorized"});
            }
            
            const postModel: PostModel = new PostModel();
            var reqFile;
            if (post.media) {
                const oldImagePath = path.join(__dirname, '../../Images/imgPost/', String(post.id_user), post.media);
                fs.unlinkSync(oldImagePath);
                post.media = undefined;
            }

            if (req.file) {
                reqFile = req.file as Express.Multer.File;
            }
            const updatePost : Partial<Post> = {
                title: req.body.title ? req.body.title : post.title,
                content: req.body.content ? req.body.content : post.content,
                media: reqFile ? String(reqFile.path.split('\\').at(-1)) : post.media,
                updated_at: Tools.dateToTimestamp()
            }

            postModel.updatePost(idPost, updatePost, (error, affectedRow) => {
                if (error) {
                    return res.status(400).json({error: "Probleme lors de l'update du post | " + error});
                }
                res.status(200).json({message: "Post update | " + affectedRow})
                return idPost;
            })
        } catch (error) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
}