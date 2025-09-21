<script lang="ts">
  import { enhance } from '$app/forms'
  import type { CartItem } from '$lib/types'
  import type { FormItem } from '$lib/utils/cart'
  import { cartUtils } from '$lib/utils/cart'
  import type { SubmitFunction } from '@sveltejs/kit'
  import Button from '../../../components/Button/index.svelte'
  import Card from '../../../components/Card/index.svelte'
  import Input from '../../../components/Input/index.svelte'
  import type { ActionsExport, ActionsFailure, ActionsSuccess } from '../../../routes/$types'

  const { isValidFormItem } = cartUtils

  type Props = {
    addProduct: (item: CartItem) => void
  }

  const defaultItem: FormItem = { quantity: undefined, productId: undefined }

  let item: FormItem = $state(defaultItem)

  let { addProduct }: Props = $props()

  const invalidForm = $derived(!isValidFormItem(item))

  const enhanceForm: SubmitFunction<
    ActionsSuccess<ActionsExport>,
    ActionsFailure<ActionsExport>
  > = () => {
    return async ({ result, update }) => {
      await update()
      if (result.type === 'success' && result.data) {
        addProduct(result.data)
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
          bind:value={item.productId}
        />
        <Input
          id="cantidad"
          name="quantity"
          type="number"
          label="Cantidad"
          min="1"
          bind:value={item.quantity}
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
