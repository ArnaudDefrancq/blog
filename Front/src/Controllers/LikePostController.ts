import { PostLikeModel } from "../Models/PostLikeModel";
import { Like_post } from "../Types/Like_post";

export class LikePostController {
        public static async createLikePost(newLikePost: Like_post): Promise<boolean> {
            return await PostLikeModel.createLikePost(newLikePost);
        }
    
        public static async getAllLikePost(idPost: number): Promise<Array<Like_post>> {
            return await PostLikeModel.getAllLikePost(idPost);
        }
    
        public static async getOneLikePost(id: number): Promise<Like_post | null> {
            return await PostLikeModel.getOneLikePost(id);
        }

        public static async deleteLikePost(id: number): Promise<boolean> {
            return await PostLikeModel.deleteLikePost(id);
        }
}