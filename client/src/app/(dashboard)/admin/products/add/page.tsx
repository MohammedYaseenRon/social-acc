"use client"

import { url } from 'inspector';
import { X } from 'lucide-react';
import React, { ChangeEvent, useState } from 'react'

interface AddpageProps {
  title: string;
  category: string;
  status: "Instock" | "Out of Stock";
  price: number;
  image: string;
  sku: string;
}

const Addpage: React.FC<AddpageProps> = () => {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    status: "Instock",
    price: 0,
    image: "",
    sku: ""
  })
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectFiles = Array.from(e.target.files);
      const imagePreviews = selectFiles.map((file) => URL.createObjectURL(file));
      setImages([...images, ...imagePreviews]);
    }

  }
  const removeImage = (index: number) => {
    setImages((images.filter((_, i) => i !== index)));
  }

  return (
    <div className='p-6 space-y-4 border border-gray-200 bg-white shadow-md rounded-lg'>
      <h1 className='text-2xl font-bold'>Add New Product</h1>
      <form className='space-y-4'>
        <div className='space-y-2'>
          <label htmlFor="title" className='text-sm font-medium'>Product Title</label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='Enter product title' />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label htmlFor='category' className='text-sm font-medium'>Category</label>
            <select className='w-full p-2 border border-gray-300 rounded' id='category' value={formData.category} onChange={handleInputChange}>
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="fashion">Fashion</option>
              <option value="home">Home</option>
              <option value="books">Books</option>
            </select>
          </div>
          <div className='space-y-2'>
            <label htmlFor='category' className='text-sm font-medium'>Status</label>
            <select className='w-full p-2 border border-gray-300 rounded' id='category' value={formData.status} onChange={handleInputChange}>
              <option value="">Select Status</option>
              <option value="instock">In stock</option>
              <option value="outOFStock">Out of Stock</option>
            </select>
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label htmlFor='price' className='text-sm font-medium'>Price(INR)</label>
            <input
              id="price"
              name='price'
              type="number"
              placeholder='Price'
              value={formData.price}
              onChange={handleInputChange}
              className='w-full p-2 border border-gray-300 rounded'

            />
          </div>
          <div className='space-y-2'>
            <label htmlFor='category' className='text-sm font-medium'>Image</label>
            <input
              type='file'
              id='image'
              name='image'
              accept='image/*'
              value={formData.image}
              onChange={handleImageSelect}
              className='w-full p-2 border border-gray-300 rounded cursor-pointer'
            />
          </div>
          {images.length > 0 && (
            <div className='mt-4'>
              <div className="flex gap-4 flex-wrap">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt="preview" className="h-24 w-24 object-cover rounded-md border" />
                    <button
                      type="button"
                      className="absolute -top-2 -right-2 bg-red-500 cursor-pointer text-white rounded-full p-1"
                      onClick={() => removeImage(index)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
        <div className='space-y-2'>
          <label htmlFor='sku' className='text-sm font-medium'>Sku</label>
          <input
            type='text'
            id='sku'
            name='sku'
            value={formData.sku}
            onChange={handleInputChange}
            placeholder='Enter SKU'
            className='w-full p-2 border border-gray-300 rounded'
          />
        </div>
      </form>
    </div>
  )
}

export default Addpage