export interface PriceRangeSelectorProps {
    minInitialPrice?: number;
    maxInitialPrice?: number;
    minLimit?: number;
    maxLimit?: number;
    step?: number;
}

export interface ProductCardProps {
    title: string;
    price: number;
    category: string;
    stock: number;
    sku: string;
    status?: 'in-stock' | 'out-of-stock';
    imageUrl?: string;
}

export interface UserProps {
    id: number,
    name: string,
    email: string,
    role: string
}

export interface ProductProps {
    id: number
    name: string
    description: string | null
    price: number
    sku: string
    stock: number
    images: string[] | string
    status: "INSTOCK" | "OUTOFSTOCK"
    createdAt: string
    vendorId: number
    categoryId: number
    category?: {
        id: number
        name: string
    }
    [key: string]: any
}

export interface CategoryResponse {
    category?: string;
    products: ProductProps[];
}

