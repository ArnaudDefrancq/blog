import { create } from "zustand";
import { Like_post } from "../Types/Like_post";
import { LikePostController } from "../Controllers/LikePostController";

type LikePostStoreType = {
    likePosts: Array<Like_post>,
    fetchLikePost: (idPost: number) => Promise<Array<Like_post>>,
    fetchOneLikePost: (id: number) => Promise<Like_post | null>,
    createLikePost: (likePost: Like_post) => Promise<void>,
    deleteLikePost: (id: number) => Promise<void>
}

export const useLikePostStore = create<LikePostStoreType>((set) => ({
    likePosts: [],
    fetchLikePost: async (idPost: number): Promise<Array<Like_post>> => {
        try {
            const res = await LikePostController.getAllLikePost(idPost);
            set({ likePosts: res });
            return res;
        } catch (error) {
            console.error(error);
            set({ likePosts: [] });
            return [];
        }
    },

    fetchOneLikePost: async (id: number): Promise<Like_post | null> => {
        try {
            const res = await LikePostController.getOneLikePost(id);
            if (res) {
                return res;
            }
            return null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createLikePost: async (likePost: Like_post): Promise<void> => {
        try {
            const res = await LikePostController.createLikePost(likePost); 
            if (res) {
                const newLikePost = (await LikePostController.getAllLikePost(likePost.id_post))[0];
                set((state) => ({ likePosts: [...state.likePosts, newLikePost] }));
            }
        } catch (error) {
            console.error(error);
        }
    },

    deleteLikePost: async (id: number): Promise<void> => {
        try {
            const res = await LikePostController.deleteLikePost(id); 
            if (res) {
                set((state) => ({ likePosts: state.likePosts.filter((likePost) => likePost.id_like_post !== id) }));
            }
        } catch (error) {
            console.error(error);
        }
    }
}));
