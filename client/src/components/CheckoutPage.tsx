import React from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const CheckoutPage = () => {
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg h-12 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 h-12"
              placeholder="zipcode"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CheckoutPage