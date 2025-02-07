import Marquee from "react-fast-marquee";
import Image from "next/image";

function Brands() {
  const brandImages = [
    { src: "/images/Group.svg", alt: "Brand 1", width: 166.48, height: 33.16 },
    { src: "/images/gucci-logo-1 1.svg", alt: "Brand 3", width: 156, height: 36 },
    { src: "/images/prada-logo-1 1.svg", alt: "Brand 4", width: 194, height: 32 },
    { src: "/images/Group (1).svg", alt: "Brand 5", width: 206.79, height: 33.35 },
    
    // Extra Images for Smoother Loop
    { src: "/images/zara-logo-1 1.svg", alt: "Brand 2", width: 91, height: 38 },
    
    { src: "/images/prada-logo-1 1.svg", alt: "Brand 4", width: 194, height: 32 },

  ];

  return (
    <div className="bg-black dark:bg-slate-700 py-8 px-8">
      <Marquee gradient={false} speed={50}>
        {[...brandImages, ...brandImages].map((brand, index) => (
          <div key={index} className="mx-10"> {/* Increased mx-10 for more gap */}
            <Image src={brand.src} alt={brand.alt} width={brand.width} height={brand.height} />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

export default Brands;
