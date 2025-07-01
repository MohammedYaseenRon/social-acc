import { create } from "zustand";
import axios from "axios";
import { ProductProps } from "@/state/types";

interface Filters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
}

interface ProductStore {
  products: ProductProps[] | null;
  total: number;
  filters: Filters;
  loading: boolean;
  error: string | null;

  fetchProducts: (params?: Filters) => Promise<void>;
  setFilters: (filters: Partial<Filters>) => void;
  clearFilters: () => void;
  clearProducts: () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: null,
  total: 0,
  filters: {
    query: "",
    category: "",
    minPrice: undefined,
    maxPrice: undefined,
    sortBy: "latest",
    page: 1,
    limit: 10,
  },
  loading: false,
  error: null,

  fetchProducts: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const finalFilters = { ...get().filters, ...params };

      const searchParams = new URLSearchParams();
      Object.entries(finalFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          searchParams.append(key, String(value));
        }
      });

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products?${searchParams.toString()}`
      );

      const { products, total } = response.data;

      set({
        products,
        total: total || 0,
        filters: finalFilters,
        loading: false,
      });
    } catch (error) {
      console.error("Error while getting products", error);
      set({ error: "Failed to fetch products", loading: false });
    }
  },

  setFilters: (newFilters) =>
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    })),

  clearFilters: () =>
    set({
      filters: {
        query: "",
        category: "",
        minPrice: undefined,
        maxPrice: undefined,
        sortBy: "latest",
        page: 1,
        limit: 12,
      },
    }),

  clearProducts: () => set({ products: null, total: 0 }),
}));
