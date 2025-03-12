import { Request, Response, NextFunction } from "express";
import { Like_post } from "../Types/Like_post";
import { Like_postModel } from "../Models/Like_postModel";

export class Like_postController {
    private static async getOneById(id: number) : Promise<Like_post | null> {
        const likePostModel: Like_postModel = new Like_postModel();
        const result: Array<Like_post> = await likePostModel.findById(id);
        if (!result || result.length == 0) {
            return null;
        }
        return result[0];
    }

    public static async createLikePost(req: Request, res: Response, next: NextFunction): Promise<number | any> {
        try {
            if (!req.body.id_post || req.body.id_post == "") {
                return res.status(400).json({error: "Tous les champs ne sont pas remplient"})
            }

            const likePostModel: Like_postModel = new Like_postModel();
            const newLikePost: Like_post = {
                id_post: Number(req.body.id_post),
                id_user: Number(req.user?.id_user)
            }

            likePostModel.createLike_post(newLikePost, (error, insertId) => {
                if (error) {
                    return res.status(400).json({error: "Probleme lors de la création du like_post | " + error});
                }
                res.status(201).json({message: "Création du like_post | " + insertId});
                return insertId;
            })
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    public static async getAllLikePost(req: Request, res: Response, next: NextFunction): Promise<Array<Like_post> | any> {
        try {
            const likePostModel: Like_postModel = new Like_postModel();
            const arrayLikePost: Array<Like_post> = await likePostModel.findLike_post('');

            if (!arrayLikePost || arrayLikePost.length == 0) {
                res.status(400).json({error: "Aucun like_post trouvé"})
                return [];
            }
            res.status(200).json(arrayLikePost);
            return arrayLikePost;
        } catch (error) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public static async getOneLikePost(req: Request, res: Response, next: NextFunction): Promise<Like_post | any> {
        try {
            const idLikePost: number = Number(req.params.id);
            if (isNaN(idLikePost)) {
                return res.status(400).json({ error: 'ID like_post invalide' });  
            }

            const like_post: Like_post | null = await Like_postController.getOneById(idLikePost);
            
            if (!like_post) {
                return res.status(400).json({error: "Pas de like_post trouvé"});
            }

            res.status(200).json(like_post);
            return like_post;
        } catch (error) {
            return res.status(500).json({error});
        }
    }

    public static async deleteLikePost(req: Request, res: Response, next: NextFunction): Promise<number | any> {
        try {
            const idLikePost: number = Number(req.params.id);
            if (isNaN(idLikePost)) {
                return res.status(400).json({ error: 'ID like_post invalide' });  
            }

            const like_post: Like_post | null = await Like_postController.getOneById(idLikePost);
            
            if (!like_post) {
                return res.status(400).json({error: "Pas de like_post trouvé"});
            }
            
            if  (like_post.id_user != req.user?.id_user) {
                return res.status(401).json({error: "unauthorized"});
            }


            const likePostModel: Like_postModel = new Like_postModel();
            
            likePostModel.deleteLike_post(idLikePost, (error, affectedRow) => {
                if (error) {
                    return res.status(400).json({error: "Probleme lors de la suppression | " + error});
                } 
                
                res.status(200).json({message: "Like_post supprimé | " + idLikePost})
                return idLikePost;
            })
        } catch (error) {
            return res.status(500).json({error: 'Erreur interne du serveur'});
        }
    }
}