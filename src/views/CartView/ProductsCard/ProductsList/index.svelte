<script lang="ts">
  import { fly, slide } from 'svelte/transition'
  import type { CartItem } from '../../../../lib/types'
  import Button from '../../../../components/Button/index.svelte'

  let { cart }: { cart: CartItem[] } = $props()
</script>

<div class="container">
  {#each cart as { product, quantity } (product.id)}
    <div class="product" in:fly={{ y: 20 }} out:slide>
      <div class="product-data">
        <img src={product.image} alt={product.title} />
        <div>
          <h3 class="title">{product.title}</h3>
        </div>
      </div>
      <div class="product-actions">
        <div class="quantity">
          <Button
            variant="primary"
            size="small"
            --text-color="black"
            --border="none"
            --bg-color="transparent"
            --bg-hover-color="transparent"
          >
            -
          </Button>
          {quantity}
          <Button variant="secondary" size="small" --border="none">+</Button>
        </div>
        <p class="price">${product.price * quantity}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 2em;
  }

  .product {
    display: flex;
    justify-content: space-between;
    gap: 1em;
  }

  .product-data {
    display: flex;
    gap: 1em;
    align-items: center;
  }

  .product .title {
    font-size: 14px;
    color: var(--color-text-secondary);
  }

  .product .price {
    font-size: 14px;
    color: var(--color-text-primary);
  }

  .product-actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
    align-items: center;
  }

  .quantity {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .product img {
    object-fit: contain;
    width: 40px;
    aspect-ratio: 1/1;
  }
</style>
