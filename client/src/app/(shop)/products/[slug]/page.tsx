// app/products/[slug]/page.tsx - Server Component
import axios from 'axios';
import { notFound } from 'next/navigation';
import ProductPageClient from '@/components/ProductPage';


async function getProductBySlug(slug: string) {
  try {
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/products/details/${slug}`;
    const res = await axios.get(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });
    return res.data;
  } catch (error: any) {
    console.error("❌ Full error object:", error);

    if (error.response?.status === 404) {
      notFound();
    }

    throw new Error(`API Error: ${error.message}`);
  }
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  try {
    const product = await getProductBySlug(params.slug);
    
    return <ProductPageClient product={product} />;
  } catch (error) {
    console.error("❌ Product page error:", error);
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-red-600">Error Loading Product</h1>
        <p className="text-gray-600">Error: {error instanceof Error ? error.message : 'Unknown error'}</p>
        <p className="text-sm text-gray-400 mt-2">Check console for details</p>
      </div>
    );
  }
}

