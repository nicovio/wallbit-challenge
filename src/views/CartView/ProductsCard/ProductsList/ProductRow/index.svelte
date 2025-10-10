<script lang="ts">
  import Card from '$lib/components/Card/index.svelte'
  import { toastService } from '$lib/stores/toast'
  import { cartUtils } from '$lib/utils/cart'
  import { slide } from 'svelte/transition'
  import Button from '../../../../../lib/components/Button/index.svelte'
  import type { CartItem } from '../../../../../lib/types'

  let {
    item,
    addUnity,
    removeUnity,
    removeProduct
  }: {
    item: CartItem
    addUnity: (productId: number) => void
    removeUnity: (productId: number) => void
    removeProduct: (item: CartItem) => void
  } = $props()
  let { product, quantity } = $derived(item)
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
          {item.quantity}
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

<style>
  @import './styles.css';
</style>
