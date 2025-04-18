"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "@/components/ProductList";
import type { CategoryResponse } from "@/state/types";

const CategoryPage = ({ params }: { params: { category: string } }) => {
  const [data, setData] = useState<CategoryResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res = await axios.get<CategoryResponse>(
          `${process.env.NEXT_PUBLIC_API_URL}/products/category/${params.category}`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching category data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, [params.category]);

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Category: {data.category}</h1>
      <ProductList products={data.products} />
    </div>
  );
};

export default CategoryPage;
