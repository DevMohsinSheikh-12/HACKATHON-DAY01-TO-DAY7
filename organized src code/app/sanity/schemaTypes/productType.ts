import { Rule } from "postcss";
import { defineField, defineType, prepareConfig, Preview } from "sanity";

export const productType =defineType ( {
    name: 'product',
    title: 'Products ',
    type: 'document',
    fields: [
         defineField({
              name: 'name',
              title: 'Product Name',
              type:'string',
              validation:(Rule) =>Rule.required(),
            }),
            defineField({
                name: 'slug',
                title: 'Slug',
                type:'slug',
                options:{
                    source:"name",
                    maxLength:96,
                },
                validation:(Rule) =>Rule.required(),
              }),
              defineField({
                name: 'image',
                title: 'Product Image',
                type:'image',
                options:{
                    hotspot:true,
                },
                
              }),
                 // Added fields based on JSON requirements
    defineField({
        name: 'isNew',
        title: 'Is New',
        type: 'boolean',
      }),
      defineField({
        name: 'colors',
        title: 'Colors',
        type: 'array',
        of: [{ type: 'string' }],
      }),
              defineField({
                name: 'description',
                title: 'Description',
                type:'blockContent',
              }),
              defineField({
                name: 'price',
                title: 'Price',
                type:'number',
                validation:(Rule) => Rule.required().min(0),
                
              }),
              defineField({
                name: 'categories',
                title: 'Categories',
                type:'array',
                of:[{type:"reference",to:{type:"category"}}],
                
              }),
              defineField({
                name: 'sizes',
                title: 'Sizes',
                type: 'array',
                of: [
                  {
                    type: 'string',
                    options: {
                      list: [
                        { title: 'Small', value: 'S' },
                        { title: 'Extra Extra Large', value: 'XXL' },
                        { title: 'Extra Large', value: 'XL' },
                        { title: 'Large', value: 'L' }
                      ],
                    },
                  },
                ],
              }),
              defineField({
                name: 'stock',
                title: 'Stock',
                type:'number',
                validation:(Rule) => Rule.min(0),                
              }),
    ],
     preview:{
        select:{
            title:"name",
            media:"image",
            price:"price",

        },
     prepare(select){
      return {
        title: select.title,
        subtitle: `${select.price} PKR`,
        media: select.media,
    };
     },
    },
}) 