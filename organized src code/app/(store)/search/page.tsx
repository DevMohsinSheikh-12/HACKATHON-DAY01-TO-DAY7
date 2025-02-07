import ProductGrid from '@/components/ProductGrid';
import { searchProductsByName } from '@/sanity/lib/products/searchProductsByName';
import React from 'react'

async function SearchPage({
    searchParams,
}:{
    searchParams:Promise<{
        query:string; 
        }>;
}) {
    const {query } = await searchParams;
    const products = await searchProductsByName(query);
  
  
    if (!products.length) {
        return (
          <div className="pt-28 flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
              <h1 className="text-3xl font-bold mb-6 text-center">
                No products found for: {query}
              </h1>
              <p className="text-gray-600 text-center">
                Try searching with different keywords
              </p>
            </div> 
          </div>
        );
      }
      
  
    return (
    <div className='pt-32 flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4'> 
    <h1>

    Search Results for {query}
    </h1>
    <ProductGrid products={products} />  
    </div>
  )
}

export default SearchPage