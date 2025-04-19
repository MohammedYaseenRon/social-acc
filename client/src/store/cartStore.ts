import { create } from "zustand"
import { CartItem } from "@/state/types";
import axios from "axios";

interface CartStore {
    items: CartItem[];
    isOpen: boolean;
    isLoading: boolean;
    error: string | null;

    openCart: () => void;
    closeCart: () => void;

    // api action
    fetchCart: () => Promise<void>;
    addToCart: (productId: number, quantity: number) => void;
    updateQuantity: (itemId: number, newQuantity: number) => Promise<void>;
    removeItem: (itemId: number) => Promise<void>;
    clearCart: (userId: number) => Promise<void>;

}

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    isOpen: false,
    isLoading: false,
    error: null,

    openCart: () => set({ isOpen: true }),
    closeCart: () => set({ isOpen: false }),


    fetchCart: async () => {
        set({ isLoading: true, error: null });
        const token = localStorage.getItem("token");
        if (!token) {
            set({ error: "User not authenticated", isLoading: false });
            return;
        }

        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Cart API Response:", response.data); 
            set({ items: Array.isArray(response.data) ? response.data : response.data.cartItems, isLoading: false });
        } catch (error) {
            set({ error: 'Failed to fetch cart', isLoading: false });
        }
    },

    addToCart: async (productId: number, quantity: number) => {
        set({ isLoading: true, error: null });
        const token = localStorage.getItem("token");
        if (!token) {
            set({ error: "User not authenticated", isLoading: false });
            return;
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/add`, { productId, quantity }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            await get().fetchCart();
            set({ isLoading: false });
        } catch (error) {
            set({
                error: error instanceof Error ? error.message : "Failed to add item to cart",
                isLoading: false
            });
        }
    },

    updateQuantity: async (itemId: number, quantity: number) => {
        set({ isLoading: true, error: null });
        try {
            await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`, { quantity });
            set(state => ({
                items: state.items.map(item => item.id === itemId ? { ...item, quantity } : item),
                isLoading: false
            }));
        } catch (error) {
            set({ error: 'Failed to update quantity', isLoading: false });
        }
    },

    removeItem: async (itemId: number) => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/${itemId}`);
            set(state => ({
                items: state.items.filter(item => item.id !== itemId),
                isLoading: false
            }));
        } catch (error) {
            set({ error: 'Failed to remove item', isLoading: false });
        }
    },

    clearCart: async (userId: number) => {
        set({ isLoading: true, error: null });
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/cart/user/${userId}`);
            set({ items: [], isLoading: false });
        } catch (error) {
            set({ error: 'Failed to clear cart', isLoading: false });
        }
    }
}))