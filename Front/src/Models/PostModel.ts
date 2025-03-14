import axios from "axios";
import { Post, PostWithUser } from "../Types/Post";

export class PostModel {

    public static async createPost(newPost: Post, token: string): Promise<boolean> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            await axios.post(`${import.meta.env.VITE_URL_POST}`, newPost, config);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public static async getAllPost(token: string): Promise<Array<PostWithUser>> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            const res: Array<PostWithUser> = (await axios.get(`${import.meta.env.VITE_URL_POST}/user`, config)).data;
            return res.reverse() ?? [];
        } catch (error) {
            console.error('Erreur : ', error);
            return [];
        }
    }

    public static async getOnePost(id: number, token: string): Promise<PostWithUser | null> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            const res: PostWithUser = (await axios.get(`${import.meta.env.VITE_URL_POST}/${id}/user`, config)).data;
            return res;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    public static async updatePost(id: number, updatePost: Post, token: string): Promise<boolean> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            await axios.put(`${import.meta.env.VITE_URL_POST}/${id}`, updatePost, config);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public static async deletePost(id: number, token: string): Promise<boolean> {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            }
            await axios.delete(`${import.meta.env.VITE_URL_POST}/${id}`, config);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
