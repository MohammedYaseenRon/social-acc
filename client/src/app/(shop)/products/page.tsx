"use client"

import { ProductCard } from "@/components/ProductCard";
import { useProductStore } from "@/store/productStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";



export default function ProductsPage() {
  const { products, loading, error, fetchProducts } = useProductStore();
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);


  useEffect(() => {
    fetchProducts({ category, minPrice, maxPrice, status, sortBy, page, limit });
  }, [category, minPrice, maxPrice, status, sortBy, page]);


  return (
    <div className="flex items-center">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-3 gap-12 cursor-pointer">
          {products?.map((product) => (
            <Link href={`/products/${product.slug}`}>
              <ProductCard
                key={product.id}
                title={product.name}
                price={product.price}
                category={product.category?.name || ''}
                stock={product.stock}
                sku={product.sku}
                imageUrl={Array.isArray(product.images) ? product.images[0] : product.images}
                status={product.status === 'INSTOCK' ? 'in-stock' : 'out-of-stock'}

              /></Link>
          ))}
        </div>
        {products && products.length > 0 && (
          <div className="flex items-center justify-center mt-8 gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm">Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-4 py-2 border rounded"
            >
              Next
            </button>
          </div>
        )}
        {products && products.length === 0 && (
          <div className="text-center py-12 text-gray-500 text-lg">
            No products found.
          </div>
        )}
      </div>
    </div>
  )
}
