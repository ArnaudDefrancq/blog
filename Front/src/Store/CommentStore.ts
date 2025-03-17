import { create } from "zustand";
import { Comment, CommentWithUser } from "../Types/Comment";
import { CommentController } from "../Controllers/CommentController";

type CommentStoreType = {
    comments: Array<CommentWithUser>,
    fetchComment: (token: string) => Promise<Array<CommentWithUser>>,
    fetchOneComment: (id: number, token: string) => Promise<CommentWithUser | null>,
    createComment: (comment: Comment, token: string) => Promise<void>,
    deleteComment: (id: number, token: string) => Promise<void>
}


export const useCommentStore = create<CommentStoreType>((set) => ({
    comments: [],
    fetchComment: async (token: string): Promise<Array<CommentWithUser>> => {
        try {
            const res = await CommentController.getAllComment(token);
            set({ comments: res });
            return res;
        } catch (error) {
            console.error(error);
            set({ comments: [] });
            return [];
        }
    },

    fetchOneComment: async (id: number, token: string): Promise<CommentWithUser | null> => {
        try {
            const res = await CommentController.getOneComment(id, token);
            if (res) {
                return res;
            }
            return null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createComment: async (comment: Comment, token: string): Promise<void> => {
        try {
            const res = await CommentController.createComment(comment, token); 
            if (res) {
                const newComment = (await CommentController.getAllComment(token))[0];
                set((state) => ({ comments: [...state.comments, newComment] }));
            }
        } catch (error) {
            console.error(error);
        }
    },

    deleteComment: async (id: number, token: string): Promise<void> => {
        try {
            const res = await CommentController.deleteComment(id, token); 
            if (res) {
                set((state) => ({ comments: state.comments.filter((comment) => comment.id_comment !== id) }));
            }
        } catch (error) {
            console.error(error);
        }
    }
}));
