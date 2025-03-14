import { CommentModel } from "../Models/CommentModel";
import { Comment, CommentWithUser } from "../Types/Comment";

export class CommentController {
        public static async createComment(newCom: Comment, token: string): Promise<boolean> {
            return await CommentModel.createComment(newCom, token);
        }
    
        public static async getAllComment(token: string): Promise<Array<CommentWithUser>> {
            return await CommentModel.getAllComment(token);
        }
    
        public static async getOneComment(id: number, token: string): Promise<CommentWithUser | null> {
            return await CommentModel.getOneComment(id, token);
        }
    
        public static async deleteComment(id: number, token: string): Promise<boolean> {
            return await CommentModel.deleteComment(id, token);
        }
}