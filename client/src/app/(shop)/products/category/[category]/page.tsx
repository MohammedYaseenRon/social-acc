"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";

export default function CategoryProductsPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [parentCategoryName, setParentCategoryName] = useState("");

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/products/category/${id}`);
        setProducts(res.data.products || []);
        setCategoryName(res.data.category || "");
        setParentCategoryName(res.data.parentCategory || "")
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching products by category:", err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductsByCategory();
  }, [id]);

  return (
    <div className="px-10 py-4 max-w-7xl mx-auto">
      <h1 className="text-lg font-semibold mb-6">
        Products in:{" "}
        <span className="text-blue-600">
          {parentCategoryName ? `${parentCategoryName} > ${categoryName}` : categoryName}
        </span>
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <p>No products found in this category.</p>
      )}
    </div>
  );
}
