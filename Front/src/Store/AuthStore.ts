import { create } from "zustand";

type AuthStoreType = {
    user_id: number | null,
    role_id: number | null,
    token: string | null, 
    setUser: (user_id: number, role_id: number, token: string) => void,
    logOut: () => void
}

export const useAuthStore = create<AuthStoreType>((set) => ({
    user_id: null,
    role_id: null,
    token: null,
    setUser: (user_id, role_id, token) => set({user_id, role_id, token}),
    logOut: () => set({user_id: null, role_id: null, token: null})
}))