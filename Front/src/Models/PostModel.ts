import axios from "axios";
import { NewPost, PostWithUser } from "../Types/Post";

export class PostModel {

    public static async createPost(newPost: NewPost): Promise<boolean> {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            }
            await axios.post(`${import.meta.env.VITE_URL_POST}`, newPost, config);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public static async getAllPost(): Promise<Array<PostWithUser>> {
        try {
            const res: Array<PostWithUser> = (await axios.get(`${import.meta.env.VITE_URL_POST}/user`, { withCredentials: true })).data;
            return res.reverse() ?? [];
        } catch (error) {
            console.error('Erreur : ', error);
            return [];
        }
    }

    public static async getOnePost(id: number): Promise<PostWithUser | null> {
        try {
            const res: PostWithUser = (await axios.get(`${import.meta.env.VITE_URL_POST}/${id}/user`, { withCredentials: true })).data;
            return res;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    public static async updatePost(id: number, updatePost: NewPost): Promise<boolean> {
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }, 
                withCredentials: true 
            }
            await axios.put(`${import.meta.env.VITE_URL_POST}/${id}`, updatePost, config);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public static async deletePost(id: number): Promise<boolean> {
        try {
            await axios.delete(`${import.meta.env.VITE_URL_POST}/${id}`, { withCredentials: true });

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}
