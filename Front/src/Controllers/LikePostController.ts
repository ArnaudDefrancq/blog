import { Like_post } from "../Types/Like_post";

export class LikePostController {
        public static async createLikePost(newLikePost: Like_post, token: string): Promise<boolean> {
            return await LikePostController.createLikePost(newLikePost, token);
        }
    
        public static async getAllLikePost(token: string): Promise<Array<Like_post>> {
            return await LikePostController.getAllLikePost(token);
        }
    
        public static async getOneLikePost(id: number, token: string): Promise<Like_post | null> {
            return await LikePostController.getOneLikePost(id, token);
        }

        public static async deleteLikePost(id: number, token: string): Promise<boolean> {
            return await LikePostController.deleteLikePost(id, token);
        }
}