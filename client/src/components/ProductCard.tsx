import { ProductCardProps } from '@/state/types'
import Image from 'next/image';
import React, { useState } from 'react'

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    price,
    source,
    followers,
    sku,
    status = "out-of-stock",
    imageUrl
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const formatedPrice = (price: number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }


    return (
        <div className='w-full p-4 bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden'>
            <div className='p-2'>
                <Image
                    src={imageUrl}
                    alt='Image'
                    width={100}
                    height={100}
                    className='rounded-xl'
                />
            </div>
            <div className="p-4 pt-8">
                <h5 className="text-sm font-medium text-gray-600 mb-2">{source}</h5>
                <h3 className="text-base font-semibold text-gray-800 mb-2">{title}</h3>

                <div className="flex items-center justify-between mb-2">
                    <div className={`${status === 'in-stock' ? 'text-green-500' : 'text-red-500'}`}>
                        {status === 'in-stock' ? 'In stock' : 'Out of stock'}
                    </div>
                    <div className="text-gray-500 text-sm">{followers} Followers</div>
                </div>

                <div className="text-2xl font-bold text-blue-600 mb-4">
                    {formatedPrice(price)}
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Add To Cart
                </button>

                <div className="text-xs text-gray-500 mt-2">
                    SKU: {sku}
                </div>
            </div>
        </div>
    )
};

const ProductGrid: React.FC = () => {
    const products: ProductCardProps[] = [
      {
        title: "1 Payment Received Hindi",
        price: 14999.00,
        source: "YouTube",
        followers:"14k",
        sku: "011-1-2",
        status: "out-of-stock"
      },
      {
        title: "2 Payment Received English",
        price: 19999.00,
        source: "Spotify",
        followers:"14k",
        sku: "022-2-3",
        status: "in-stock"
      },
      {
        title: "3 Payment Received Tamil",
        price: 12999.00,
        source: "Amazon",
        followers:"14k",
        sku: "033-3-4",
        status: "out-of-stock"
      },
      {
        title: "4 Payment Received Telugu",
        price: 16999.00,
        source: "Netflix",
        followers:"14k",
        sku: "044-4-5",
        status: "in-stock"
      }
    ];

    return (
        <div className='mt-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 gap-4'>
                {products.map((product,index) => (
                    <ProductCard
                        key={index}
                        {...product}
                        
                    />
                ))}
            </div>
        </div>
    )
}
  

export default ProductGrid