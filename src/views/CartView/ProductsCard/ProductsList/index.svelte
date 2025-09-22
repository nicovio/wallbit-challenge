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
  label: '+' | '-'
  onClick: () => void
  disabled?: boolean
})}
  <Button
    variant="secondary"
    size="small"
    style="width: 25px;"
    --border="none"
    --bg-color="transparent"
    --text-color="black"
    {disabled}
    onclick={onClick}
  >
    {label}
  </Button>
{/snippet}

<div class="container">
  {#each items as { product, quantity } (product.id)}
    <div class="product" in:fly={{ y: 20 }} out:slide>
      <div class="product-data">
        <img src={product.image} alt={product.title} />
        <div class="product-info">
          <h3 class="title">{product.title}</h3>
          <Button
            size="small"
            style="width: fit-content;"
            --border="none"
            --text-color="var(--error-color)"
            --text-color-hover="var(--error-color-light)"
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
        <Card padding={'0'}>
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
    color: var(--color-text-secondary);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    overflow: hidden;
    font-weight: 600;
  }

  .summary .quantity span {
    width: 50px;
    text-align: center;
  }

  .product img {
    object-fit: contain;
    width: 40px;
    aspect-ratio: 1/1;
  }
</style>
