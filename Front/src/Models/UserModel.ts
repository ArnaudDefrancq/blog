import axios from "axios";
import { Auth } from "../Types/Auth";

export class UserModel  {
    public static async signUp(auth: Auth): Promise<number | void> {
        try {
            const newUser: number = await axios.post(`${import.meta.env.VITE_URL_USER}/signup`, auth);
            return newUser;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Erreur Axios :", error.response?.data || error.message);
                throw new Error(error.response?.data?.message || "Une erreur est survenue lors de l'inscription.");
            } else {
                console.error("Erreur inconnue :", error);
                throw new Error("Une erreur inattendue est survenue.");
            }
        }
    }

    public static async signIn(auth: Auth): Promise<number | void> {
        try {
            const newUser: number = await axios.post(`${import.meta.env.VITE_URL_USER}/signin`, auth);
            return newUser;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error("Erreur Axios :", error.response?.data || error.message);
                throw new Error(error.response?.data?.message || "Une erreur est survenue lors de l'inscription.");
            } else {
                console.error("Erreur inconnue :", error);
                throw new Error("Une erreur inattendue est survenue.");
            }
        } 
    }
}