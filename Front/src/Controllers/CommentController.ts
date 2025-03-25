import { CommentModel } from "../Models/CommentModel";
import { newCom, CommentWithUser } from "../Types/Comment";

export class CommentController {
        public static async createComment(newCom: newCom): Promise<boolean> {
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