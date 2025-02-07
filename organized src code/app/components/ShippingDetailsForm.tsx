"use client";

import { useState, useEffect } from "react";
import { useAuth, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Truck } from "@phosphor-icons/react/dist/ssr";

const SANITY_PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const SANITY_DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET;
const SANITY_API_TOKEN = process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN_TWO;

interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const ShippingDetailsForm = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [shippingDetails, setShippingDetails] = useState<ShippingDetails>({
    fullName: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });

  // Redirect to sign-in if user is not signed in
  useEffect(() => {
    if (!isSignedIn) {
      router.push("/sign-in");
    } else {
      fetchShippingDetails();
    }
  }, [isSignedIn]);

  // Fetch existing shipping details from Sanity
  const fetchShippingDetails = async () => {
    try {
      const response = await fetch(
        `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-01-01/data/query/${SANITY_DATASET}?query=${encodeURIComponent(
          `*[_type == "shippingDetails" && userId == "${user?.id}"]`
        )}`
      );
      const { result } = await response.json();

      console.log("Shipping details fetched:", result);

      if (result.length > 0) {
        setShippingDetails(result[0]);
      }
    } catch (error) {
      console.error("Error fetching shipping details:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSignedIn) return;

    setIsLoading(true);
    try {
      const payload = {
        _type: "shippingDetails",
        _id: `shipping_${user?.id}`,
        userId: user?.id,
        fullName: shippingDetails.fullName,
        email: shippingDetails.email,
        address: shippingDetails.address,
        city: shippingDetails.city,
        postalCode: shippingDetails.postalCode,
        country: shippingDetails.country,
      };

      console.log("Payload being sent to Sanity:", payload);

      const response = await fetch(
        `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-01-01/data/mutate/${SANITY_DATASET}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${SANITY_API_TOKEN}`,
          },
          body: JSON.stringify({
            mutations: [
              {
                createOrReplace: {
                  _id: `shipping_${user?.id}`,
                  _type: "shippingDetails",
                  userId: user?.id,
                  fullName: shippingDetails.fullName,
                  email: shippingDetails.email,
                  address: shippingDetails.address,
                  city: shippingDetails.city,
                  postalCode: shippingDetails.postalCode,
                  country: shippingDetails.country,
                },
              },
            ],
          }),
        }
      );

      const result = await response.json();
      console.log("Sanity API Response:", result);

      if (!response.ok) {
        throw new Error(result.error?.message || "Failed to save shipping details.");
      }

      // Set shipping details submitted flag in localStorage
      localStorage.setItem("shippingDetailsSubmitted", "true");

      alert("Shipping details saved successfully!");
      router.push("/basket"); // Redirect back to the basket page
    } catch (error) {
      console.error("Sanity API Error:", error);
      alert("Error saving shipping details. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white border border-slate-300 dark:border-slate-500 dark:bg-transparent shadow-md rounded-lg">
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
      <div className="flex items-center gap-x-3 mb-4">
      <h2 className="text-2xl font-bold ">Enter Shipping Details</h2>
      <span> <Truck size={32}  className="dark:text-white"  weight="thin" /></span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4 ">
        <Input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={shippingDetails.fullName}
          onChange={handleChange}
          required
           className="dark:border-slate-500"
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={shippingDetails.email}
          disabled
            className="dark:border-slate-500"
        />
        <Input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingDetails.address}
          onChange={handleChange}
          required
            className="dark:border-slate-500"
        />
        <Input
          type="text"
          name="city"
          placeholder="City"
          value={shippingDetails.city}
          onChange={handleChange}
          required
            className="dark:border-slate-500"
        />
        <Input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          value={shippingDetails.postalCode}
          onChange={handleChange}
          required
            className="dark:border-slate-500"
        />
        <Input
          type="text"
          name="country"
          placeholder="Country"
          value={shippingDetails.country}
          onChange={handleChange}
          required
            className="dark:border-slate-500"
        />
        <Button type="submit" disabled={isLoading} className="w-full bg-blue-500">
          {isLoading ? "Saving..." : "Save / Edit Shipping Details"}
        </Button>
      </form>
    </div>
  );
};

export default ShippingDetailsForm;