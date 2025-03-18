import axios from "axios";
import { Auth } from "../Types/Auth";
// import { User } from "../Types/User";

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

    public static async signIn(auth: Auth): Promise<void> {
        try {
            const res = await axios.post(`${import.meta.env.VITE_URL_USER}/signin`, auth, {withCredentials: true});
            if (res.status == 200) {
                return res.data;
            }
        } catch (error) {
            console.error("Erreur inconnue :", error);
            throw new Error("Une erreur inattendue est survenue.");
        } 
    }

    public static async getInfoConnection(): Promise<void> {
        try {
            const res = await axios.get(`${import.meta.env.VITE_URL_USER}/user`, { withCredentials: true });
            return res.data;
        } catch (error) {
            console.error("Erreur inconnue :", error);
            throw new Error("Une erreur inattendue est survenue.");
        }
    }
}