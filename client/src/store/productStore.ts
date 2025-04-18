import { create } from "zustand"
import axios from "axios"

import { ProductProps } from "@/state/types"

interface ProductStore {
    products: ProductProps[] | null
    loading: boolean
    error: string | null
    fetchProducts: () => Promise<void>
    setProducts: (user: ProductProps[]) => void
    clearProducts: () => void

}

export const useProductStore = create<ProductStore>((set) => ({
    products: null,
    loading: false,
    error: null,

    fetchProducts: async () => {
        set({ loading: true, error: null })
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products`);
            set({ products: response.data, loading: false })
        } catch (error) {
            console.log("Error while getting products", error);
            set({ error: "Failed to fetch Products", loading: false })
        }
    },

    setProducts: (products) => set({ products }),
    clearProducts: () => set({ products: null }),
}))