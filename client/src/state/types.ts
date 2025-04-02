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
    source: string;
    followers:string;
    sku: string;
    status?: 'in-stock' | 'out-of-stock';
    imageUrl?: string;
}