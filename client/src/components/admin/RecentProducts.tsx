import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye } from 'lucide-react';

const mockProducts = [
  {
    id: 1,
    name: 'Premium UI Kit Bundle',
    image: '/placeholder.svg',
    price: '$49.99',
    sales: 128,
    vendor: 'DesignCo',
    status: 'active'
  },
  {
    id: 2,
    name: 'JavaScript Course 2023',
    image: '/placeholder.svg',
    price: '$89.99',
    sales: 97,
    vendor: 'CodeMasters',
    status: 'active'
  },
  {
    id: 3,
    name: 'Stock Photo Collection',
    image: '/placeholder.svg',
    price: '$29.99',
    sales: 215,
    vendor: 'PixelPerfect',
    status: 'active'
  },
  {
    id: 4,
    name: 'Marketing eBook Bundle',
    image: '/placeholder.svg',
    price: '$19.99',
    sales: 63,
    vendor: 'MarketPro',
    status: 'pending'
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const RecentProducts: React.FC = () => {
  return (
    <motion.div 
      className="dashboard-card border border-gray-200 bg-white shadow-md rounded-lg p-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Recent Products</h2>
        <button className="text-sm text-brand-600 hover:underline">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vendor</th>
              <th className="px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-2 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockProducts.map((product) => (
              <motion.tr key={product.id} variants={item} className="hover:bg-gray-50">
                <td className="px-2 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 rounded bg-gray-200 overflow-hidden">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{product.price}</td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{product.sales}</td>
                <td className="px-2 py-4 whitespace-nowrap text-sm text-gray-500">{product.vendor}</td>
                <td className="px-2 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full captialize
                    ${product.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                    `}>
                        {product.status}
                  </span>
                </td>
                <td className="px-2 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <button className="p-1 text-gray-500 hover:text-brand-500">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 text-gray-500 hover:text-brand-500">
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default RecentProducts;