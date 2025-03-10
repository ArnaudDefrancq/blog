import { UserModel } from "../Models/UserModel";
import { Auth } from "../Types/Auth";

export class UserController {
    static async signUp(auth: Auth): Promise<number | { code: number } | undefined> {
        return await UserModel.signUp(auth);
    }
    static async signIn(auth: Auth): Promise<number | void> {
        return await UserModel.signIn(auth);
    }
}