export interface PriceRangeSelectorProps {
    minInitialPrice?: number;
    maxInitialPrice?: number;
    minLimit?: number;
    maxLimit?: number;
    step?: number;
    onChange?:(range: [number, number]) => void;
}

export interface ProductCardProps {
    id?:number;
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

export interface CartItem {
    id: number;
    productId: number;
    quantity: number;
    product: ProductProps
  }

export interface Category {
    id: number;
    name: string;
    subcategories: {
        id: number;
        name: string;
    }[];
}


export interface OrderItemPayload {
    productId: number,
    quantity:number,
    price:number
}

export interface ShippingInfo {
    name:string,
    lastName:string,
    email:string,
    address:string,
    city:string,
    state:string,
    zipcode:string
}

export interface OrderPayload {
    userId: number,
    vendorId:number,
    totalAmount: number,
    shippingFee: number,
    orderItems:OrderItemPayload[],
    shippingAddress: ShippingInfo,
}


