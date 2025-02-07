
import Alert from '@/components/Alert';
import Brands from '@/components/Brands';
import CatogGrid from '@/components/CatogGrid';
import Herosection from '@/components/Herosection';
import ProductsView from '@/components/ProductsView';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import XScrollWrapper from '@/components/XScrollWrapper';
import { getAllCategories } from '@/sanity/lib/products/getAllCategories';
import { getAllProducts } from '@/sanity/lib/products/getAllProducts'


export const dynamic = "force-static";
export const revalidate = 60;


 async function page() {
  const products = await getAllProducts(); 
  const categories   = await getAllCategories();

 
  return (
<div className='mx-auto'>


    <Herosection />
    <Alert />
      <Brands />
<CatogGrid />
<XScrollWrapper />



<div>
  <ProductsView products={products} categories={categories} />
  <Pagination className='mt-4'>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious href="#" />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">1</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">2</PaginationLink>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">3</PaginationLink>
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

    
    
  )
}

export default page