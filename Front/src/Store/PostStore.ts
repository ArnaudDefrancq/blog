import { create } from "zustand";
import { Post, PostWithUser } from "../Types/Post";
import { PostController } from "../Controllers/PostController";

type PostStoreType = {
    posts: Array<PostWithUser>,
    fetchPost: (token: string) => Promise<Array<PostWithUser>>,
    fetchOnePost: (id: number, token: string) => Promise<PostWithUser | null>,
    createPost: (post: Post, token: string) => Promise<void>,
    updatePost: (id: number, updatePost: Post, token: string) => Promise<void>,
    deletePost: (id: number, token: string) => Promise<void>
}

export const usePostStore = create<PostStoreType>((set) => ({
    posts: [],
    fetchPost: async (token: string): Promise<Array<PostWithUser>> => {
        try {
            const res = await PostController.getAllPost(token);
            set({ posts: res });
            return res;
        } catch (error) {
            console.error(error);
            set({ posts: [] });
            return [];
        }
    },

    fetchOnePost: async (id: number, token: string): Promise<PostWithUser | null> => {
        try {
            const res = await PostController.getOnePost(id, token);
            if (res) {
                return res;
            }
            return null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createPost: async (post: Post, token: string): Promise<void> => {
        try {
            const res = await PostController.createPost(post, token); 
            if (res) {
                const newPost = (await PostController.getAllPost(token))[0];
                set((state) => ({ posts: [...state.posts, newPost] }));
            }
        } catch (error) {
            console.error(error);
        }
    },

    updatePost: async (id: number, updatePost: Post, token: string): Promise<void> => {
        try {
            const res = await PostController.updatePost(id, updatePost, token);
            if (res) {
                const upPost = await PostController.getOnePost(id, token);
                set((state) => ({
                    posts: state.posts.map((post) => post.id_post === id ? { ...post, ...upPost } : post)
                }));
            }
        } catch (error) {
            console.error(error);
        }
    },

    deletePost: async (id: number, token: string): Promise<void> => {
        try {
            const res = await PostController.deletePost(id, token); 
            if (res) {
                set((state) => ({ posts: state.posts.filter((post) => post.id_post !== id) }));
            }
        } catch (error) {
            console.error(error);
        }
    }
}));
