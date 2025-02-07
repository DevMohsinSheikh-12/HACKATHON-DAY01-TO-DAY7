import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'

import { productType } from './productType'
import { orderType } from './orderType'
import { salesType } from './salesType'
import { shippingDetails } from './shippingDetails'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, categoryType, productType, orderType, salesType,shippingDetails],
}
