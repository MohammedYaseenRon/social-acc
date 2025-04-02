import React from 'react'
import { motion } from 'framer-motion'

interface StatsCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
    change?: {
        value: number | string;
        positive: boolean;
    }
    iconClassName?: string;
}

const StatCard: React.FC<StatsCardProps> = ({
    title,
    value,
    icon,
    change,
    iconClassName = "text-brand-500"
}) => {
    return (
        <motion.div
            className='stat-card rounded-lg p-4 border border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-300'
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <div className='flex items-start justify-between mb-4'>
                <div>
                    <h2 className='text-lg font-bold text-black'>{title}</h2>
                    <span className='text-lg font-medium'>{value}</span>
                </div>
                <div className={`p-3 rounded-lg bg-opacity-10 ${iconClassName.includes('text-') ? iconClassName.replace('text-', 'bg-') + '/10' : 'bg-brand-500/10'}`}>
                    <div className={`${iconClassName}`}>
                        {icon}
                    </div>
                </div>
            </div>

            {change && (
                <div className='flex item-center'>
                    <div className={`text-sm font-medium ${change.positive ? "text-green-600" : "text-red-600"}`}>
                        {change.positive ? '↑' : '↓'} {change.value}
                    </div>
                    <span className="text-xs text-gray-500 ml-2">vs last month</span>
                </div>
            )}

        </motion.div>
    )
}

export default StatCard