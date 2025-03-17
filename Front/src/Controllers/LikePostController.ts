import { Like_post } from "../Types/Like_post";

export class LikePostController {
        public static async createLikePost(newLikePost: Like_post): Promise<boolean> {
            return await LikePostController.createLikePost(newLikePost);
        }
    
        public static async getAllLikePost(): Promise<Array<Like_post>> {
            return await LikePostController.getAllLikePost();
        }
    
        public static async getOneLikePost(id: number): Promise<Like_post | null> {
            return await LikePostController.getOneLikePost(id);
        }

        public static async deleteLikePost(id: number): Promise<boolean> {
            return await LikePostController.deleteLikePost(id);
        }
}