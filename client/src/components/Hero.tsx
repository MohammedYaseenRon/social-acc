import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <div className='w-full h-[600px] flex flex-col md:flex-row items-center justify-between px-20 bg-white'>
      <div className='text-black text-center lg:text-start mt-2'>
        <h1 className='text-5xl md:text-6xl font-bold'>Welcome to Social's</h1>
        <p className='text-xl md:text-xl font-medium mt-4 max-w-2xl'>
          We offer a seamless platform for buying and selling digital assets. Whether you're looking for premium digital products or seeking to sell, NetDeelers provides secure transactions, excellent customer service, and a vast selection of listings to meet your needs.
        </p>
        <div className='flex flex-col md:flex-row gap-4 mt-6'>
          <button className='px-8 py-3 border bg-green-500 text-white rounded-lg shadow-md'>Contact Us</button>
          <button className='text-center px-8 py-3 border bg-white text-black inline-flex justify-center items-center gap-2 rounded-lg shadow-md'>
            About Us <ArrowRight />
          </button>
        </div>
      </div>
      <div className='hidden p-2 py-4 w-[400px] md:block'>
        <Image
          src='/hero1.png'
          alt='Hero'
          width={1200}
          height={1200}
          objectFit='cover'
          
        />
      </div>
    </div>
  );
};

export default Hero;
