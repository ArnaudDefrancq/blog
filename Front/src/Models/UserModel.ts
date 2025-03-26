import axios from "axios";
import { Auth } from "../Types/Auth";
import { UpdateUser, User } from "../Types/User";

export class UserModel  {
    public static async signUp(auth: Auth): Promise<number | { code: number } | undefined> {
        try {
            const res = await axios.post(`${import.meta.env.VITE_URL_USER}/signup`, auth);
            if (res.status == 201) {
                return Number(res.data.message.split('|')[1]);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.status) {
                    return {
                    code: (error.status)
                    }
                }
            } else {
                console.error("Erreur inconnue :", error);
                throw new Error("Une erreur inattendue est survenue.");
            }
        }
    }

    public static async signIn(auth: Auth): Promise<boolean | void> {
        try {
            const res = await axios.post(`${import.meta.env.VITE_URL_USER}/signin`, auth, {withCredentials: true});
            if (res.status == 200) {
                return true;
            }
        } catch (error) {
            console.error("Erreur inconnue :", error);
            throw new Error("Une erreur inattendue est survenue.");
        } 
    }

    public static async getInfoConnection(): Promise<{user_id: number, role: number} | void> {
        try {
            const res = await axios.get(`${import.meta.env.VITE_URL_USER}/user`, { withCredentials: true });
            return {user_id: res.data.user_id, role: res.data.role};
        } catch (error) {
            console.error("Erreur inconnue :", error);
            throw new Error("Une erreur inattendue est survenue.");
        }
    }

    public static async getAllUser(): Promise<Array<User>> {
        try {
            const res: Array<User> = (await axios.get(`${import.meta.env.VITE_URL_USER}`, { withCredentials: true })).data;
            return res.reverse() ?? [];
        } catch (error) {
            console.error('Erreur :', error); 
            return []; 
        }
    }

    public static async getOneUser(id: number): Promise<User | null> {
        try {
            const res: User = (await axios.get(`${import.meta.env.VITE_URL_USER}/${id}`, { withCredentials: true })).data;
            return res;
        } catch (error) {
            console.error(error)
            return null;
        }
    }

    public static async updateUser (id: number, updateUser: UpdateUser): Promise<boolean> {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                }, 
                withCredentials: true 
            }
            await axios.put(`${import.meta.env.VITE_URL_USER}/${id}`, updateUser, config);

            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    public static async deleteUser(id: number): Promise<boolean> {
        try {
            await axios.delete(`${import.meta.env.VITE_URL_USER}/${id}`, { withCredentials: true });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}