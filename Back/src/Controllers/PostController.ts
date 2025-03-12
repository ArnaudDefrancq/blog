import { Request, Response, NextFunction } from "express";
import { Post } from "../Types/Post";
import { PostModel } from "../Models/PostModel";
import { Tools } from "../Tools/Tools";
import path from "path";
import fs from 'fs';
import { CommentModel } from "../Models/CommentModel";
import { Comment } from "../Types/Comment";
import { Like_postModel } from "../Models/Like_postModel";
import { Like_post } from "../Types/Like_post";


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
            if (req.body.title == "" || !req.body.title || req.body.content == "" || !req.body.content) {
                return res.status(400).json({error : "Tous les champs ne sont pas remplient"});
            }

            const postModel: PostModel = new PostModel();
            var reqFile = req.file as Express.Multer.File;

            const newPost: Post = {
                title: req.body.title,
                content: req.body.content,
                media: reqFile ? String(reqFile.path.split('\\').at(-1)) : undefined,
                created_at: Tools.dateToTimestamp(),
                updated_at: Tools.dateToTimestamp(),
                id_user: req.user?.id_user
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
            
            if  (post.id_user != req.user?.id_user) {
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

    public static async deletePost(req: Request, res: Response, next: NextFunction) : Promise<number | any> {
        try {
            const idPost: number = Number(req.params.id);
            if (isNaN(idPost)) {
                return res.status(400).json({ error: 'ID post invalide' });  
            }

            const post: Post | null = await PostController.getOneById(idPost);

            if (!post) {
                return res.status(400).json({error: "Pas  de post trouvé"});
            }
            
            if  (post.id_user != req.user?.id_user) {
                return res.status(401).json({error: "unauthorized"});
            }

            if (post.media) {
                const oldImagePath = path.join(__dirname, '../../Images/imgPost/', String(post.id_user), post.media);
                fs.unlinkSync(oldImagePath);
            }

            const postModel: PostModel = new PostModel();
            const commentModel: CommentModel = new CommentModel();
            const likePostModel: Like_postModel = new Like_postModel();

            const arrayComment : Array<Comment> = await commentModel.findComment(`WHERE id_post=${idPost}`);

            if (arrayComment && arrayComment.length > 0) {
                arrayComment.forEach(com => {
                    if (com.id_comment) {
                        commentModel.deleteComment(com.id_comment, (error) => {
                            if (error) {
                                console.error("Probleme lors de la suppression du commentaire id_comment | " + com.id_comment + " | " + error)
                            }
                        })
                    }
                })
            }


            const arrayLikePost: Array<Like_post> = await likePostModel.findLike_post(`WHERE id_post=${idPost}`);
            if (arrayLikePost && arrayLikePost.length > 0) {
                arrayLikePost.forEach(likePost => {
                    if (likePost.id_like_post) {
                        likePostModel.deleteLike_post(likePost.id_like_post, (error) => {
                            if (error) {
                                console.error("Probleme lors de la suppression du like-post id_like_post | " + likePost.id_like_post + " | " + error)
                            }
                        })
                    }
                })
            }

            
            postModel.deletePost(idPost, (error, affectedRow) => {
                if (error) {
                    return res.status(400).json({error: "Probleme lors de la suppression | " + error});
                } 
                
                res.status(200).json({message: "Post supprimé | " + idPost})
                return idPost;
            })

        } catch (error) {
            return res.status(500).json({error: 'Erreur interne du serveur'});
        }
    }
}