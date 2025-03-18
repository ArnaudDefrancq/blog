import { create } from "zustand";
import { UserController } from "../Controllers/UserController";

type AuthStoreType = {
    user_id: number | null,
    role_id: number | null,
    setUser: (user_id: number, role_id: number) => void,
    fetchUser: () => void,
    logOut: () => void
}

export const useAuthStore = create<AuthStoreType>((set) => ({
    user_id: null,
    role_id: null,
    setUser: (user_id, role_id) => set({user_id, role_id}),
    fetchUser: async () => {
        try {
            const res = await UserController.getInfoconnection();
            console.log(res)
            set({user_id: null, role_id: null})
        } catch (error) {
            console.log(error);
            set({user_id: null, role_id: null})
        }
    },
    logOut: () => set({user_id: null, role_id: null})
}))