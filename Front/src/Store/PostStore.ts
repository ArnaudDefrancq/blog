import { create } from "zustand";
import { NewPost, PostWithUser } from "../Types/Post";
import { PostController } from "../Controllers/PostController";

type PostStoreType = {
    posts: Array<PostWithUser>,
    fetchPost: () => Promise<Array<PostWithUser>>,
    fetchOnePost: (id: number) => Promise<PostWithUser | null>,
    createPost: (post: NewPost) => Promise<void>,
    updatePost: (id: number, updatePost: NewPost) => Promise<void>,
    deletePost: (id: number) => Promise<void>
}

export const usePostStore = create<PostStoreType>((set) => ({
    posts: [],
    fetchPost: async (): Promise<Array<PostWithUser>> => {
        try {
            const res = await PostController.getAllPost();
            set({ posts: res });
            return res;
        } catch (error) {
            console.error(error);
            set({ posts: [] });
            return [];
        }
    },

    fetchOnePost: async (id: number): Promise<PostWithUser | null> => {
        try {
            const res = await PostController.getOnePost(id);
            if (res) {
                return res;
            }
            return null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createPost: async (post: NewPost ): Promise<void> => {
        try {
            const res = await PostController.createPost(post); 
            if (res) {
                const newPost = (await PostController.getAllPost())[0];
                set((state) => ({ posts: [newPost, ...state.posts] }));
            }
        } catch (error) {
            console.error(error);
        }
    },

    updatePost: async (id: number, updatePost: NewPost): Promise<void> => {
        try {
            const res = await PostController.updatePost(id, updatePost);
            if (res) {
                const upPost = await PostController.getOnePost(id);
                set((state) => ({
                    posts: state.posts.map((post) => post.id_post === id ? { ...post, ...upPost } : post)
                }));
            }
        } catch (error) {
            console.error(error);
        }
    },

    deletePost: async (id: number): Promise<void> => {
        try {
            const res = await PostController.deletePost(id); 
            if (res) {
                set((state) => ({ posts: state.posts.filter((post) => post.id_post !== id) }));
            }
        } catch (error) {
            console.error(error);
        }
    }
}));
