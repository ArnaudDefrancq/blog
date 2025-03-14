import axios from "axios";
import { Comment, CommentWithUser } from "../Types/Comment";

export class CommentModel {
    public static async createComment(newCom: Comment, token: string): Promise<boolean> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            await axios.post(`${import.meta.env.VITE_URL_COMMENT}`, newCom, config);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public static async getAllComment(token: string): Promise<Array<CommentWithUser>> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            const res: Array<CommentWithUser> = (await axios.get(`${import.meta.env.VITE_URL_COMMENT}/user`, config)).data;
            return res.reverse() ?? [];
        } catch (error) {
            console.error('Erreur : ', error);
            return [];
        }
    }

    public static async getOneComment(id: number, token: string): Promise<CommentWithUser | null> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            const res: CommentWithUser = (await axios.get(`${import.meta.env.VITE_URL_COMMENT}/${id}/user`, config)).data;
            return res;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    public static async deleteComment(id: number, token: string): Promise<boolean> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            await axios.delete(`${import.meta.env.VITE_URL_COMMENT}/${id}`, config);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}