'use client';

import useBasketStore from '@/store/store';
import { Product } from '@/sanity.types';
import { useEffect, useState } from 'react';

interface AddToBasketProps{
  product:Product;
  disabled?:boolean
}

function AddToBasketButton({product,disabled}:AddToBasketProps) {
  const {addItem,removeItem,getItemCount} = useBasketStore();
const itemCount = getItemCount(product._id)

  const [isClient,setIsClient] = useState(false);

  useEffect(()=> {
    setIsClient(true);

  },[]);

  if (!isClient){
    return null
  }




  return (
    <div
    className='flex items-center justify-center space-x-2'>
      <button
      onClick={() => removeItem(product._id)}
      className={`w-8 h-8 flex items-center rounded-lg justify-center bg-black dark:bg-gray-500 ${
      itemCount === 0 
      ? "bg-gray-100 cursor-not-allowed"
      : "bg-gray-200 hover:bg-gray-300  rounded-lg"
    
    }`}
    disabled={itemCount == 0 || disabled}
    >
<span className={`text-xl ${itemCount === 0 ? "text-gray-400 " :"text-gray-700  font-bold text-xl"}`}> - </span>
      </button>

      <span className="w-8 text-center font-semibold">{itemCount}</span>

<button
 onClick={() => addItem(product)}
 className={`w-8 h-8 flex items-center rounded-lg justify-center bg-black dark:bg-gray-300 ${
 disabled 
 ? "bg-gray-400 cursor-not-allowed "
 : "bg-black text-white hover:bg-gray-600 rounded-lg"

}`}
disabled={disabled}>
 
 <span className='text-xl font-bold rounded-lg text-white dark:text-black'> + </span>
</button>

      </div>
  )
}

export default AddToBasketButton