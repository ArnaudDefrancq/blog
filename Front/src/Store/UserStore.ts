import { create } from "zustand";
import { UpdateUser, User } from "../Types/User";
import { UserController } from "../Controllers/UserController";

type UserStoreType = {
    users: Array<User>,
    fetchUser: () => Promise<Array<User>>,
    fetchOneUser: (id: number) => Promise<User | null>,
    updateUser: (upUser: UpdateUser, id: number) => Promise<void>,
    deleteUser: (id: number) => Promise<void>
}

export const useUserStore = create<UserStoreType>((set) => ({
    users: [],
    fetchUser: async (): Promise<Array<User>> => {
        try {
            const res = await UserController.getAllUser();
            set({ users: res });
            return res;
        } catch (error) {
            console.error(error);
            set({users: []});
            return []
        }
    },
    fetchOneUser: async (id: number): Promise<User |null> => {
        try {
            const res = await UserController.getOneUser(id);
            if (res) {
                return res;
            }
            return null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    updateUser: async (upUser: UpdateUser, id: number): Promise<void> => {
        try {
            const res = await UserController.updateUser(id, upUser);
            if (res) {
                const updUser = await UserController.getOneUser(id);
                set((state) => ({
                    users: state.users.map((user) => user.id_user === id ? { ...user, ...updUser } : user)
                }));
            }
        } catch (error) {
            console.error(error);
        }
    },
    deleteUser: async (id: number): Promise<void> => {
        try {
            const res = await UserController.deleteUser(id); 
            if (res) {
                set((state) => ({ users: state.users.filter((user) => user.id_user !== id) }));
            }
        } catch (error) {
            console.error(error);
        }   
    },
}))