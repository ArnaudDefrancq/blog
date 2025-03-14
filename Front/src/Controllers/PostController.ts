import { PostModel } from "../Models/PostModel";
import { Post, PostWithUser } from "../Types/Post";

export class PostController {
    public static async createPost(newPost: Post, token: string): Promise<boolean> {
        return await PostController.createPost(newPost, token);
    }

    public static async getAllPost(token: string): Promise<Array<PostWithUser>> {
        return await PostModel.getAllPost(token);
    }

    public static async getOnePost(id: number, token: string): Promise<PostWithUser | null> {
        return await PostModel.getOnePost(id, token);
    }

    public static async updatePost(id: number, updatePost: Post, token: string): Promise<boolean> {
        return await PostModel.updatePost(id, updatePost, token);
    }

    public static async deletePost(id: number, token: string): Promise<boolean> {
        return await PostModel.deletePost(id, token);
    }
}
