
import React from 'react'
import {auth} from "@clerk/nextjs/server"
import { redirect } from 'next/navigation';
import { getMyOrders } from '@/sanity/lib/orders/getMyOrders';
import { formatCurrency } from '@/lib/formatCurrency';
import Image from 'next/image';
import { imageUrl } from '@/lib/imageUrl';
import { getShippingDetails } from '@/sanity/lib/orders/getShippingDetails';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Truck } from '@phosphor-icons/react/dist/ssr';


interface ShippingDetail {
  _id: string;
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface ShippingDetailsProps {
  shippingDetails: ShippingDetail[];
}


async function Orders() {

  const {userId} = await auth()

if (!userId){
  return redirect("/");
}



const orders = await getMyOrders(userId);
const shippingDetails = await getShippingDetails(userId);
const deliveryDate = new Date();
deliveryDate.setDate(deliveryDate.getDate() + 4);



const deliveryStartDate = new Date();
deliveryStartDate.setDate(deliveryStartDate.getDate() + 4); // Start date (4 days from now)

const deliveryEndDate = new Date();
deliveryEndDate.setDate(deliveryEndDate.getDate() + 7); // End date (7 days from now)

// Formatting options
const options: Intl.DateTimeFormatOptions = { 
  weekday: 'short',  // Mon, Tue, etc.
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
};


// Format both dates
const formattedStartDate = deliveryStartDate.toLocaleDateString('en-US', options);
const formattedEndDate = deliveryEndDate.toLocaleDateString('en-US', options);





  return (
    
    <div
    className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-transparent p-4"
  >
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
    <div className="bg-white dark:bg-transparent p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
      <div className='flex items-center justify-between mb-8'>
<div className='flex items-center gap-x-3'>

      <h1 className="text-4xl font-bold text-gray-900 dark:text-slate-200 tracking-tight ">
        My Orders
      </h1><span> <Truck size={39}  className="dark:text-white"  weight="thin" /></span>
</div>
      <div>
        <Link href={"/track-order"} >
        <Button>
          Track & See Shipment <span><Truck size={32}  weight="thin" /></span>
        </Button>
        </Link>
      </div>
      </div>
  
      {orders.length === 0 ? (
        <div className="text-center text-gray-600">
          <p>You have not placed any orders yet.</p>
        </div>
      ) : (
        <div className=''>
     {orders.map((order)=>(
      <div key={order.orderNumber}
      className='bg-white dark:bg-transparent border my-5  border-gray-300 rounded-lg shadow-sm overflow-hidden'>
   <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
          <p className="text-sm text-gray-600 dark:text-slate-200 mb-1 font-bold">Order Number</p>
          <p className="font-mono text-sm text-green-600 break-all">
            {order.orderNumber}
          </p>
        </div>
        <div className="sm:text-right">
          <p className="text-sm text-gray-600 dark:text-slate-300 mb-1">Order Date</p>
          <p className="font-medium">
            {order.orderDate
              ? new Date(order.orderDate).toLocaleDateString()
              : "N/A"}
          </p>
        </div>
<div>

<div className="flex items-center">
  <span className="text-sm mr-2">Status:</span>
  <span
    className={`px-3 py-1 rounded-full text-sm ${
      order.status === "paid"
        ? "bg-green-100 text-green-800"
        : "bg-gray-100 text-gray-800"
    }`}
  >
    {order.status}
    
  </span>


</div>
<p className="mt-4 text-sm text-gray-600 dark:text-slate-200 px-8">
    <span className='font-bold text-black dark:text-white mr-2'>NOTE:</span>
  Your order will arrive from <span className='font-bold text-clip'>{formattedStartDate} to {formattedEndDate}</span> 
</p>
<div className="mt-4 p-3 sm:p-4 bg-gray-50 dark:bg-transparent border mb-2 dark:border-slate-400 rounded-lg">
  {shippingDetails?.map((shippingDetail) => (
    <div key={shippingDetail._id}>
      <p className="text-sm text-gray-600 dark:text-slate-300"><span className='font-semibold dark:text-slate-200'>Full Name:</span>  {shippingDetail.fullName}</p>
      <p className="text-sm text-gray-600 dark:text-slate-300"><span className='font-semibold dark:text-slate-200'>Email:</span>  {shippingDetail.email}</p>
      <p className="text-sm text-gray-600 dark:text-slate-300"><span className='font-semibold dark:text-slate-200'>Address:</span>  {shippingDetail.address}</p>
      <p className="text-sm text-gray-600 dark:text-slate-300"><span className='font-semibold dark:text-slate-200'>City:</span>  {shippingDetail.city}</p>
      <p className="text-sm text-gray-600 dark:text-slate-300"><span className='font-semibold dark:text-slate-200'>Postal Code:</span> {shippingDetail.postalCode}</p>
      <p className="text-sm text-gray-600 dark:text-slate-300"><span className='font-semibold dark:text-slate-200'>Country:</span> {shippingDetail.country}</p>
    </div>
  ))}
</div>

<div className="sm:text-right">
  <p className="text-sm text-gray-600 mb-1 dark:text-slate-200">Total Amount</p>
  <p className="font-bold text-lg">
    {formatCurrency(order.totalPrice ?? 0, order.currency)}
  </p>
</div>

</div>
{order.amountDiscount ? (
<div className="mt-4 p-3 sm:p-4 bg-red-50 border border-red-300 rounded-lg">
  <p className="text-red-600 font-medium mb-1 text-sm sm:text-base">
    Discount Applied: {""}
    {formatCurrency(order.amountDiscount, order.currency)}
  
  </p>
  <p className="text-sm text-gray-600">
    Original Subtotal: {""}
    {formatCurrency(
      order.totalPrice ?? 0 + order.amountDiscount,
      order.currency
    )}
  </p>
</div>

):null}

      </div>

<div className="orderitems px-4 py-3 sm:px-6">

<p className='text-sm font-semibold text-gray-600 dark:text-slate-200'>
  Order Items
</p>

<div className="space-y-3 sm:space-y-4">
{order.products?.map((product)=>(
  <div
  key={product.product?._id}
  className='flex flex-col sm:flex-row sm:items-center sm:justify-between
  gap-3 py-2 border-b last:border-b-0'
  >
    <div className="flex items-center gap-3 sm:gap-4">
{product.product?.image && (
  <div className='relative h-14 w-14 sm:w-16 flex-shrink-0
  rounded-md overflow-hidden'>

<Image 
src={imageUrl(product.product.image).url()}
alt={product.product.name ?? ""}
className="object-cover"
fill
/>

  </div>
)}
<div>
  <p className='font-medium text-sm sm:text-base dark:text-slate-200'>
    {product.product?.name}
  </p>
  <p className='text-sm text-gray-600 dark:text-slate-300'>
    Quantity:{product.quantity ?? "N/A"}
  </p>
  <p className='text-sm text-gray-600 dark:text-slate-300'>
    Size:{product.product?.sizes} ,
    Color:{product.product?.colors}
  </p>
</div>
    </div>


<p className=' text-right font-bold'>

{product.product?.price && product.quantity
? formatCurrency(
  product.product.price * product.quantity,
  order.currency
) :  "N/A"
}
</p>
  </div>
))}
</div>
</div>

      </div>
      
     ))}
        </div>
     
      
      )}
    </div>

    
  </div>
  

    )
  
}

export default Orders 