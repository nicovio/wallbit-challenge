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
  :global(body) {
    background-color: #f8f9fa;
    background-image: url('/background-pattern.svg');
    transition: background-image 0.3s ease-in-out;
  }

  main {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
  }
</style>
