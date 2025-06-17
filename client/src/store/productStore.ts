import { create } from "zustand"
import axios from "axios"

import { ProductProps } from "@/state/types"
import { Value } from "@radix-ui/react-select"

interface ProductStore {
    products: ProductProps[] | null
    loading: boolean
    error: string | null
    fetchProducts: (params?: Record<string, string | number | undefined>) => Promise<void>
    setProducts: (products: ProductProps[]) => void
    clearProducts: () => void

}

export const useProductStore = create<ProductStore>((set) => ({
    products: null,
    loading: false,
    error: null,

    fetchProducts: async (params = {}) => {
        set({ loading: true, error: null })
        try {
            const searchParams = new URLSearchParams();

            Object.entries(params).forEach(([key, value]) => {
                if (value !== undefined && value !== "") {
                    searchParams.append(key, String(value));
                }
            })
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products?${searchParams.toString()}`);
            set({ products: response.data, loading: false })
        } catch (error) {
            console.log("Error while getting products", error);
            set({ error: "Failed to fetch Products", loading: false })
        }
    },

    setProducts: (products) => set({ products }),
    clearProducts: () => set({ products: null }),
}))