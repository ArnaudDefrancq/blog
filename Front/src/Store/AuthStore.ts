import { create } from "zustand";

type AuthStoreType = {
    user_id: number | null,
    role: number | null,
    setUser: (user_id: number, role: number) => void,
    logOut: () => void
}

export const useAuthStore = create<AuthStoreType>((set) => ({
    user_id: null,
    role: null,
    setUser: (user_id, role) => set({user_id, role}),
    logOut: () => set({user_id: null, role: null})
}))