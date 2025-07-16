"use client";
import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { Button } from './ui/button';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';


const CartModal = () => {
  const {
    isOpen,
    closeCart,
    items: cartItems,
    updateQuantity,
    removeItem,
  } = useCartStore();

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const router  = useRouter();
  // Handle animation states
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 300); // match this with the CSS transition time
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  if (!isVisible) return null;


  //format currency 
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-IN", {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
    }).format(amount);
  }

  // Calculate cart totals
  const subtotal = (cartItems ?? []).reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 1000 ? 0 : 5.99;
  const total = subtotal + shipping;

  // Handle quantity updates
  const handleQuantityChange = (itemId: number, change: number): void => {
    if (!updateQuantity) return;

    const item = cartItems.find(item => item.id === itemId);
    if (!item) return;

    const newQuantity = Math.max(1, item.quantity + change);
    updateQuantity(itemId, newQuantity);
  };


  const handleClick = () => {
    router.push("/checkout");
  }

  // Handle item removal
  const handleRemoveItem = (itemId: number): void => {
    removeItem?.(itemId);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      onClick={closeCart}
    >
      {/* Modal Content */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="flex items-center">
            <ShoppingCart className="mr-2 text-blue-600" />
            <h2 className="text-lg font-semibold">Your Cart ({(cartItems ?? []).length})</h2>
          </div>
          <button
            onClick={closeCart}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {(cartItems ?? []).length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64">
              <ShoppingCart size={64} className="text-gray-300 mb-4" />
              <p className="text-gray-500">Your cart is empty</p>
              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={closeCart}
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex items-center py-4 border-b">
                <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={
                      Array.isArray(item.product.images) && item.product.images.length > 0
                        ? item.product.images[0]
                        : "/placeholder.jpg" 
                    }
                    alt={item.product.name}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 ml-4">
                  <h3 className="font-medium">{item.product.name}</h3>
                  {/* <p className="text-sm text-gray-500">
                  {item.product.options &&
                    Object.entries(item.options).map(([key, value]) => (
                      <span key={key}>{key}: {value} </span>
                    ))}
                </p> */}
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center border rounded-md">
                      <button
                        className="px-2 py-1 hover:bg-gray-100"
                        onClick={() => handleQuantityChange(item.id, -1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-2">{item.quantity}</span>
                      <button
                        className="px-2 py-1 hover:bg-gray-100"
                        onClick={() => handleQuantityChange(item.id, +1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="font-semibold">{formatCurrency(Number((item.product.price * item.quantity).toFixed(2)))}</span>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  className="ml-2 p-1 text-gray-400 hover:text-red-500"
                  onClick={() => handleRemoveItem(item.id)}
                  aria-label="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Cart Summary */}
        {(cartItems ?? []).length > 0 && (
          <div className="border-t p-4 bg-gray-50">
            <div className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span>Shipping</span>
              <span>{formatCurrency(shipping)}</span>
            </div>
            <div className="flex justify-between py-2 font-semibold text-lg border-t mt-2">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
            <Button onClick={handleClick} className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
              Checkout
            </Button>
            <Button
              variant="outline"
              className="w-full mt-2 border-blue-600 text-blue-600 hover:bg-blue-50"
              onClick={closeCart}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;