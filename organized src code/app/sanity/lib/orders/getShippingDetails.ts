import { sanityFetch } from "../live";

// Define the interface for shipping details
interface ShippingDetail {
  _id: string;
  fullName: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}
// shippingDetails type (can be inferred from your Sanity schema or defined explicitly)
export interface ShippingDetails {
  fullName: string;
  email: string;
  address: string;
  postalCode: string;
  city: string;
  country: string;
  // Add other fields as per your schema
}


// Function to fetch shipping details for a user
export async function getShippingDetails(userId: string): Promise<ShippingDetail[]> {
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Define the query to get the shipping details
  const SHIPPING_DETAILS_QUERY = `
    *[_type == "shippingDetails" && userId == $userId] {
      _id,
      fullName,
      email,
      address,
      city,
      postalCode,
      country
    }
  `;

  try {
    // Use sanityFetch to send the query
    const result = await sanityFetch({
      query: SHIPPING_DETAILS_QUERY,
      params: { userId },
    });

    // Return the shipping details array or an empty array if none are found
    return result?.data || [];
  } catch (error) {
    console.error("Error fetching shipping details", error);
    throw new Error("Error fetching shipping details");
  }
}
