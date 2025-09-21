<script lang="ts">
  import AddProductForm from './AddItemForm/index.svelte'
  import ProductsCard from './ProductsCard/index.svelte'
  import type { CartItem } from '../../lib/types'

  let cart: CartItem[] = $state([])

  function addItem(newItem: CartItem) {
    cart = [...cart, newItem]
  }

  function addQuantityToItem({ productId, quantity }: { productId: number; quantity: number }) {
    const itemIndex = cart.findIndex((item) => item.product.id === productId)
    const currentItem = cart[itemIndex]

    const newQuantity = currentItem.quantity + quantity

    if (newQuantity <= 0) {
      cart = cart.filter((item) => item.product.id !== productId)
      return
    }

    cart[itemIndex] = {
      product: currentItem.product,
      quantity: newQuantity
    }
  }
</script>

<section class="content">
  <h1>Tienda - El Topo</h1>
  <AddProductForm currentCart={cart} {addItem} {addQuantityToItem} />
  <ProductsCard {cart} {addQuantityToItem} />
</section>

<style>
  .content {
    min-width: 700px;
    width: 70%;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    gap: 2em;
    padding-block: 2em;
  }

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: var(--color-text-primary);
  }
</style>
