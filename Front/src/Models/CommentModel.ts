import axios from "axios";
import { newCom, CommentWithUser } from "../Types/Comment";

export class CommentModel {
    public static async createComment(newCom: newCom): Promise<boolean> {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
            await axios.post(`${import.meta.env.VITE_URL_COMMENT}`, newCom, config);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public static async getAllComment(idPost: number): Promise<Array<CommentWithUser>> {
        try {
            const res: Array<CommentWithUser> = (await axios.get(`${import.meta.env.VITE_URL_COMMENT}/${idPost}/post/user`, { withCredentials: true })).data;
            return res.reverse() ?? [];
        } catch (error) {
            console.error('Erreur : ', error);
            return [];
        }
    }

    public static async getOneComment(id: number): Promise<CommentWithUser | null> {
        try {
            const res: CommentWithUser = (await axios.get(`${import.meta.env.VITE_URL_COMMENT}/${id}/user`, { withCredentials: true })).data;
            return res;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    public static async deleteComment(id: number): Promise<boolean> {
        try {
            await axios.delete(`${import.meta.env.VITE_URL_COMMENT}/${id}`, { withCredentials: true });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}