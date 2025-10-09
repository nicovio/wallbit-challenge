<script lang="ts">
  import { cartUtils, type Cart } from '$lib/utils/cart'
  import { dateUtils } from '$lib/utils/date'
  import Card from '../../../lib/components/Card/index.svelte'
  import Button from '../../../lib/components/Button/index.svelte'
  import ProductsList from './ProductsList/index.svelte'

  let {
    cart,
    addQuantityToItem
  }: {
    cart: Cart
    addQuantityToItem: (item: { productId: number; quantity: number }) => void
  } = $props()

  const { totalProducts, totalPrice } = $derived(
    cart.items.reduce(
      (acc, item) => {
        return {
          totalProducts: acc.totalProducts + item.quantity,
          totalPrice: acc.totalPrice + item.product.price * item.quantity
        }
      },
      { totalProducts: 0, totalPrice: 0 }
    )
  )

  const emptyCart = () => {
    cart.items = []
    cartUtils.saveToLocalStorage(cart)
  }
</script>

<Card customStyle="flex: 1; display: flex; flex-direction: column; overflow-y: auto;">
  <div class="card-container">
    <header class="title-container">
      <h2 class="cardTitle">Carrito de compra</h2>
      {#if cart.createdDate}
        <span>Iniciado {dateUtils.formatDate(cart.createdDate)}</span>
      {/if}
    </header>
    {#if cart.items.length == 0}
      <p class="empty-cart">Tu carrito está vacío</p>
    {:else}
      <ProductsList items={cart.items} {addQuantityToItem} />
    {/if}
    <div class="separator"></div>
    <footer>
      <Button style="width:fit-content" size="small" variant="outlined" danger onclick={emptyCart}
        >Vaciar carrito</Button
      >
      <div class="summary">
        <div class="quantity">{totalProducts} {totalProducts == 1 ? 'producto' : 'productos'}</div>
        <p class="price">{cartUtils.formatCurrency(totalPrice)}</p>
      </div>
    </footer>
  </div>
</Card>

<style>
  @import './styles.css';
</style>
