import { create } from "zustand";
import axios from "axios";
import { ProductProps } from "@/state/types";
import { useUserStore } from "./userStore";

interface Filters {
  query?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string;
  page?: number;
  limit?: number;
  vendorId?: number
}

interface ProductStore {
  products: ProductProps[];
  total: number;
  filters: Filters;
  loading: boolean;
  error: string | null;



  fetchProducts: (params?: Filters) => Promise<void>;
  fetchVendorProducts: (params?: Filters) => Promise<void>;
  updateProduct: (id: number, data: Partial<ProductProps>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  setFilters: (filters: Partial<Filters>) => void;
  clearFilters: () => void;
  clearProducts: () => void;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
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

  fetchVendorProducts: async (params = {}) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("token");
      const { user } = useUserStore.getState();

      if (!token || user?.role !== "VENDOR") {
        throw new Error("Not a vendor or not logged in");

      }
      const finalFilters = { ...get().filters, ...params };

      const searchParams = new URLSearchParams();
      Object.entries(finalFilters).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
          searchParams.append(key, String(value));
        }
      });
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/products/vendor?${searchParams.toString()}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
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

  updateProduct: async (id, patch) => {
    try {
      // optimistic UI
      set((s) => ({
        products: s.products.map((p) =>
          p.id === id ? { ...p, ...patch } : p
        ),
      }));

      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`,
        patch
      );

      // sync with server response
      set((s) => ({
        products: s.products.map((p) =>
          p.id === id ? data.product : p
        ),
      }));
    } catch (err) {
      console.error("updateProduct error:", err);
      set({ error: "Failed to update product" });
      await get().fetchProducts(); // rollback
    }
  },

  deleteProduct: async (id) => {
    try {
      // optimistic remove
      set((s) => ({
        products: s.products.filter((p) => p.id !== id),
        total: Math.max(0, s.total - 1),
      }));

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/products/${id}`
      );
    } catch (err) {
      console.error("deleteProduct error:", err);
      set({ error: "Failed to delete product" });
      await get().fetchProducts(); // rollback
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

  clearProducts: () => set({ products: [], total: 0 }),
}));
