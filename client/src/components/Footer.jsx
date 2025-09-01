import { Facebook, Instagram, Pinterest, Twitter } from '@mui/icons-material'
import React from 'react'

const Footer = () => {
  return (
      <footer className='bg-slate-800 text-white py-12 mt-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
            <div>
              <h3 className='text-lg font-semibold mb-4'>StyleShop</h3>
              <p className='text-gray-300'>Providing quality fashion and lifestyle products since 2010.</p>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Shop</h3>
              <ul className='space-y-2 text-gray-300'>
                <li className='hover:text-white'>Men's Collection</li>
                <li className='hover:text-white'>Women's Collection</li>
                <li className='hover:text-white'>Accessories</li>
                <li className='hover:text-white'>New Arrivals</li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'>Company</h3>
              <ul className='space-y-2 text-gray-300'>
                <li className='hover:text-white'>About Us</li>
                <li className='hover:text-white'>Careers</li>
                <li className='hover:text-white'>Contact Us</li>
                <li className='hover:text-white'>Sustainability</li>
              </ul>
            </div>
            <div>
              <h3 className='text-lg font-semibold mb-4'> Stay Connected</h3>
              <div className='flex space-x-4 mb-4'>
                <a href="" className='text-gray-300 hover:text-white'><Facebook/></a>
                <a href="" className='text-gray-300 hover:text-white'><Twitter/></a>
                <a href="" className='text-gray-300 hover:text-white'><Instagram/></a>
                <a href="" className='text-gray-300 hover:text-white'><Pinterest/></a>
              </div>
              <p className='text-gray-300'>Subscribe to our newsletter</p>
              <div className='mt-2 flex'>
                <input type="email" placeholder='Your email' className='px-3 py-2 text-gray-800 rounded-l-md w-full' />
                <button className='bg-blue-500 px-4 py-2 rounded-r-md hover:bg-blue-600'>Subscribe</button>
              </div>
            </div>
          </div>
          <div className='border-t border-gray-700 mt-8 pt-8 text-center text-gray-400'>
            <p>© 2023 StyleShop. All rights reserved.</p>
          </div>
        </div>
      </footer> 
     )
}

export default Footer