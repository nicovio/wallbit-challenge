export type Product = {
  id: number
  category: string
  description: string
  image: string
  price: number
  rating: { rate: number; count: number }
  title: string
}

export type CartItem = {
  product: Product
  quantity: number
}
