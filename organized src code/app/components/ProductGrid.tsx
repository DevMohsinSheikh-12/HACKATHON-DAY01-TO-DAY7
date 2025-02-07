"use client"
import { Product } from '@/sanity.types'
import React from 'react'
import { AnimatePresence, motion } from "framer-motion"
import ProductThumb from './ProductThumb'

function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className='flex-grow md:mx-7 grid grid-cols-1 mx-auto justify-center md:grid-cols-2 lg:grid-cols-4 gap-y-3 md:gap-x-3'>
      {products?.map((product) => {
        return (
          <AnimatePresence key={product._id}>
            
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.9 }} // Initial state for animation
              animate={{ opacity: 1, scale: 1 }} // Animation on mount
              exit={{ opacity: 0, scale: 0.9 }} // Animation on exit
              transition={{ duration: 0.3 }} // Duration of the animation
              className='flex items-center justify-center'
            >
              <ProductThumb product={product} />
            </motion.div>
          </AnimatePresence>
        );
      })}
    </div>
  );
}

export default ProductGrid;
