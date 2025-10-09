<script lang="ts">
  import Card from '$lib/components/Card/index.svelte'
  import { cartUtils } from '$lib/utils/cart'
  import { fly, slide } from 'svelte/transition'
  import Button from '../../../../lib/components/Button/index.svelte'
  import type { CartItem } from '../../../../lib/types'
  import { toastService } from '$lib/stores/toast'

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

{#snippet modifyQuantityButton({
  label,
  onClick,
  disabled = false
}: {
  label: '-' | '+'
  onClick: () => void
  disabled?: boolean
})}
  <Button
    class="quantity-button"
    variant="outlined"
    size="small"
    --border="none"
    {disabled}
    onclick={onClick}
  >
    {label}
  </Button>
{/snippet}

<div class="container">
  {#each items as { product, quantity } (product.id)}
    <div class="product" in:slide out:slide>
      <div class="product-data">
        <img src={product.image} alt={product.title} />
        <div class="product-info">
          <h3 class="title" title={product.title}>{product.title}</h3>
          <Button
            size="small"
            style="width: fit-content;"
            --border="none"
            --text-color="var(--feedback-error)"
            --text-color-hover="var(--feedback-error-light)"
            --bg-color="transparent"
            --bg-hover-color="transparent"
            --padding="0"
            onclick={() => {
              removeProduct({ product, quantity })
              toastService.success({
                title: 'Producto eliminado',
                description: `${product.title}`
              })
            }}
          >
            Eliminar
          </Button>
        </div>
      </div>
      <div class="summary">
        <Card padding="0">
          <div class="quantity">
            {@render modifyQuantityButton({
              label: '-',
              onClick: () => {
                removeUnity(product.id)
              },
              disabled: quantity <= 1
            })}
            <span>
              {quantity}
            </span>
            {@render modifyQuantityButton({
              label: '+',
              onClick: () => {
                addUnity(product.id)
              }
            })}
          </div>
        </Card>
        <p class="price">{cartUtils.formatCurrency(product.price * quantity)}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 2em;
    overflow-y: scroll;
    flex: 1;
    padding-right: 10px;
  }

  .product {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 3em;
  }

  .product-data {
    display: flex;
    gap: 1em;
    align-items: center;
  }

  .product-info {
    display: flex;
    flex-direction: column;
    gap: 0.2em;
  }

  .product .title {
    font-size: 14px;
    color: var(--ui-text-secondary);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    font-weight: 600;
  }

  .product img {
    object-fit: contain;
    width: 50px;
    aspect-ratio: 1/1;
  }

  .quantity span {
    width: 50px;
    text-align: center;
  }

  .quantity :global(.quantity-button) {
    transition: background-color 0.2s ease;
    color: var(--ui-text-secondary);
  }

  .quantity :global(.quantity-button:hover) {
    background-color: var(--ui-button-outlined-background-hover);
    color: var(--ui-text-primary);
  }
</style>
