// lib/getProductDescription.ts
import { createClient } from '@sanity/client'

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion:process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-02',
  useCdn: false, // Set to true for production to use cached data
})

export const getProductDescription = async (slug: string) => {
  const query = `
    *[
      _type == "product" && slug.current == $slug
    ] | order(name asc) [0]
  `
  
  const product = await sanityClient.fetch(query, { slug })

  return product?.description || 'No description available.'
}
