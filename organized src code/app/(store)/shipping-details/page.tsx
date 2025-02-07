"use client";

import ShippingDetailsForm from "@/components/ShippingDetailsForm";


export default function ShippingDetailsPage() {
  return (
    <div className="container mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">Enter Shipping Details</h1>
      <ShippingDetailsForm />
    </div>
  );
}
