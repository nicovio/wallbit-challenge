<script lang="ts">
  import { cartUtils } from '$lib/utils/cart'
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

  const { totalProducts, totalPrice } = $derived(
    cart.reduce(
      (acc, item) => {
        return {
          totalProducts: acc.totalProducts + item.quantity,
          totalPrice: acc.totalPrice + item.product.price * item.quantity
        }
      },
      { totalProducts: 0, totalPrice: 0 }
    )
  )
</script>

<Card customStyle="flex: 1; display: flex; flex-direction: column; overflow-y: auto;">
  <div class="card-container">
    <header class="title-container">
      <h2 class="cardTitle">Carrito de compra</h2>
      <span>Iniciado 15/05/2022 - 16:00</span>
    </header>
    {#if cart.length == 0}
      <p class="empty-cart">Tu carrito está vacío</p>
    {:else}
      <ProductsList {cart} {addQuantityToItem} />
    {/if}
    <div class="separator"></div>
    <footer>
      <div></div>
      <div class="summary">
        <div class="quantity">{totalProducts} Productos</div>
        <p class="price">{cartUtils.formatCurrency(totalPrice)}</p>
      </div>
    </footer>
  </div>
</Card>

<style>
  .card-container {
    display: flex;
    flex-direction: column;
    gap: 2em;
    flex: 1;
    overflow-y: auto;
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

  .separator {
    border: 0.5px solid var(--color-border-default);
  }

  footer {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 3em;
    padding-right: 24px;
    min-height: fit-content;
  }

  .summary .quantity {
    border: 1px solid var(--color-border-default);
    border-radius: 4px;
  }

  @media (hover: none) {
    footer {
      padding-right: 10px;
    }
  }
</style>
