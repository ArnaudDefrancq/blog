import { create } from "zustand";
import { Like_post } from "../Types/Like_post";
import { LikePostController } from "../Controllers/LikePostController";

type LikePostStoreType = {
    likePosts: Array<Like_post>,
    fetchLikePost: (token: string) => Promise<Array<Like_post>>,
    fetchOneLikePost: (id: number, token: string) => Promise<Like_post | null>,
    createLikePost: (likePost: Like_post, token: string) => Promise<void>,
    deleteLikePost: (id: number, token: string) => Promise<void>
}

export const useLikePostStore = create<LikePostStoreType>((set) => ({
    likePosts: [],
    fetchLikePost: async (token: string): Promise<Array<Like_post>> => {
        try {
            const res = await LikePostController.getAllLikePost(token);
            set({ likePosts: res });
            return res;
        } catch (error) {
            console.error(error);
            set({ likePosts: [] });
            return [];
        }
    },

    fetchOneLikePost: async (id: number, token: string): Promise<Like_post | null> => {
        try {
            const res = await LikePostController.getOneLikePost(id, token);
            if (res) {
                return res;
            }
            return null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createLikePost: async (likePost: Like_post, token: string): Promise<void> => {
        try {
            const res = await LikePostController.createLikePost(likePost, token); 
            if (res) {
                const newLikePost = (await LikePostController.getAllLikePost(token))[0];
                set((state) => ({ likePosts: [...state.likePosts, newLikePost] }));
            }
        } catch (error) {
            console.error(error);
        }
    },

    deleteLikePost: async (id: number, token: string): Promise<void> => {
        try {
            const res = await LikePostController.deleteLikePost(id, token); 
            if (res) {
                set((state) => ({ likePosts: state.likePosts.filter((likePost) => likePost.id_like_post !== id) }));
            }
        } catch (error) {
            console.error(error);
        }
    }
}));
