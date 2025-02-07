import { imageUrl } from '@/lib/imageUrl'
import { Product } from '@/sanity.types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function ProductThumb({ product }: { product: Product }) {
  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
  
    <div className={`group  flex flex-col  bg-white dark:bg-transparent dark:border-gray-500 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${isOutOfStock ? "opacity-50" : ""}`}
    >
      <div className="relative aspect-square w-full md:max-w-fit h-[500px]  overflow-hidden px-6"> {/* Fixed height for the image container */}
        {product.image && (
          <div className="overflow-hidden"> {/* Keep the wrapper for fixed height */}
            <Link href={`/product/${product.slug?.current}`}>
            <Image
              className="object-cover mx-auto rounded-lg transition-transform duration-300 group-hover:scale-105 p-5" // Added rounded-lg and padding directly here
              src={imageUrl(product.image).url()}
              alt={product.name || "Product image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw "
              />
              </Link>
              <div
        aria-hidden="true"
        className="absolute inset-x-0 -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      > 
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30  sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:from-[#1e293b] dark:to-[#4f46e5] dark:opacity-40"
        />
      </div>
            <div className="absolute bottom-7 left-14  w-[70%] text-center bg-black text-white py-2 transform translate-y-full opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 rounded-2xl  ">
              <Link href={`/product/${product.slug?.current}`} >
              <button
              
              className='hover:scale-110 duration-200 px-7'>
            <div
        aria-hidden="true"
       
        className="absolute inset-x-0 -bottom-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        > 
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20  sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] dark:from-[#1e293b] dark:to-[#4f46e5] dark:opacity-40"
        />
      </div>
     

      <p>More Details</p>
      </button> 
      </Link>
    </div>
          </div>
        )}

        {isOutOfStock && (
          <div
            className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 text-white text-lg font-bold uppercase z-10"
          >
            <span>Out of Stock</span>
          </div>
        )}
      </div>
      <Link href={`/product/${product.slug?.current}`}>
      

      <div className="p-4 text-xl bg-white dark:bg-slate-800  rounded-lg shadow-md">
        <h2 className="font-semibold text-gray-800 dark:text-gray-300 text-xl line-clamp-2">
          {product.name}
        </h2>

        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-1 overflow-hidden">
  {Array.isArray(product.description)
    ? product.description
        .map((block) =>
          block._type === "block"
            ? block.children?.map((child) => child.text).join("")
            : ""
        )
        .join("") || "No description available"
    : "No description available"}
</p>

        <p className="mt-4 text-lg font-bold dark:text-gray-300 text-gray-900">
          {product.price} PKR
        </p>
      </div>
      </Link>
  
      </div>
  );
}

export default ProductThumb;
