"use client"
import { ProductCard } from "./ProductCard"
import { useEffect, useState } from "react"
import Pricerange from "@/components/Pricerange"
import type { ProductProps } from "@/state/types"
import { useCartStore } from "@/store/cartStore"
import CartModal from "./CartModal"

interface ProductListProps {
    products: ProductProps[];
}


const mapProductToCardProps = (product: ProductProps) => {
    return {
        id: product.id,
        title: product.name,
        price: product.price,
        category: product.category?.name || `Category ${product.categoryId}`,
        stock: product.stock,
        sku: product.sku,
        status: (product.status === "INSTOCK" ? "in-stock" : "out-of-stock") as "in-stock" | "out-of-stock",
        imageUrl: Array.isArray(product.images) ? product.images[0] : product.images,
    }
}


const ProductList = ({ products }: ProductListProps) => {
    const [activeView, setActiveView] = useState("grid")
    const [activeFilter, setActiveFilter] = useState(12)
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const {
        items,
        isOpen,
        closeCart,
        updateQuantity,
        removeItem,
        fetchCart
    } = useCartStore();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const mappedCartItems = Array.isArray(items) ? items.map(item => ({
        id: item.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        image: Array.isArray(item.product.image) ? item.product.image[0] : item.product.image
    })) : [];

    return (
        <div className="container mx-auto p-4 sm:py-8">
            {/* Breadcrumb */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8">
                {/* <div className="text-gray-600 mb-2 sm:mb-0">
                    <span>Home</span>
                    <span className="mx-2">/</span>
                </div> */}
                <div className="text-gray-600 text-sm sm:text-base">
                    Showing 1-{Math.min(products.length, activeFilter)} of {products.length} results
                </div>
            </div>

            {/* Mobile Filter Toggle */}
            <div className="md:hidden flex justify-between items-center mb-4 bg-gray-50 p-3 rounded-lg">
                <h2 className="font-medium">Filters</h2>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="flex items-center text-gray-700 hover:text-blue-600"
                >
                    <span>{sidebarOpen ? "Hide Filters" : "Show Filters"}</span>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`ml-2 transition-transform ${sidebarOpen ? "rotate-180" : ""}`}
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 sm:gap-8">
                {/* Sidebar */}
                {/* <div className={`w-full md:w-64 ${sidebarOpen ? "block" : "hidden md:block"} transition-all duration-200`}>
                    <div>
                        <Pricerange />
                    </div>
                </div> */}

                {/* Main Content */}
                <div className="flex-1">
                    {/* Header with title, views and sorting */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
                        {/* <h1 className="text-xl sm:text-2xl font-medium text-gray-800 mb-4 sm:mb-0">AdSense</h1> */}

                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto">
                            <div className="flex items-center text-gray-600 text-sm sm:text-base">
                                <span className="mr-2">Show:</span>
                                <div className="flex space-x-1">
                                    {[9, 12, 18, 24].map((num) => (
                                        <button
                                            key={num}
                                            className={`px-1 sm:px-2 ${activeFilter === num ? "text-blue-600 font-medium" : ""}`}
                                            onClick={() => setActiveFilter(num)}
                                        >
                                            {num}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-1 sm:gap-2">
                                <button
                                    className={`p-1 sm:p-2 ${activeView === "list" ? "text-blue-600" : "text-gray-400"}`}
                                    onClick={() => setActiveView("list")}
                                    aria-label="List view"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="3" y1="6" x2="21" y2="6"></line>
                                        <line x1="3" y1="12" x2="21" y2="12"></line>
                                        <line x1="3" y1="18" x2="21" y2="18"></line>
                                    </svg>
                                </button>
                                <button
                                    className={`p-1 sm:p-2 ${activeView === "grid" ? "text-blue-600" : "text-gray-400"}`}
                                    onClick={() => setActiveView("grid")}
                                    aria-label="Grid view"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="3" y="3" width="7" height="7"></rect>
                                        <rect x="14" y="3" width="7" height="7"></rect>
                                        <rect x="3" y="14" width="7" height="7"></rect>
                                        <rect x="14" y="14" width="7" height="7"></rect>
                                    </svg>
                                </button>
                                <button
                                    className={`p-1 sm:p-2 ${activeView === "large-grid" ? "text-blue-600" : "text-gray-400"}`}
                                    onClick={() => setActiveView("large-grid")}
                                    aria-label="Large grid view"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <rect x="3" y="3" width="4" height="4"></rect>
                                        <rect x="10" y="3" width="4" height="4"></rect>
                                        <rect x="17" y="3" width="4" height="4"></rect>
                                        <rect x="3" y="10" width="4" height="4"></rect>
                                        <rect x="10" y="10" width="4" height="4"></rect>
                                        <rect x="17" y="10" width="4" height="4"></rect>
                                        <rect x="3" y="17" width="4" height="4"></rect>
                                        <rect x="10" y="17" width="4" height="4"></rect>
                                        <rect x="17" y="17" width="4" height="4"></rect>
                                    </svg>
                                </button>
                            </div>

                            <div className="relative w-full sm:w-auto mt-2 sm:mt-0">
                                <select className="appearance-none w-full sm:w-auto bg-white border border-gray-300 text-gray-700 py-2 px-3 pr-8 rounded-md text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500">
                                    <option>Default sorting</option>
                                    <option>Sort by popularity</option>
                                    <option>Sort by price: low to high</option>
                                    <option>Sort by price: high to low</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Product Grid - Responsive for all screen sizes */}
                    <div
                        className={`grid grid-cols-1 ${activeView === "list"
                            ? "sm:grid-cols-1"
                            : activeView === "large-grid"
                                ? "grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4"
                                : "sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
                            } gap-4 sm:gap-6`}
                    >
                        {products.slice(0, activeFilter).map((product, index) => (
                            <div key={product.id || index} className={activeView === "list" ? "col-span-1" : ""}>
                                <ProductCard {...mapProductToCardProps(product)} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <CartModal
                isOpen={isOpen}
                onClose={closeCart}
                cartItems={mappedCartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
            /> */}
        </div>
    )
}

export default ProductList
