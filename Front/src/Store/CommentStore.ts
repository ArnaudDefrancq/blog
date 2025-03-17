import { create } from "zustand";
import { Comment, CommentWithUser } from "../Types/Comment";
import { CommentController } from "../Controllers/CommentController";

type CommentStoreType = {
    comments: Array<CommentWithUser>,
    fetchComment: () => Promise<Array<CommentWithUser>>,
    fetchOneComment: (id: number) => Promise<CommentWithUser | null>,
    createComment: (comment: Comment) => Promise<void>,
    deleteComment: (id: number) => Promise<void>
}


export const useCommentStore = create<CommentStoreType>((set) => ({
    comments: [],
    fetchComment: async (): Promise<Array<CommentWithUser>> => {
        try {
            const res = await CommentController.getAllComment();
            set({ comments: res });
            return res;
        } catch (error) {
            console.error(error);
            set({ comments: [] });
            return [];
        }
    },

    fetchOneComment: async (id: number, ): Promise<CommentWithUser | null> => {
        try {
            const res = await CommentController.getOneComment(id);
            if (res) {
                return res;
            }
            return null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },

    createComment: async (comment: Comment, ): Promise<void> => {
        try {
            const res = await CommentController.createComment(comment); 
            if (res) {
                const newComment = (await CommentController.getAllComment())[0];
                set((state) => ({ comments: [...state.comments, newComment] }));
            }
        } catch (error) {
            console.error(error);
        }
    },

    deleteComment: async (id: number, ): Promise<void> => {
        try {
            const res = await CommentController.deleteComment(id); 
            if (res) {
                set((state) => ({ comments: state.comments.filter((comment) => comment.id_comment !== id) }));
            }
        } catch (error) {
            console.error(error);
        }
    }
}));
