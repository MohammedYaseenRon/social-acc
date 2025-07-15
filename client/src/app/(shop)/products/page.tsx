"use client"

import { ProductCard } from "@/components/ProductCard";
import { useProductStore } from "@/store/productStore";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";



export default function ProductsPage() {
  const { products, fetchProducts } = useProductStore();
  const [category, setCategory] = useState('');

  const [sortBy, setSortBy] = useState('latest');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    fetchProducts({ category, sortBy, page, limit, query });
  }, [category, sortBy, page, query]);


  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
        {products?.map((product) => (
          <Link href={`/products/${product.slug}`}>
            <ProductCard key={product.id} product={product}
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

  )
}
