<script lang="ts">
  import CartView from '../views/CartView/index.svelte'
  import type { PageProps } from './$types'
  const { data }: PageProps = $props()
  console.log(data)
</script>

<main>
  <CartView />
</main>

<style>
  main {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
