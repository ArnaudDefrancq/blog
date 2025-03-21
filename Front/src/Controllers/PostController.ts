import { PostModel } from "../Models/PostModel";
import { NewPost, Post, PostWithUser } from "../Types/Post";

export class PostController {
    public static async createPost(newPost: NewPost): Promise<boolean> {
        return await PostModel.createPost(newPost);
    }

    public static async getAllPost(): Promise<Array<PostWithUser>> {
        return await PostModel.getAllPost();
    }

    public static async getOnePost(id: number): Promise<PostWithUser | null> {
        return await PostModel.getOnePost(id);
    }

    public static async updatePost(id: number, updatePost: Post): Promise<boolean> {
        return await PostModel.updatePost(id, updatePost);
    }

    public static async deletePost(id: number): Promise<boolean> {
        return await PostModel.deletePost(id);
    }
}
