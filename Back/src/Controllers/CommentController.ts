import { Request, Response, NextFunction } from "express";
import { CommentModel } from "../Models/CommentModel";
import { Comment } from "../Types/Comment";
import { Tools } from "../Tools/Tools";

export class CommentController {
    private static async getOneById(id:number, withUser: boolean = false): Promise<Comment | null>{
        const commentModel: CommentModel = new CommentModel();
        var result: Array<Comment> = [];
        result = await commentModel.findById(id);
        if (withUser) {
            const queryString: string = `SELECT c.id_comment, c.content, c.created_at, c.id_post, c.id_user, u.pseudo FROM blog__comments as c JOIN blog__users as u ON c.id_user = u.id_user;`;
            result = await commentModel.findById(id, '', queryString);
        }
        if (!result || result.length == 0) {
            return null;
        }
        return result[0];
    }
    public static async createComment(req: Request, res: Response, next: NextFunction): Promise<number | any> {
        try {
            if (!req.body.content || req.body.content == "" || !req.body.id_post || req.body.id_post == "") {
                return res.status(400).json({error: "Tous les champs ne sont pas remplient"})
            }

            const commentModel: CommentModel = new CommentModel();
            const newCom: Comment = {
                content: req.body.content,
                created_at: Tools.dateToTimestamp(),
                id_post: Number(req.body.id_post),
                id_user: Number(req.user?.id_user)
            }

            commentModel.createComment(newCom, (error, insertId) => {
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

    public static async getAllCommentWithUserByPost(req: Request, res: Response, next: NextFunction): Promise<Array<Comment> | any> {
        try {
            const idComment: number = Number(req.params.id);
            if (isNaN(idComment)) {
                return res.status(400).json({ error: 'ID comment invalide' });  
            }
            const commentModel: CommentModel = new CommentModel()
            const queryString: string = `SELECT c.id_comment, c.content, c.created_at, c.id_post, c.id_user, u.pseudo FROM blog__comments as c JOIN blog__users as u ON c.id_user = u.id_user WHERE c.id_post=${idComment};`;
            const arrayComment: Array<Comment> = await commentModel.findComment('', '', queryString);

            if (!arrayComment || arrayComment.length == 0) {
                res.status(400).json({error: "Aucun post trouvé"})
                return [];
            }
            res.status(200).json(arrayComment);
            return arrayComment;
        } catch (error) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }
    
    public static async getAllComment(req: Request, res: Response, next: NextFunction): Promise<Array<Comment> | any> {
        try {
            const commentModel: CommentModel = new CommentModel()
            const arrayComment: Array<Comment> = await commentModel.findComment('');

            if (!arrayComment || arrayComment.length == 0) {
                res.status(400).json({error: "Aucun post trouvé"})
                return [];
            }
            res.status(200).json(arrayComment);
            return arrayComment;
        } catch (error) {
            return res.status(500).json({ error: 'Erreur interne du serveur' });
        }
    }

    public static async getOneCommentWithUser(req: Request, res: Response, next: NextFunction): Promise<Comment | any> {
        try {
            const idComment: number = Number(req.params.id);
            if (isNaN(idComment)) {
                return res.status(400).json({ error: 'ID comment invalide' });  
            }

            const comment: Comment | null = await CommentController.getOneById(idComment, true);
            
            if (!comment) {
                return res.status(400).json({error: "Pas de comment trouvé"});
            }

            res.status(200).json(comment);
            return comment;
        } catch (error) {
            return res.status(500).json({error});
        }
    };

    public static async deleteComment(req: Request, res: Response, next: NextFunction): Promise<number | any> {
        try {
            const idComment: number = Number(req.params.id);
            if (isNaN(idComment)) {
                return res.status(400).json({ error: 'ID post invalide' });  
            }

            const comment: Comment | null = await CommentController.getOneById(idComment);

            if (!comment) {
                return res.status(400).json({error: "Pas  de post trouvé"});
            }
            
            if  (comment.id_user != req.user?.id_user) {
                return res.status(401).json({error: "unauthorized"});
            }


            const commentModel: CommentModel = new CommentModel();
            
            commentModel.deleteComment(idComment, (error, affectedRow) => {
                if (error) {
                    return res.status(400).json({error: "Probleme lors de la suppression | " + error});
                } 
                
                res.status(200).json({message: "Post supprimé | " + idComment})
                return idComment;
            })
        } catch (error) {
            return res.status(500).json({error: 'Erreur interne du serveur'});
        }
    }
}