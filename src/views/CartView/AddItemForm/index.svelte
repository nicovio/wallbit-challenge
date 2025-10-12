<script lang="ts">
  import { enhance } from '$app/forms'
  import CardTitle from '$lib/components/Card/Title/index.svelte'
  import { toastService } from '$lib/stores/toast'
  import type { CartItem } from '$lib/types'
  import type { Cart, FormItem } from '$lib/utils/cart'
  import { cartUtils } from '$lib/utils/cart'
  import type { SubmitFunction } from '@sveltejs/kit'
  import Button from '../../../lib/components/Button/index.svelte'
  import Card from '../../../lib/components/Card/index.svelte'
  import Input from '../../../lib/components/Input/index.svelte'
  import type { ActionsExport, ActionsFailure, ActionsSuccess } from '../../../routes/$types'

  const { isValidFormItem } = cartUtils

  type Props = {
    currentCart: Cart
    addItem: (item: CartItem) => void
    addQuantityToItem: (item: { productId: number; quantity: number }) => void
  }

  const defaultItem: FormItem = { quantity: undefined, productId: undefined }

  let itemToAdd: FormItem = $state(defaultItem)

  let { currentCart, addItem, addQuantityToItem }: Props = $props()

  const invalidForm = $derived(!isValidFormItem(itemToAdd))

  const getSuccessTitle = (item: FormItem) => {
    if (!item.quantity) {
      return 'Producto agregado exitosamente'
    }

    const { verb, unity } =
      item.quantity > 1
        ? { verb: 'agregaron', unity: 'unidades' }
        : { verb: 'agregó', unity: 'unidad' }
    return `Se ${verb} ${item.quantity} ${unity}`
  }

  const enhanceForm: SubmitFunction<
    ActionsSuccess<ActionsExport>,
    ActionsFailure<ActionsExport>
  > = ({ cancel, formElement }) => {
    formElement.reset()
    if (!isValidFormItem(itemToAdd)) {
      cancel()
      return
    }
    const currentItem = currentCart.items.find(
      (cartItem) => cartItem.product.id === itemToAdd.productId
    )

    if (currentItem) {
      addQuantityToItem(itemToAdd)
      cancel()
      toastService.success({
        title: getSuccessTitle(itemToAdd),
        description: `${currentItem.product.title}`
      })
      return
    }

    return async ({ result, update }) => {
      await update()
      if (result.type === 'success' && result.data) {
        addItem(result.data)
        toastService.success({
          title: getSuccessTitle(result.data),
          description: `${result.data.product.title}`
        })
      }
      if (result.type === 'failure') {
        // eslint-disable-next-line no-console
        console.log('failure', result.data)
        toastService.error({ title: 'Error al agregar producto', description: result.data?.error })
      }
    }
  }
</script>

<Card>
  <form method="post" action="?/addItem" use:enhance={enhanceForm}>
    <section class="formContent">
      <CardTitle title="Agregar productos" icon="mdi:package-variant-plus" />
      <div class="inputs">
        <Input
          id="productId"
          name="productId"
          type="number"
          label="ID del producto"
          min="1"
          bind:value={itemToAdd.productId}
        />
        <Input
          id="quantity"
          name="quantity"
          type="number"
          label="Cantidad"
          min="1"
          max="1000"
          bind:value={itemToAdd.quantity}
        />
      </div>
    </section>
    <Button type="submit" size="small" variant="primary" disabled={invalidForm}>Agregar</Button>
  </form>
</Card>

<style>
  @import './styles.css';
</style>
