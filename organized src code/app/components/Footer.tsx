import { Cloud, Heart } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const Footer: React.FC = () => {
  return ( 
    <div className=" mt-16  ">
      
      {/* Overlapping Black Section */}
    <div className=" dark:bg-gray-800 bg-black relative mt-28 mb-8  rounded-2xl text-white py-6 px-4 flex flex-col md:flex-row justify-between items-center ml-2 mr-2 md:mx-20 md:py-14  md:px-10">
      <h2 className="text-3xl md:text-5xl font-extrabold ml-2 mb-4 md:mb-0">
        STAY UP TO DATE ABOUT OUR<br />LATEST OFFERS
      </h2>
      <div className="flex-cols px-2 mt-3">
      <div className="flex items-center md:w-auto">
        <input
          type="email"
          placeholder="Enter your email address"
          className="px-8 py-2 rounded-full dark:border-white w-full md:max-w-sm text-black mb-3"
          aria-label="Email Address"
        />
        </div>
        <button
          className="bg-white text-black font-bold px-8  py-2 rounded-full hover:bg-gray-200"
          aria-label="Subscribe to Newsletter"
        >
          Subscribe to Newsletter
        </button>
        </div>
        </div>
      
   
    <footer className="bg-[#F0F0F0] dark:bg-black  text-black py-10 ">
   
      <div className=" max-w-8xl  mx-auto grid grid-cols-1 md:flex md:items-center  gap-x-8 px-4">
  {/* Exclusive Section */}
  <div className="md:mr-4 mt-0 items-start pr-4">
    
    <h1 className="font-sans font-extrabold text-[40px]  drop-shadow-lg shadow-black mb-4 dark:text-white flex"><span >Cotton Cloud</span><span><Cloud size={54} className="dark:text-white" weight="fill" /></span> </h1>
    <p className="mb-4 text-gray-500 text-[14px] -mr-10">
      We have clothes that suit your style and which you're proud to wear. From women to men.
    </p>

    <div className="flex space-x-4 mt-6">
    <Link href="#" className="hover:text-gray-400">
        <Image src="/images/1.svg" alt="Facebook" width={24} height={24} />
      </Link>
      <Link href="#" className="hover:text-gray-400">
        <Image src="/images/2.svg" alt="Twitter" width={24} height={24} />
      </Link>
      <Link href="#" className="hover:text-gray-400">
        <Image src="/images/3.svg" alt="Instagram" width={24} height={24} />
      </Link>
      <Link href="#" className="hover:text-gray-400">
        <Image src="/images/4.svg" alt="LinkedIn" width={24} height={24} />
      </Link>
    </div>
  </div>
          

        
        {/* Support Section */}
        <div className="w-full">

                    <div className="flex items-center gap-x-3 lg:flex lg:flex-col lg:items-start lg:justify-start justify-center md:max-w-[200px]">



                        <p className="text-muted-foreground mt-4 text-sm text-start">
                        </p>
                        <span className="mt-4 text-black-200 dark:text-gray-600 text-sm flex items-center ">
                            Made in Pakistan with
                            <Heart className="w-3.5 h-3.5 ml-1 fill-primary text-primary" />
                        </span>
                    </div>

                    <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div className="">
                                <h3 className="text-base dark:text-white font-medium ">
                                    Courses
                                </h3>
                                <ul className="mt-4 text-sm text-muted-foreground">
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Business
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Development
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Technology
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Designs
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Designs
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0 flex flex-col">
                                <h3 className="dark:text-white text-base font-medium ">
                                    Social
                                </h3>
                                <ul className="mt-4 text-sm text-muted-foreground">
                                    <li className="">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">

                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Instagram
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Twitter
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            LinkedIn
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div className="">
                                <h3 className="text-base font-medium dark:text-white">
                                    Resources
                                </h3>
                                <ul className="mt-4 text-sm text-muted-foreground">
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Career
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Resume
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Learning
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Interview Preparations
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Jobs
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0 flex flex-col">
                                <h3 className="text-base font-medium dark:text-white">
                                    About Us
                                </h3>
                                <ul className="mt-4 text-sm text-muted-foreground">
                                    <li className="">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            FAQs
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Help/Support
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Contact
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Terms & Conditions
                                        </Link>
                                    </li>
                                    <li className="mt-2">
                                        <Link href="" className="hover:text-foreground transition-all duration-300">
                                            Partners
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

      </div>
      {/* Footer Bottom */}
<div className="flex justify-between items-center text-[#6c6464] mt-10 border-t border-gray-700 pt-5 md:pl-20">
  {/* Text on the left */}
  <p>Shop.co © 2000-2023. All Rights Reserved</p>

  {/* Icons on the right */}
  <div className="flex space-x-4 mr-5 md:mr-16">
  <Link href="#" className="hover:text-gray-400">
        <Image
          src="/images/Badge.svg"
          alt="Facebook"
          width={70}
          height={70} // height of 30.03px in Tailwind converted to 120px
        />
      </Link>
      <Link href="#" className="hover:text-gray-400">
        <Image
          src="/images/Badge (1).svg"
          alt="Facebook"
          width={70}
          height={70}
        />
      </Link>
      <Link href="#" className="hover:text-gray-400">
        <Image
          src="/images/Badge (2).svg"
          alt="Twitter"
          width={70}
          height={70}
        />
      </Link>
      <Link href="#" className="hover:text-gray-400">
        <Image
          src="/images/Badge (3).svg"
          alt="Instagram"
          width={70}
          height={70}
        />
      </Link>
      <Link href="#" className="hover:text-gray-400">
        <Image
          src="/images/Badge (4).svg"
          alt="LinkedIn"
          width={70}
          height={70}
        />
      </Link>
  </div>
</div>

    </footer>
    </div>
  );
};

export default Footer;
 