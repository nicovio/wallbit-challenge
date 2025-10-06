import { ServerError } from '$lib/errors/server'
import type { CartItem } from '$lib/types'
import { cartUtils } from '$lib/utils/cart'
import { fail, type ActionFailure, type RequestEvent } from '@sveltejs/kit'
import { productsService } from '../services/products'
import type { Actions } from './$types'

export const actions = {
  addItem: async ({
    request,
    fetch
  }: RequestEvent): Promise<ActionFailure<{ error: string }> | CartItem> => {
    const data = await request.formData()
    const productId = +(data.get('productId') as string)
    const quantity = +(data.get('quantity') as string)

    if (!cartUtils.isValidFormItem({ productId, quantity })) {
      return fail(400, { error: 'Product id and quantity are required' })
    }
    try {
      const product = await productsService.getProduct({ id: productId, fetch })
      return {
        product,
        quantity
      }
    } catch (error: unknown) {
      if (error instanceof ServerError) {
        return fail(error.status, { error: error.message })
      }
      return fail(500, { error: 'Internal server error' })
    }
  }
} satisfies Actions
