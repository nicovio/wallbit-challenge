<script lang="ts">
  import AddProductForm from './AddItemForm/index.svelte'
  import ProductsCard from './ProductsCard/index.svelte'
  import type { CartItem } from '../../lib/types'
  import { cartUtils, type Cart } from '$lib/utils/cart'

  let cart: Cart = $state(cartUtils.getFromLocalStorage() ?? { createdDate: undefined, items: [] })

  function addItem(newItem: CartItem) {
    cart.items = [...cart.items, newItem]
    if (cart.createdDate === undefined) {
      cart.createdDate = new Date().toISOString()
    }
    cartUtils.saveToLocalStorage(cart)
  }

  function addQuantityToItem({ productId, quantity }: { productId: number; quantity: number }) {
    const itemIndex = cart.items.findIndex((item) => item.product.id === productId)
    const currentItem = cart.items[itemIndex]

    const newQuantity = currentItem.quantity + quantity

    if (newQuantity <= 0) {
      cart.items = cart.items.filter((item) => item.product.id !== productId)
      cartUtils.saveToLocalStorage(cart)
      return
    }

    cart.items[itemIndex] = {
      product: currentItem.product,
      quantity: newQuantity
    }
    cartUtils.saveToLocalStorage(cart)
  }
</script>

<section class="content">
  <h1>Tienda - El Topo</h1>
  <AddProductForm currentCart={cart} {addItem} {addQuantityToItem} />
  <ProductsCard cart={cart} {addQuantityToItem} />
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
