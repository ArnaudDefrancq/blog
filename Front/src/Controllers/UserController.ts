import { UserModel } from "../Models/UserModel";
import { Auth } from "../Types/Auth";

export class UserController {
    public static async signUp(auth: Auth): Promise<number | { code: number } | undefined> {
        return await UserModel.signUp(auth);
    }
    public static async signIn(auth: Auth): Promise<void> {
        return await UserModel.signIn(auth);
    }

    // public static async getOneUserById(id: number): Promise<User | void> {
    //     return await UserModel.getOneUserById(id);
    // }
}