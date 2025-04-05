import ProductGrid from '@/components/ProductCard'
import React from 'react'

const page = () => {
  return (
    <div>
        <div className='flex flex-col items-center justify-center w-full h-screen'>
            <h1 className='text-3xl font-bold'>Welcome to the Shop</h1>
            <p className='mt-4 text-lg'>Explore our collection of products</p>
        </div>
        <ProductGrid />
    </div>
  )
}

export default page