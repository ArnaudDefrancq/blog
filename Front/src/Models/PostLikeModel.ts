import axios from "axios";
import { Like_post } from "../Types/Like_post";

export class PostLikeModel {
    public static async createLikePost(newLikePost: Like_post): Promise<boolean> {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true 
            }
            await axios.post(`${import.meta.env.VITE_URL_LIKE_POST}`, newLikePost, config);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public static async getAllLikePost(): Promise<Array<Like_post>> {
        try {
            const res: Array<Like_post> = (await axios.get(`${import.meta.env.VITE_URL_LIKE_POST}`, { withCredentials: true })).data;
            return res.reverse() ?? [];
        } catch (error) {
            console.error('Erreur : ', error);
            return [];
        }
    }

    public static async getOneLikePost(id: number): Promise<Like_post | null> {
        try {
            const res: Like_post = (await axios.get(`${import.meta.env.VITE_URL_LIKE_POST}/${id}`, { withCredentials: true })).data;
            return res;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    public static async deleteLikePost(id: number): Promise<boolean> {
        try {
            await axios.delete(`${import.meta.env.VITE_URL_LIKE_POST}/${id}`, { withCredentials: true });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}