import AddToBasketButton from "@/components/AddToBasketButton";
import ProductsView from "@/components/ProductsView";
import SlugFAQs from "@/components/SlugFAQs";
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationLink, PaginationEllipsis, PaginationNext } from "@/components/ui/pagination";
import { imageUrl } from "@/lib/imageUrl";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import { getProductBySlug } from "@/sanity/lib/products/getProductBySlug";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


export const dynamic = "force-static";
export const revalidate = 60;


async function ProductPage({
  params,
}: {
  
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
    const products = await getAllProducts(); 
    const categories   = await getAllCategories();


  console.log(
    crypto.randomUUID().slice(0,5 ) + 
    `>>> Rendered product cache for ${slug}`
  );
  

  if (!product) {
    return notFound();
  }

  const isOutOfStock = product.stock != null && product.stock <= 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-12">

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
     
      

        <div
          className={`relative aspect-square dark:bg-transparent dark:shadow-xl dark:shadow-white/30 overflow-hidden rounded-lg shadow-lg ${
            isOutOfStock ? "opacity-50" : ""
          }`}
        >

          
          {product.image && (
            <Image
              src={imageUrl(product.image).url()}
              alt={product.name ?? "Product image"}
              fill
              className="object-contain rounded-lg transition-transform duration-300 hover:scale-105 p-9 dark:p-2 md:flex md:justify-center"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of Stock</span>
            </div>
          )}
          
        </div>

        <div className=" bg-transparent bg-blend-saturation rounded-lg pt-10"> {/* Added p-14 and aligned to left */}
          <div className="text-left"> {/* Align text to left */}
            <h1 className="text-5xl font-bold text-gray-800 mb-4 dark:text-white">{product.name}</h1>
            <div className="text-3xl md:mt-4  text-slate-600 dark:text-slate-300 font-semibold mb-4">
              {product.price} <span className="font-thin font-sans">PKR</span> 
            </div>
            
           

            {/* Additional Fields */}
            {product.isNew && (
              <div className="inline px-3 dark:text-slate-300 py-1 text-sm text-slate-700 border border-black font-semibold font-serif mt-2 dark:border-slate-500">Newly Arrived</div>
            )}

            {product.colors && (
              <div className="mt-4">
                <span className="font-semibold">Available Colors:</span>
                <ul className="flex gap-2 mt-1">
                  {product.colors.map((color) => (
                    <li
                      key={color}
                      className={`w-6 h-6 rounded-full border border-gray-300`}
                      style={{ backgroundColor: color.toLowerCase() }}
                    ></li>
                  ))}
                </ul>
              </div>
            )}

            {product.sizes && (
              <div className="mt-4">
                <span className="font-semibold">Available Sizes:</span>
                <div className="flex gap-2 mt-1">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

          
          </div>
          

          <div className=" text-gray-800 leading-relaxed"> {/* Changed text color for dark property */}
            <SlugFAQs slug={slug} />
            </div>
          <div className="addtobasket mt-6 flex flex-col items-start justify-start">
            
            <AddToBasketButton product={product} disabled={isOutOfStock} />
          </div>
            <div>
            <Link href="/basket">
            <Button className="rounded-md w-full px-8 py-5 mt-4 bg-gray-800 text-white hover:bg-gray-700 transition duration-200" >  {/* Made button rounded and dark */}
              Add to Basket
            </Button>
            </Link>
          </div>

        </div>
      </div>
      

<div className="mt-16">
  <div className="text-4xl font-sans font-semibold text-center "><h1>More Products</h1></div>

      <ProductsView products={products} categories={categories} />
      <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationEllipsis />
    </PaginationItem>
    <PaginationItem>
      <PaginationNext href="#" />
    </PaginationItem>
  </PaginationContent>
</Pagination>

</div>
    </div>
  );
}

export default ProductPage;
