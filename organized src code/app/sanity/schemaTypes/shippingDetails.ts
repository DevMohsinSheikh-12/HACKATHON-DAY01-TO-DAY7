import { defineType, defineField } from "sanity";

export const shippingDetails = defineType({
  name: "shippingDetails",
  type: "document",
  title: "Shipping Details",
  fields: [
    defineField({
      name: "userId",
      type: "string",
      title: "User ID",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "fullName",
      type: "string",
      title: "Full Name",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "address",
      type: "string",
      title: "Address",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      type: "string",
      title: "City",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "postalCode",
      type: "string",
      title: "Postal Code",
      validation: (Rule) => Rule.required().min(4).max(10),
    }),
    defineField({
      name: "country",
      type: "string",
      title: "Country",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
