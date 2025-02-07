'use client'
import { CheckFat } from "@phosphor-icons/react/dist/ssr";
import React, { useState } from "react";
// Import CheckFat icon

const Alert: React.FC = () => {
  const [showAlert, setShowAlert] = useState(true); // Control visibility

  if (!showAlert) return null; // Don't render if hidden

  return (
    <div className="fixed right-6 bottom-20 bg-black dark:bg-slate-200 dark:text-slate-700 text-white px-6 py-3 rounded-lg shadow-md z-50">
      <ul className="list-disc pl-5">
        <li className="pb-2 text-xl flex items-center">
          <CheckFat size={24} weight="fill" className="mr-2" />
          <strong>Authentication by Clerk</strong>
        </li>
        <li className="pb-2 text-xl flex items-center">
          <CheckFat size={24} weight="fill" className="mr-2" />
          <strong>Functional Search Bar</strong>
        </li>
        <li className="pb-2 text-xl flex items-center">
          <CheckFat size={24} weight="fill" className="mr-2" />
          <strong>Add to Cart Functionality</strong>
        </li>
        <li className="pb-2 text-xl flex items-center">
          <CheckFat size={24} weight="fill" className="mr-2" />
          <strong>Payment by Stripe</strong>
        </li>
        <li className="pb-2 text-xl flex items-center">
          <CheckFat size={24} weight="fill" className="mr-2" />
          <strong>Functional Coupon Code by Stripe</strong>
        </li>
        <li className="pb-2 text-xl flex items-center">
          <CheckFat size={24} weight="fill" className="mr-2" />
          <strong>Remove Items from Basket After Pay</strong>
        </li>
        <li className="pb-2 text-xl flex items-center">
          <CheckFat size={24} weight="fill" className="mr-2" />
          <strong>Orders to Ship Page</strong>
        </li>
        <li className="pb-2 text-xl flex items-center">
          <CheckFat size={24} weight="fill" className="mr-2" />
          <strong>Track Order with Label</strong>
        </li>
      </ul>
      <button
        onClick={() => setShowAlert(false)} // Dismiss on button click
        className="mt-2 text-sm bg-white text-black dark:bg-slate-700 dark:text-slate-300 px-3 py-1 rounded hover:bg-gray-200 transition"
      >
        OK
      </button>
    </div>
  );
};

export default Alert;
