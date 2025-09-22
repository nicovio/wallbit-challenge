import type { CartItem } from '$lib/types'

export type FormItem = {
  productId?: number
  quantity?: number
}

export type Cart = {
  createdDate?: string
  items: CartItem[]
}

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
})

const isValidFormItem = (item: FormItem): item is Required<FormItem> => {
  return item.productId != undefined && item.quantity != undefined
}

const getFromLocalStorage = (): Cart | undefined => {
  if (typeof window === 'undefined') return undefined
  const cartString = localStorage.getItem('cart')
  const cart: { createdDate: string; items: CartItem[] } | undefined =
    cartString != null ? JSON.parse(cartString) : undefined
  return cart
}

const saveToLocalStorage = (cart: Cart) => {
  if (typeof window === 'undefined') return undefined
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const formatCurrency = (value: number) => currencyFormatter.format(value)

export const cartUtils = {
  isValidFormItem,
  formatCurrency,
  getFromLocalStorage,
  saveToLocalStorage
}
