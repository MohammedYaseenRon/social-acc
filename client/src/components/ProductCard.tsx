"use client"

import type { ProductCardProps, ProductProps } from "@/state/types"
import { Star, ShoppingCart } from "lucide-react"
import Image from "next/image"
import type React from "react"
import { useState } from "react"
import { useCartStore } from "@/store/cartStore"

export const ProductCard: React.FC<{ product: ProductProps }> = ({ product }) => {
  const {
    id,
    name,
    price,
    stock,
    sku,
    status,
    image: imageUrl,
    category,
    images
  } = product;
  const [isHovered, setIsHovered] = useState(false)
  const [rating, setRating] = useState(0);
  const [quantity,setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const { addToCart, openCart } = useCartStore();

  const formatedPrice = (price: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleAddToCart = async () => {
    if (typeof id === 'undefined') {
      throw new Error("Product ID is required");
    }

    try {
      await addToCart(product, quantity); 
      console.log(addToCart);
      openCart();
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };



  return (
    <div className="group relative overflow-hidden border-0 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative h-36 overflow-hidden bg-gray-100">
        <Image
          src={Array.isArray(product.images) ? product.images[0] : product.images}
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
          onError={() => setImageError(true)}
        />
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${status === "INSTOCK" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
        >
          {status === "INSTOCK" ? "In stock" : "Out of stock"}
        </div>
        <div className="absolute top-3 left-3 px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
          {category?.name}
        </div>
      </div>

      <div className="p-3 sm:p-4 space-y-2">
        <div className="">
          <h3 className="text-sm sm:text-md font-semibold text-gray-800 line-clamp-2">{name}</h3>
          <div className="flex items-center gap-1 text-xs sm:text-sm text-black font-semibold mt-2">
            Stock: <span className="text-gray-400 font-semibold">{stock}</span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((_, index) => (
            <Star
              key={index}
              size={16}
              fill={index < rating ? "#FBBF24" : "none"}
              className={`cursor-pointer transition-colors ${index < rating ? "text-yellow-400" : "text-gray-300"}`}
              onClick={() => setRating(index + 1)}
            />
          ))}
          <span className="text-xs sm:text-sm text-gray-500 ml-1 sm:ml-2">
            {rating > 0 ? `${rating}/5` : "Rate this"}
          </span>
        </div>

        <div className="text-base sm:text-lg font-bold text-blue-600">{formatedPrice(price)}</div>

        <button
          className="w-full cursor-pointer bg-blue-600 text-white py-1.5 sm:py-2 rounded-lg text-sm sm:text-base font-medium transition-all duration-300 hover:bg-blue-700 flex items-center justify-center gap-2 group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleAddToCart}
          disabled={status !== "INSTOCK"}

        >
          {isHovered ? (
            <>
              <ShoppingCart size={18} className="animate-bounce" />
              <span>Add To Cart</span>
            </>
          ) : (
            <span>Add To Cart</span>
          )}
        </button>

        <div className="text-xs text-gray-500 pt-2 sm:pt-4 border-t border-gray-100">
          SKU: <span className="font-mono">{sku}</span>
        </div>
      </div>
    </div>
  )
}
