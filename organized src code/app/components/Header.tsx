'use client'

import { ClerkLoaded, SignedIn, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React, { useState } from "react";
import { Button } from "./ui/button";
import useBasketStore from "@/store/store";
import { ModeToggle } from "./ModeToggle";
import {Cloud, MagnifyingGlass ,ShoppingCart, Truck } from "@phosphor-icons/react/dist/ssr";

function Header() {
  const { user } = useUser();

  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const createClerkPasskey = async () => {
    try {
      const response = await user?.createPasskey();
      console.log(response);
    } catch (err) {
      console.error("Error", JSON.stringify(err, null, 2));
    }
  };

  // State to handle sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <nav className=" bg-[#F3F0F1] dark:bg-black shadow-md">
      <div className=" mx-auto md:mx-14   flex items-center justify-between  px-4 py-3">
        {/* Logo (Mobile only) */}
        <div className="lg:hidden flex items-center">
          <Link href="/" className="text-xl font-bold font-mono text-black">
          <div className=" mt-0 items-start pr-4">
    <h1 className="font-sans font-extrabold text-[24px] drop-shadow-lg shadow-black dark:text-white  flex"><span className="mt-5">Cotton Cloud</span><span ><Cloud size={39}  className="dark:text-white" weight="fill" /></span> </h1>
    
    </div>
          </Link>
        </div>

        {/* Desktop Layout (Logo and Search Bar) */}
        <div className="hidden bg-[#F3F0F1] dark:bg-black  lg:flex items-center w-full justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-xl font-bold font-mono text-black flex-shrink-0">
          <div className=" mt-0 items-start md:mr-12">
    <h1 className="font-sans font-extrabold text-[40px] drop-shadow-lg shadow-black  flex"><span className="mt-5 dark:text-white">Cotton Cloud</span><span ><Cloud className="dark:text-white" size={54}  weight="fill" /></span> </h1>
    
    </div>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 mx-4">
            <form action="/search" className="flex w-full">
              <input
                type="text"
                name="query"
                className="flex-grow bg-gray-200 px-3 py-2 rounded-l-md focus:outline-none"
                placeholder="Search items"
              />
              <button type="submit" className="bg-black text-white px-4 py-2 rounded-r-md">
              <MagnifyingGlass size={28}  weight="thin" />
              </button>
            </form>
          </div>
        </div>

        {/* User Actions (Always visible on larger screens) */}
        <div className="hidden lg:flex items-center gap-x-6">
          <Link href="/basket" className="relative">
            <span
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              {itemCount}
            </span>
            <span>
            <ShoppingCart size={32}  className="dark:text-white" weight="thin" />
            </span>
          </Link>

          <ClerkLoaded>
            <SignedIn>
              <Link href="/orders" className="hidden md:block">
                <button>
                <Truck size={32}  className="dark:text-white"  weight="thin" />
                </button>

              </Link>
            </SignedIn>

            {user ? (
              <div className="flex items-center   space-x-3">
              {/* User Profile Picture */}
                <UserButton />
                {/* Welcome Message */}
                <div className="text-xs">
                  <p>Welcome</p>
                  <p className="font-serif text-left">{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal"  />
            )}

            {user?.passkeys.length === 0 && (
              <Button onClick={createClerkPasskey} className="hidden  lg:block justify-end">
                Create Passkey
              </Button>
            )}
          </ClerkLoaded>
        <ModeToggle />
        </div>

        {/* Mode Toggle */}

        {/* Mobile Menu Button (Hamburger Icon) */}
        <div className="lg:hidden ml-4">
          <button
            className="text-gray-700 focus:outline-none  dark:text-white"
            onClick={() => setIsSidebarOpen(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen  && (
        <div className="fixed  inset-0 bg-gray-800 bg-opacity-50 z-50">
          <div className="fixed right-0 top-0 w-64 bg-white dark:bg-slate-800  h-full shadow-lg">
            <div className="flex justify-between items-center p-4 ">
              <h2 className="text-xl font-bold">Menu</h2>
              <button
                className="text-gray-700"
                onClick={() => setIsSidebarOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-4 p-4">
              {/* Logo */}
              <Link href="/" className="text-xl font-bold font-mono text-black">
              <div className="mr-4 mt-0 items-start pr-4">
    <h1 className="font-sans font-extrabold text-[20px] drop-shadow-lg shadow-black  flex"><span className="mt-3 dark:text-white">Cotton Cloud</span><span ><Cloud size={39}  className="dark:text-white"  weight="fill" /></span> </h1>
    
    </div>
              </Link>

              {/* Search Bar */}
              <form action="/search" className="flex mr-4 rounded-md ">
                <button type="submit" className="bg-black text-white px-4  py-1 rounded-l-md">
                <MagnifyingGlass  className="dark:text-white" size={18}  weight="thin" />
                </button> 
                <input
                  type="text"
                  name="query"
                  className="flex-grow bg-gray-200 px-3 py-1 rounded-l-md  focus:outline-none"
                  placeholder="Search items"
                />
               
              </form>

              {/* Basket Link */}
              <Link href="/basket" className="text-gray-700 dark:text-slate-300 flex gap-x-2">
               <span>
            <ShoppingCart size={22}  className="dark:text-white"  weight="thin" />
            </span >
              Basket
             
              </Link>

              {/* Orders Link */}
              <ClerkLoaded>
                <SignedIn>
                  <Link href="/orders" className="text-gray-700 dark:text-slate-300 flex gap-x-2">
                  <span>
                  <Truck size={22}  className="dark:text-white"  weight="thin" />
                  </span>
                  Orders</Link>
                </SignedIn>

                {user ? (
              <div className="flex items-center space-x-3">
                {/* User Profile Picture */}
                <UserButton />
                {/* Welcome Message */}
                <div className="text-xs">
                  <p>Welcome</p>
                  <p>{user.fullName}</p>
                </div>
              </div>
            ) : (
              <SignInButton mode="modal" />
            )}
              </ClerkLoaded>

              {/* Passkey Button */}
              {user?.passkeys.length === 0 && (
                <Button onClick={createClerkPasskey}>Create Passkey</Button>
              )}

              {/* Mode Toggle */}
              <ModeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Header;
