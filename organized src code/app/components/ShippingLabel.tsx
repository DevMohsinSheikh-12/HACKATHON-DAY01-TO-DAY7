import React from "react";
import { auth } from "@clerk/nextjs/server";
import { getShippingLabel } from "@/sanity/lib/orders/getShippingLabel";
import Image from "next/image";

// shippingDetails type (can be inferred from your Sanity schema or defined explicitly)
export interface ShippingDetail {
  fullName: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  // Add other fields as per your schema
}

async function ShippingLabel() {
  const { userId } = await auth();
  
  if (!userId) return <p>Please log in to track your order.</p>;

  const shippingLabel = await getShippingLabel(userId);

  if (!shippingLabel) {
    return <p>No shipping details found.</p>;
  }

  // Generate a mock order number
  const orderNumber = crypto.randomUUID();
  const trackingnumber =   crypto.randomUUID();
   // Get today's date
   const orderDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen dark:bg-transparent rounded-2xl shadow-lg p-8  flex flex-col items-center">
      {/* Heading */}
      <h2 className="text-2xl dark:text-slate-200 text-center font-extrabold text-gray-800 mb-6 uppercase tracking-wide">
        Shipping Label
      </h2>

     

      {/* Shipping Label Container */}
      <div className="relative inline-block p-10 border border-black dark:border-gray-500 w-full max-w-xl">
        
      <h1 className="absolute inset-0 flex items-center justify-center text-7xl font-bold text-gray-800 opacity-30 z-0 transform -rotate-45 mt-6 select-none dark:text-gray-400">
    Cotton Cloud
  </h1>

        {/* fakebarcode */}

<div className="image flex items-center justify-center ">
<Image src="/fakebarcode.jpg" alt="QR Code" height={350} width={450} />
</div>

         {/* Order Number */}
      <p className="text-lg font-semibold dark:text-slate-300 text-gray-700 mb-4 pt-5">
        Order Number: <span className="text-black text-sm dark:text-slate-200">{orderNumber}</span>
      </p>


        <div className="flex flex-col md:flex md:flex-row items-center justify-between">
          {/* QR Code */}
          <Image src="/qr.svg" alt="QR Code" height={150} width={150} className="mr-3"/>

          {/* Shipping Details */}
          <div className="w-full max-w-lg text-left">
            <div className="text-lg text-gray-700 space-y-3">
              <p className="dark:text-slate-300">
                <span className="font-semibold text-black dark:text-slate-200">Full Name:</span>{" "}
                {shippingLabel.fullName}
              </p>
              <p className="dark:text-slate-300">
                <span className="font-semibold text-black dark:text-slate-200">Email:</span>{" "}
                {shippingLabel.email}
              </p>
              <p className="dark:text-slate-300">
                <span className="font-semibold text-black dark:text-slate-200">Address:</span>{" "}
                {shippingLabel.address}, {shippingLabel.postalCode},{" "}
                <span className="font-bold text-black dark:text-slate-200">
                  {shippingLabel.city}, {shippingLabel.country}
                </span>
              </p>
              <p className="dark:text-slate-300">
                <span className="font-semibold text-black dark:text-slate-200">Payment Method:</span>{" "}
                Card
              </p>
            </div>
          </div>
        </div>
            {/* Order Number */}
      <p className="text-lg font-semibold text-gray-700 mb-4 dark:text-slate-300">
        Tracking Number: <span className="text-black text-sm dark:text-slate-200">{trackingnumber}</span>
      </p>

      <div className="flex items-center justify-center">
        <div className="text-lg font-semibold text-gray-700 mb-4 dark:text-slate-200"> 
                 <p className="text-md text-gray-600 dark:text-slate-200">
          Order Date: <span className="text-black dark:text-slate-300">{orderDate}</span>
        </p>
</div>
        <div className="text-lg font-semibold text-gray-700 mb-4 dark:text-slate-200">        <p className="text-md text-gray-600 dark:text-slate-200">
          Label Get Date: <span className="text-black dark:text-slate-200">{orderDate}</span>
        </p>
</div>
      
      </div>
      </div>
    </div>
  );
}

export default ShippingLabel;
