import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { useCheckoutStore } from '@/store/checoutStore'


const CheckoutPage = () => {
  const [formData,setFormData] = useState({
    name:"",
    lastName:"",
    email:"",
    address:"",
    city:"",
    state:"",
    zipcode:"",

  });
  const {setShippingInfo} =  useCheckoutStore();

  const handleValueChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const {name, value } = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  }

  const handleSubmit = () => {
    setShippingInfo(formData);
    console.log("shipping info saved", formData);
  }


  return (
    <Card >
      <CardHeader className='flex items-center gap-2'>
        <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium">
          1
        </div>        
        <CardTitle className='text-base text-black'>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
          <div className="space-y-2">
            <Label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleValueChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg h-12 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="John"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="lastName"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleValueChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg h-12 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Doe"
            />
          </div>
        </div>
        <div className='space-y-2'>
          <Label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={formData.email}
              onChange={handleValueChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 h-12"
            placeholder="email"
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Address <span className="text-red-500">*</span>
          </Label>
          <Input
            type="address"
            id="address"
            name="address"
            value={formData.address}
              onChange={handleValueChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 h-12"
            placeholder="address"
          />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-2'>
          <div className='space-y-2'>
            <Label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </Label>
            <Input
              type="city"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleValueChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500  h-12 focus:border-blue-500"
              placeholder="city"
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State <span className="text-red-500">*</span>
            </Label>
            <Input
              type="state"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleValueChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 h-12 focus:border-blue-500"
              placeholder="state"
            />
          </div>
          <div className='space-y-2'>
            <Label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
              Zipcode <span className="text-red-500">*</span>
            </Label>
            <Input
              type="zipcode"
              id="zipcode"
              name="zipcode"
              value={formData.zipcode}
              onChange={handleValueChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 h-12"
              placeholder="zipcode"
            />
          </div>
        </div>
        <div className='flex items-end justify-end'>
          <Button onClick={handleSubmit} className='w-24 h-10'>
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CheckoutPage