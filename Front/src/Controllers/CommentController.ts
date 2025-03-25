import { CommentModel } from "../Models/CommentModel";
import { Comment, CommentWithUser } from "../Types/Comment";

export class CommentController {
        public static async createComment(newCom: Comment): Promise<boolean> {
            return await CommentModel.createComment(newCom);
        }
    
        public static async getAllComment(idPost: number): Promise<Array<CommentWithUser>> {
            return await CommentModel.getAllComment(idPost);
        }
    
        public static async getOneComment(id: number): Promise<CommentWithUser | null> {
            return await CommentModel.getOneComment(id);
        }
    
        public static async deleteComment(id: number): Promise<boolean> {
            return await CommentModel.deleteComment(id);
        }
}