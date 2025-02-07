"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";

const OrderStatus = () => {
  const statuses = ["Processing", "Shipping", "Shipped", "Delivered"];
  const [currentStatus, setCurrentStatus] = useState(0);
  const { user } = useUser();

  useEffect(() => {
    if (!user) return;

    const storageKey = `orderStatus_${user.id}`;
    const storedData = localStorage.getItem(storageKey);
    let lastUpdated = storedData ? JSON.parse(storedData).timestamp : Date.now();
    let statusIndex = storedData ? JSON.parse(storedData).status : 0;

    const elapsedMinutes = Math.floor((Date.now() - lastUpdated) / 60000);
    const newStatus = Math.min(statusIndex + Math.floor(elapsedMinutes / 10), statuses.length - 1);
    setCurrentStatus(newStatus);

    const interval = setInterval(() => {
      setCurrentStatus((prev) => {
        if (prev < statuses.length - 1) {
          localStorage.setItem(
            storageKey,
            JSON.stringify({ status: prev + 1, timestamp: Date.now() })
          );
          return prev + 1;
        }
        return prev;
      });
    }, 600000); // Updates every 10 minutes

    return () => clearInterval(interval);
  }, [user]);

  return (
    <><div className="flex items-center justify-center mt-4">
          {statuses.map((status, index) => (
              <div key={index} className="flex items-center justify-center">
                  {index > 0 && (
                      <div
                          className={`h-1 w-3 md:w-12 lg:w-16 text-sm md:text-lg ${index <= currentStatus ? "bg-orange-500" : "bg-gray-300"}`}
                      ></div>
                  )}
                  <span
                      className={`px-[3px] py-[2px] sm:px-4 sm:py-2 rounded-full text-white text-sm md:text-base font-semibold shadow-md ${index <= currentStatus ? "bg-orange-500" : "bg-gray-300"}`}
                  >
                      {status}
                  </span>
              </div>
          ))}
      </div>
      <div className="text-red-400 font-light text-center py-3"><span className="font-bold pr-1 text-red-500">NOTE:</span>After placing order , Status will change after every 30hrs </div>
      </>
  );
};

export default OrderStatus;
