import { ServerError } from '$lib/errors/server'
import type { Product } from '../../lib/types'

const BASE_URL = 'https://fakestoreapi.com/products'

const getProduct = async ({
  id
}: {
  id: number
  fetch: (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
}): Promise<Product> => {
  const response = await fetch(`${BASE_URL}/${id}`)
  try {
    if (!response.ok) {
      throw new ServerError({ status: response.status, message: response.statusText })
    }
    const product = await response.json()
    return product
  } catch {
    throw new ServerError({ status: 404, message: `Product ${id} not found` })
  }
}

export const productsService = { getProduct }
