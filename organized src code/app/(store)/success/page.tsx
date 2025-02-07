'use client';
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useBasketStore from "../../../store/store";

function SuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get("orderNumber");
  const clearBasket = useBasketStore((state) => state.clearBasket);
  const router = useRouter();

  useEffect(() => {
    if (orderNumber) {
      clearBasket();
    }
  }, [orderNumber, clearBasket]);

 

 
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Thank You for Ordering from CottonCloud!
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Your order has been received and is being processed. We hope you enjoy your purchase!
      </p>
      <div className="flex gap-4">
        <Button variant="default" onClick={() => router.push("/orders")}>
          View Order Details
        </Button>
        <Button variant="secondary" onClick={() => router.push("/")}>
          Continue Shopping
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.push(`/track-order?orderNumber=${orderNumber}`)}
        >
          Track Order
        </Button>
        
      </div>
    </div>
  );
}

export default SuccessPage;
