
import React from 'react'
import { Category, Product } from '@/sanity.types';
import { categoryType } from '@/sanity/schemaTypes/categoryType';
import ProductGrid from './ProductGrid';
import { CategorySelectorComponent } from './ui/category-selector';

interface  ProductsViewProps{
    products:Product[];
    categories:Category[]
   
}
const ProductsView = ({products,categories}:ProductsViewProps) => {
  return (
   
      
<div>

<h1 className='dark:text-white  text-center text-6xl font-extrabold font-sans mt-8' id='ProcuctView'>Best Selling
  </h1>

<div className='w-full sm:w-[200px]  md:flex md:justify-center my-10'>
    <CategorySelectorComponent categories={categories} />
</div>
{/* products */}
       
<div className=''>
<ProductGrid products={products} />

<hr className="mx-auto w-[95%] mt-20" />
</div>

</div>
  )
}

export default ProductsView