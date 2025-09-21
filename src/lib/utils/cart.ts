export type FormItem = {
  productId?: number
  quantity?: number
}

const currencyFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS',
  maximumFractionDigits: 0
})

const isValidFormItem = (item: FormItem): item is Required<FormItem> => {
  return item.productId != undefined && item.quantity != undefined
}

export const formatCurrency = (value: number) => currencyFormatter.format(value)

export const cartUtils = { isValidFormItem, formatCurrency }
