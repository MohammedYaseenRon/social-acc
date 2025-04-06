"use client"

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { X } from 'lucide-react';
import React, { ChangeEvent, use, useEffect, useState } from 'react'

interface AddpageProps {
  name: string;
  category: string;
  status: "Instock" | "Out of Stock";
  price: number;
  image: string;
  sku: string;
  stock: number
}

interface Category {
  id: string;
  name: string;
}

const Addpage: React.FC<AddpageProps> = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    status: "INSTOCK",
    price: 0,
    image: "",
    sku: "",
    stock: 0
  })
  const [images, setImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selected = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...selected]);

      const previews = selected.map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...previews]);
    }

  }
  const removeImage = (index: number) => {
    setImages((images.filter((_, i) => i !== index)));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("price", formData.price.toString());
      formDataToSend.append("sku", formData.sku);
      formDataToSend.append("status", formData.status);
      formDataToSend.append("stock", formData.stock.toString());
      formDataToSend.append("categoryName", formData.category);
      formDataToSend.append("isActive", formData.status === "INSTOCK" ? "true" : "false");
      // formDataToSend.append("vendorId", "1");

      selectedFiles.forEach(file => {
        formDataToSend.append("images", file);
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );


      console.log(response.data);
      if (response.status === 201) {
        setFormData({
          name: "",
          category: "",
          status: "INSTOCK",
          price: 0,
          image: "",
          sku: "",
          stock: 0
        });
        setImages([]);
        setSelectedFiles([]);
        console.log(response.data);
      } else {
        alert("Something went wrong, please try again.")
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Something went wrong, please try again.")
    }
  }

  return (
    <div className='p-6 space-y-4 border border-gray-200 bg-white shadow-md rounded-lg'>
      <h1 className='text-2xl font-bold'>Add New Product</h1>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='space-y-2'>
          <label htmlFor="name" className='text-sm font-medium'>Product Title</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className='w-full p-2 border border-gray-300 rounded'
            placeholder='Enter product title' />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label htmlFor='category' className='text-sm font-medium'>Category</label>
            <select className='w-full p-2 border border-gray-300 rounded' id='category' name='category' value={formData.category} onChange={handleInputChange}>
              <option value="">Select Category</option>
              {categories?.map((category, index) => (
                <option key={index} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
          <div className='space-y-2'>
            <label htmlFor='status' className='text-sm font-medium'>Status</label>
            <select className='w-full p-2 border border-gray-300 rounded' id='status' name='status' value={formData.status} onChange={handleInputChange}>
              <option value="">Select Status</option>
              <option value="INSTOCK">In stock</option>
              <option value="OUT_OF_STOCK">Out of Stock</option>
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
              multiple
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
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className='space-y-2'>
            <label htmlFor='stock' className='text-sm font-medium'>Stock</label>
            <input
              type='number'
              id='stock'
              name='stock'
              value={formData.stock}
              onChange={handleInputChange}
              placeholder='Enter stock quantity'
              className='w-full p-2 border border-gray-300 rounded'
            />
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
        </div>
        <div>
          <Button
            type="submit"
            className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200'
          >Create Product</Button>
        </div>
      </form>
    </div>
  )
}

export default Addpage