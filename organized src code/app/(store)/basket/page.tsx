'use client';

import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useBasketStore from "../../../store/store";
import AddToBasketButton from "@/components/AddToBasketButton";
import { imageUrl } from "@/lib/imageUrl";
import Image from "next/image";
import Loader from "@/components/ui/Loader";
import { createCheckoutSession, Metadata } from "@/action/createCheckoutSession";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Money, ShoppingCart, Truck } from "@phosphor-icons/react/dist/ssr";

function BasketPage() {
  const groupedItems = useBasketStore((state) => state.getGroupedItems());
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShippingDetailsSubmitted, setIsShippingDetailsSubmitted] = useState(false); // New state

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check local storage for shipping details submission status
  useEffect(() => {
    const shippingDetailsSubmitted = localStorage.getItem("shippingDetailsSubmitted");
    if (shippingDetailsSubmitted === "true") {
      setIsShippingDetailsSubmitted(true);
    }
  }, []);

  if (!isClient) {
    return <Loader />;
  }

  if (groupedItems.length === 0) {
    return (
      <div className="container h-screen mx-auto p-4  flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold  text-gray-800 dark:text-slate-300">Your Basket is empty.</h1>
        <p className="text-gray-600 text-lg dark:text-slate-200 py-6">GET YOUR FAV ITEMS RIGHT NOW !</p>
        <Link href={'/'}>
          <Button variant="secondary" className="px-10 py-5" >SHOP</Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (!isSignedIn) return;
    setIsLoading(true);

    try {
      const metadata: Metadata = {
        orderNumber: crypto.randomUUID(),
        customerName: user?.fullName ?? "unknown",
        customerEmail: user?.emailAddresses[0].emailAddress ?? "unknown",
        clerkUserId: user!.id,
      };

      const CheckoutUrl = await createCheckoutSession(groupedItems, metadata);

      if (CheckoutUrl) {
        window.location.href = CheckoutUrl;
      }
    } catch (error) {
      console.error("Error creating checkout session ", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen container mx-auto p-4 max-w-6xl">
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
      <div className="flex items-center mb-3 gap-x-3">

      <h1 className="text-2xl md:text-3xl font-bold ">Your Basket  </h1>
      <span>  <ShoppingCart size={32}  className="dark:text-white" weight="thin" /></span>
      </div>

      <div className="text-red-400 font-light text-center  inline "><span className="font-bold pr-1 text-red-500">NOTE:</span>place more than 6 orders to see scroll </div>

      <div className="flex flex-col lg:flex-row gap-8">
  <div className="flex-grow max-h-[550px] overflow-y-auto">
    {/* Order items container */}
    {groupedItems?.map((item) => (
      <div
        key={item.product._id}
        className="mb-4 p-4 border rounded flex items-center justify-between"
      >
        <div
          className="flex items-center cursor-pointer flex-1 min-w"
          onClick={() =>
            router.push(`/product/${item.product.slug?.current}`)
          }
        >
          <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mr-4">
            {item.product.image && (
              <Image
                src={imageUrl(item.product.image).url()}
                alt={item.product.name ?? "Product image"}
                className="w-full h-full object-cover rounded"
                width={96}
                height={96}
              />
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg sm:text-xl font-semibold truncate">
              {item.product.name}
            </h2>
            <p className="text-sm sm:text-base">
              Price: PKR{" "}
              {((item.product.price ?? 0) * item.quantity).toFixed(2)}
            </p>
            <p className="text-sm sm:text-base">
              {item.product.sizes} ,{item.product.colors}
            </p>
          </div>
        </div>

        <div className="flex items-center ml-4 flex-shrink-0">
          <AddToBasketButton product={item.product}  />
        </div>
      </div>
    ))}
  </div>

  <div className="w-full lg:w-80 lg:sticky lg:top-4 h-fit  p-6 border rounded order-first lg:order-last absolute bottom-0 left-0 lg:left-auto">
    <h3 className="text-xl font-semibold">Order Summary</h3>
    <div className="mt-4 space-y-2">
      <p className="flex justify-between">
        <span>Items:</span>
        <span>
          {groupedItems.reduce((total, item) => total + item.quantity, 0)}
        </span>
      </p>
      <p className="flex justify-between text-2xl font-bold border-t pt-2">
        <span>Total:</span>
        <span>
          PKR {useBasketStore.getState().getTotalPrice().toFixed(2)}
        </span>
      </p>
    </div>

    {isSignedIn ? (
      <>

        {/* Add Shipping Details Button */}
        <button
          onClick={() => router.push("/shipping-details")}
          className="mt-2 w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          <div className="flex items-center justify-center gap-x-2">

          <span>
          Add Shipping Details
          </span>
          <span><Truck size={36} className="text-black" weight="duotone" /></span>
          </div>
        </button>
        <button
          onClick={handleCheckout}
          disabled={isLoading || !isShippingDetailsSubmitted}
          className="mt-4 w-full   px-4 py-2 rounded hover:bg-slate-500 disabled:bg-gray-400"
        >
          <div className="flex items-center justify-center gap-x-2 ">

          {isLoading ? "Processing..." : "Checkout" }
          <span><Money size={36} color="#23ab94" weight="thin" /></span>
          </div>
        </button>
      </>
    ) : (
      <SignInButton mode="modal">
        <button className="mt-4 w-full bg-blue-500  px-4 py-2 rounded hover:bg-blue-600">
          Sign in to Checkout
        </button>
      </SignInButton>
    )}
  </div>

  <div className="h-64 lg:h-0"></div>
</div>

    </div>
  );
}

export default BasketPage;