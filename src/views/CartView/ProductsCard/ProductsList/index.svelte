<script lang="ts">
  import type { CartItem } from '../../../../lib/types'
  import ProductRow from './ProductRow/index.svelte'

  let {
    items,
    addQuantityToItem
  }: {
    items: CartItem[]
    addQuantityToItem: (item: { productId: number; quantity: number }) => void
  } = $props()

  const addUnity = (productId: number) => {
    addQuantityToItem({ productId, quantity: 1 })
  }

  const removeUnity = (productId: number) => {
    addQuantityToItem({ productId, quantity: -1 })
  }

  const removeProduct = (item: CartItem) => {
    addQuantityToItem({ productId: item.product.id, quantity: item.quantity * -1 })
  }
</script>

<div class="container">
  {#each items as item (item.product.id)}
    <ProductRow {item} {addUnity} {removeUnity} {removeProduct} />
  {/each}
</div>

<style>
  @import './styles.css';
</style>
