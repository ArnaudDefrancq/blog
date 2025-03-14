import axios from "axios";
import { Like_post } from "../Types/Like_post";

export class PostLikeModel {
    public static async createLikePost(newLikePost: Like_post, token: string): Promise<boolean> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            await axios.post(`${import.meta.env.VITE_URL_LIKE_POST}`, newLikePost, config);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public static async getAllLikePost(token: string): Promise<Array<Like_post>> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            const res: Array<Like_post> = (await axios.get(`${import.meta.env.VITE_URL_LIKE_POST}`, config)).data;
            return res.reverse() ?? [];
        } catch (error) {
            console.error('Erreur : ', error);
            return [];
        }
    }

    public static async getOneLikePost(id: number, token: string): Promise<Like_post | null> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            const res: Like_post = (await axios.get(`${import.meta.env.VITE_URL_LIKE_POST}/${id}`, config)).data;
            return res;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    public static async deleteLikePost(id: number, token: string): Promise<boolean> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            await axios.delete(`${import.meta.env.VITE_URL_LIKE_POST}/${id}`, config);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}