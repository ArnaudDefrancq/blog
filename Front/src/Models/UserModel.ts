import axios from "axios";
import { Auth } from "../Types/Auth";

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

    public static async signIn(auth: Auth): Promise<number| void> {
        try {
            const res = await axios.post(`${import.meta.env.VITE_URL_USER}/signin`, auth);
            if (res.status == 200) {
                return Number(res.data.message.split('|')[1]);
            }
        } catch (error) {
            console.error("Erreur inconnue :", error);
            throw new Error("Une erreur inattendue est survenue.");
        } 
    }
}