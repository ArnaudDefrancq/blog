import { create } from "zustand";

type AuthStoreType = {
    user_id: number | null,
    role_id: number | null,
    setUser: (user_id: number, role_id: number) => void,
    logOut: () => void
}

export const useAuthStore = create<AuthStoreType>((set) => ({
    user_id: null,
    role_id: null,
    setUser: (user_id, role_id) => set({user_id, role_id}),
    logOut: () => set({user_id: null, role_id: null})
}))