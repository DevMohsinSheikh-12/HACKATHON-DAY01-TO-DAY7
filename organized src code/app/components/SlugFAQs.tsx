// components/SlugFAQs.tsx
'use client'

import { getProductDescription } from '@/sanity/lib/products/getProductDescription'
import React, { useEffect, useState } from 'react'
import { PortableText } from 'next-sanity'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"


const SlugFAQs = ({ slug }: { slug: string }) => {
  const [description, setDescription] = useState<any>([])  // Initialize as an empty array

  useEffect(() => {
    // Fetch product description on component mount
    const fetchDescription = async () => {
      const fetchedDescription = await getProductDescription(slug)
      setDescription(fetchedDescription || [])  // Ensure it's an array
    }

    fetchDescription()
  }, [slug])

  return (
  


<Accordion type="single" collapsible className="w-full dark:text-slate-300">
<AccordionItem value="item-1">
  <AccordionTrigger>Description</AccordionTrigger>
  <AccordionContent>
  {Array.isArray(description) && description.length > 0 ? (
            // PortableText automatically handles rendering of block-level elements correctly
            <div> 
              <PortableText value={description} />
            </div>
          ) : (
            <div>Loading...</div> 
          )}
  </AccordionContent>
</AccordionItem>
<AccordionItem value="item-2" className=''>
  <AccordionTrigger>Delivery & Return?</AccordionTrigger>
  <AccordionContent>
  <p className="text-gray-800 leading-relaxed dark:text-slate-300">
          Free shipping for orders over 1500 PKR. Returns accepted within 30 days.
        </p>
  </AccordionContent>
</AccordionItem>
<AccordionItem value="item-3">
  <AccordionTrigger>Material</AccordionTrigger>
  <AccordionContent>
  <p className="text-gray-800 leading-relaxed dark:text-slate-300">
          High-quality cotton, breathable fabric.
        </p>
  </AccordionContent>
</AccordionItem>
</Accordion>
  )
}

export default SlugFAQs
