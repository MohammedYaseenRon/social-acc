import { PriceRangeSelectorProps } from '@/state/types';
import React, { useState } from 'react'
import { Slider } from './ui/slider';

const Pricerange: React.FC<PriceRangeSelectorProps> = ({
    minInitialPrice = 0,
    maxInitialPrice = 1000,
    minLimit = 0,
    maxLimit = 50000,
    step = 10
}) => {
    const [priceRange, setPriceRange] = useState([
        minInitialPrice, maxInitialPrice
    ]);

    const formatedPrice = (price:number): string => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    }

    const handlePriceRange = (values: [number, number]) => {
        setPriceRange(values);
    }
    return (
        <div className='max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg'>
            <h2 className='text-lg text-black font-medium'>Filter by Price</h2>
            <div className='flex justify-between mb-4'>
                <div className='bg-gray-100 text-black rounded-lg p-2'>
                    <span className='text-sm text-gray-400'>Min:</span>
                    <span className='font-bold ml-2'>{formatedPrice(priceRange[0])}</span>
                </div>
                <div className='bg-gray-100 text-black rounded-lg p-2'>
                    <span className='text-sm text-gray-400'>Max:</span>
                    <span className='font-bold ml-2'>{formatedPrice(priceRange[1])}</span>
                </div>
            </div>
            <Slider
                value={priceRange}
                onValueChange={handlePriceRange}
                min={minLimit}
                max={maxLimit}
                step={step}
                minStepsBetweenThumbs={1}
                className='w-full text-blue-600'
            />
            <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                    Selected Price Range: {formatedPrice(priceRange[0])} - {formatedPrice(priceRange[1])}
                </p>
            </div>
        </div>
    )
}

export default Pricerange