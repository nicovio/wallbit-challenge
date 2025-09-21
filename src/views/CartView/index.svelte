<script lang="ts">
  import AddProductForm from './AddProductForm/index.svelte'
  import ProductsCard from './ProductsCard/index.svelte'
  import type { CartItem } from '../../lib/types'

  let cart: CartItem[] = $state([])

  async function addProduct(item: CartItem) {
    cart = [...cart, item]
  }
</script>

<section class="content">
  <h1>Tienda - El Topo</h1>
  <AddProductForm {addProduct} />
  <ProductsCard {cart} />
</section>

<style>
  .content {
    min-width: 800px;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    gap: 2em;
    min-height: 100%;
    padding-block: 2em;
  }

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: var(--color-text-primary);
  }
</style>
