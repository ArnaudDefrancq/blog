import { UserModel } from "../Models/UserModel";
import { Auth } from "../Types/Auth";
import { UpdateUser, User } from "../Types/User";

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

    public static async getAllUser(): Promise<Array<User>> {
        return await UserModel.getAllUser();
    }

    public static async getOneUser(id: number): Promise<User | null> {
        return await UserModel.getOneUser(id);
    }

    public static async updateUser(id: number, updateUser: UpdateUser): Promise<boolean> {
        return await UserModel.updateUser(id, updateUser);
    }

    public static async deleteUser(id: number): Promise<boolean> {
        return await UserModel.deleteUser(id);
    }
}