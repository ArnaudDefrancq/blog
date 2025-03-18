import { UserModel } from "../Models/UserModel";
import { Auth } from "../Types/Auth";

export class UserController {
    public static async signUp(auth: Auth): Promise<number | { code: number } | undefined> {
        return await UserModel.signUp(auth);
    }
    public static async signIn(auth: Auth): Promise<boolean | void> {
        return await UserModel.signIn(auth);
    }

    public static async getInfoconnection(): Promise<{user_id: number, role: number} | void> {
        return await UserModel.getInfoConnection();
    }
}