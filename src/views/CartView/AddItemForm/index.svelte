<script lang="ts">
  import { enhance } from '$app/forms'
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

  const enhanceForm: SubmitFunction<
    ActionsSuccess<ActionsExport>,
    ActionsFailure<ActionsExport>
  > = ({ cancel, formElement }) => {
    formElement.reset()
    if (!isValidFormItem(itemToAdd)) {
      cancel()
      return
    }
    const currentItem = currentCart.items.some(
      (cartItem) => cartItem.product.id === itemToAdd.productId
    )
    if (currentItem) {
      addQuantityToItem(itemToAdd)
      cancel()
      return
    }

    return async ({ result, update }) => {
      await update()
      if (result.type === 'success' && result.data) {
        addItem(result.data)
      }
      if (result.type === 'failure') {
        console.log('failure', result.data)
      }
    }
  }
</script>

<Card>
  <form method="post" action="?/addItem" use:enhance={enhanceForm}>
    <section class="formContent">
      <h2 class="cardTitle">Agregar productos</h2>
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
          id="cantidad"
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
  form {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    gap: 1em;
  }

  .formContent {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .formContent {
    width: 100%;
  }

  .inputs {
    display: flex;
    gap: 1em;
  }
</style>
