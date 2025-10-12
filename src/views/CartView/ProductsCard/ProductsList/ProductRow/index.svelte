<script lang="ts">
  import Card from '$lib/components/Card/index.svelte'
  import { toastService } from '$lib/stores/toast'
  import { cartUtils } from '$lib/utils/cart'
  import { slide } from 'svelte/transition'
  import Button from '$lib/components/Button/index.svelte'
  import type { CartItem } from '$lib/types'
  import ModifyQuantityButton from './ModifyQuantityButton/index.svelte'
  import ProductImage from './ProductImage/index.svelte'

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

  const handleRemove = () => {
    removeProduct({ product, quantity })
    toastService.success({
      title: 'Producto eliminado',
      description: `${product.title}`
    })
  }
</script>

<div class="product" in:slide out:slide>
  <div class="product-data">
    <ProductImage {product} />
    <div class="product-info">
      <h3 class="title" title={product.title}>{product.title}</h3>
      <Button size="small" class="remove-btn" onclick={handleRemove}>Eliminar</Button>
    </div>
  </div>
  <div class="summary">
    <Card padding="0">
      <div class="quantity">
        <ModifyQuantityButton
          label="-"
          onClick={() => removeUnity(product.id)}
          disabled={quantity <= 1}
        />
        <span>
          {item.quantity}
        </span>
        <ModifyQuantityButton label="+" onClick={() => addUnity(product.id)} />
      </div>
    </Card>
    <p class="price">{cartUtils.formatCurrency(product.price * quantity)}</p>
  </div>
</div>

<style>
  @import './styles.css';
</style>
