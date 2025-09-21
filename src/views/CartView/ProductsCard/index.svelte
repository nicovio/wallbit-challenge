<script lang="ts">
  import Card from '../../../lib/components/Card/index.svelte'
  import type { CartItem } from '../../../lib/types'
  import ProductsList from './ProductsList/index.svelte'

  let {
    cart,
    addQuantityToItem
  }: {
    cart: CartItem[]
    addQuantityToItem: (item: { productId: number; quantity: number }) => void
  } = $props()
</script>

<Card customStyle="flex: 1; display: flex; flex-direction: column; overflow-y: auto;">
  <div class="card-container">
    <div class="title-container">
      <h2 class="cardTitle">Carrito de compra</h2>
      <span>Iniciado 15/05/2022 - 16:00</span>
    </div>
    {#if cart.length == 0}
      <p class="empty-cart">Tu carrito está vacío</p>
    {:else}
      <ProductsList {cart} {addQuantityToItem} />
    {/if}
  </div>
</Card>

<style>
  .card-container {
    display: flex;
    flex-direction: column;
    gap: 2em;
    flex: 1;
  }

  .title-container {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: 0.5em;
    font-size: 12px;
  }

  .title-container span {
    color: var(--color-text-secondary);
  }

  .empty-cart {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    color: var(--color-text-secondary);
    font-size: 14px;
  }
</style>
