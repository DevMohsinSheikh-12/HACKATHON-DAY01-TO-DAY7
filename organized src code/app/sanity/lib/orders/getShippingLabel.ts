import { client } from "@/sanity/lib/client";

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

export async function getShippingLabel(userId: string) {
  if (!userId) return null;

  try {
    const shippingDetails = await client.fetch(SHIPPING_DETAILS_QUERY, { userId });
    return shippingDetails.length > 0 ? shippingDetails[0] : null;
  } catch (error) {
    console.error("Error fetching shipping label:", error);
    return null;
  }
}
