"use client"
import axios from 'axios';
import { ChevronDown, Plus, X } from 'lucide-react';
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"



interface FormData {
  name: string;
  category: string;
  status: "INSTOCK" | "OUT_OF_STOCK";
  price: number;
  image: string;
  sku: string;
  stock: number
}

interface CategoryProps {
  categories: {
    id: number;
    name: string;
    subcategories: {
      id: number;
      name: string;
    }[];
  }[];
}

const Addpage = () => {
  const [formData, setFormData] = useState<FormData>({
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
  const [categories, setCategories] = useState<CategoryProps["categories"]>([]);
  const [addCategory, setAddCategory] = useState(false);
  const [selectedCategoryDisplay, setSelectedCategoryDisplay] = useState<string>("");
  const [dropdownOpen, setDropdownOpen] = useState(false);


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/categories`);
        setCategories(response.data.categories || response.data);
        console.log(response.data);
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

  const handleCategorySelect = (categoryName: string, subcategoryName: string) => {
    const displayText = `${categoryName} - ${subcategoryName}`;
    setSelectedCategoryDisplay(displayText);
    setFormData({
      ...formData,
      category: subcategoryName
    });
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

      if (selectedFiles.length > 0) {
        selectedFiles.forEach((file) => {
          formDataToSend.append("images", file);
        });
      }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("Authentication token missing. Please log in again.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/products`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setFormData({
          name: "",
          category: "",
          status: "INSTOCK",
          price: 0,
          image: "",
          sku: "",
          stock: 0,
        });
        setImages([]);
        setSelectedFiles([]);
        setSelectedCategoryDisplay("");
      }
    } catch (error) {
      console.error("Error while creating prodcuts", error)
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="bg-white rounded-lg shadow-sm p-8">
      <div className="flex items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Add New Product</h1>
        <span className="ml-3 px-2 py-1 text-xs font-medium text-blue-700 bg-blue-100 rounded-md">
          New
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Title */}
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Product Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product title"
          />
        </div>

        {/* Category and Status in a grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 w-full">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 relative">
              <div className="flex-1">
                <button
                  type="button"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full flex justify-between items-center px-3 py-2 border border-gray-300 rounded-lg bg-white text-left"
                >
                  <span className={selectedCategoryDisplay ? "text-gray-900" : "text-gray-500"}>
                    {selectedCategoryDisplay || "Select Category"}
                  </span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </button>

                {dropdownOpen && (
                  <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <div key={category.id} className="border-b border-gray-100">
                          <div className="px-4 py-2 text-sm font-semibold text-gray-800 bg-gray-50">
                            {category.name}
                          </div>
                          {category.subcategories.length > 0 ? (
                            category.subcategories.map((subcat) => (
                              <div
                                key={subcat.id}
                                onClick={() => {
                                  handleCategorySelect(category.name, subcat.name);
                                  setDropdownOpen(false);
                                }}
                                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                              >
                                {subcat.name}
                              </div>
                            ))
                          ) : (
                            <div className="px-4 py-2 text-sm text-gray-400">No subcategories</div>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-sm text-gray-400">No categories available</div>
                    )}
                  </div>
                )}
              </div>

              <Button
                type="button"
                onClick={() => setAddCategory(!addCategory)}
                variant="outline"
                size="icon"
                className="h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>


          <div className="space-y-2">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Status</option>
                <option value="INSTOCK">In stock</option>
                <option value="OUT_OF_STOCK">Out of Stock</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        {addCategory && (
          <div className="space-y-2 ">
            <div className='flex items-end gap-6'>
              <div className='space-y-2 flex-1'>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Add Category  <span className="text-red-500">*</span>
                </label>
                <input
                  type="addCategory"
                  id="addCategory"
                  name="addcategory"
                  // value={formData.price}
                  onChange={handleInputChange}
                  className="w-full pl-4 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add Category"
                />
              </div>
              <div className='pt-7'>
                <Button className='h-10 bg-blue-600 text-black'>
                  Save
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Price and Image Upload */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Price (INR) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-500">₹</span>
              </div>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <div className="border border-dashed border-gray-300 rounded-lg bg-gray-50">
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="flex flex-col items-center justify-center w-full h-10 cursor-pointer"
              >
                <svg className="w-8 h-8 text-gray-400 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-500">Click to upload images</span>
              </label>
            </div>
          </div>
        </div>

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="mt-4">
            <div className="flex gap-3 flex-wrap">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt="preview"
                    className="h-20 w-20 object-cover rounded-md border border-gray-200"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 bg-white border border-gray-200 text-gray-600 rounded-full p-1 shadow-sm hover:bg-gray-100"
                    onClick={() => removeImage(index)}
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stock and SKU */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stock <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="sku" className="block text-sm font-medium text-gray-700">
              SKU
            </label>
            <input
              type="text"
              id="sku"
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter SKU"
            />
          </div>
        </div>

        {/* Create Product Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Product
          </button>
        </div>
      </form>
    </div>
  )
}

export default Addpage