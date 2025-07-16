import { UserProps } from "@/state/types"
import axios from "axios"
import { create } from "zustand"

interface UserStore {
    user: UserProps | null
    loading: boolean
    initialized: boolean
    error: string | null
    fetchUsers: () => Promise<void>
    setUser: (user: UserProps) => void
    clearUsers: () => void

}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    loading: true,
    initialized: false,
    error: null,

    fetchUsers: async () => {
        set({ loading: true, error: null })

        const token = localStorage.getItem("token");
        if (!token) {
            set({ loading: false, })
            return
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },

            });
            set({ user: response.data, loading: false, initialized: true })
        } catch (error) {
            console.log("Error while getting your details", error);
            set({ user: null, loading: false, initialized: true, error: "Auth failed" });
        }
    },

    setUser: (user) => set({ user }),
    clearUsers: () => set({ user: null }),
}))