
import { COUPON_CODES } from "@/sanity/lib/sales/couponCodes";
import { getActiveSaleByCouponCode } from "@/sanity/lib/sales/getActiveSaleByCouponCode";
import Image from "next/image";
import Link from "next/link";

async function Herosection() {
   
  const sale = await getActiveSaleByCouponCode(COUPON_CODES.CLOUD30);
  
      if (!sale?.isActive){
          return null;
      }
  return (
    
    <>
      <section className="  font-sans bg-[#F3F0F1] flex flex-col md:flex-row items-center justify-center h-screen md:h-[106vh]">
        
        {/* Content */}
        <div className=" px-6 ">
          {/* Title */}
          <h1 className="text-4xl  text-center font-extrabold text-black sm:text-5xl md:text-left lg:text-7xl mb-4">
            FIND CLOTHES <br /> THAT MATCHES <br /> YOUR STYLE
          </h1>
          {/* Subtitle */}
          <p className="text-lg sm:text-xl mb-4 text-gray-500">
            Browse through our diverse range of meticulously crafted garments, designed <br /> 
            to bring out your individuality and cater to your sense of style.
           
          </p>

          {/* sale  */}
          <div>

<div>

          <h2 className="text-3xl dark:text-slate-800 sm:text-5xl font-extrabold mb-1">
                    {sale.title}
                </h2>
                <p className="text-xl dark:text-black sm:text-3xl font-semibold ">
                    {sale.description}  
                    {/* discription is optional in sanity - sale */}
                </p>
</div>

                <div className="text-xl sm:text-2xl font-semibold mb-4 dark:text-gray-900 font-serif">
                    Use code <span className="text-blue-600 font-bold">CLOUD30</span> for {sale.discountAmount}% off
                </div>
          </div>
           
         

          {/* Button */}
          <Link
            href={"#ProcuctView"}
            className="md:inline-block flex justify-center text-center   px-20 py-3 text-lg font-medium text-white bg-black rounded-full shadow-xl hover:bg-gray-100 hover:text-black transition duration-300"
          >
            Shop Now
          </Link>
        </div>

        {/* Hero Image */}
        <div className=" flex justify-center">
          <Image
            src="/images/2people.jpeg"
            alt="Hero Image"
            width={500}
            height={500}
            className="object-cover w-[96%] md:w-full max-w-xs md:max-w-md lg:max-w-lg rounded-lg"
          />
        </div>
      </section>
    </>
  );
}

export default Herosection;
