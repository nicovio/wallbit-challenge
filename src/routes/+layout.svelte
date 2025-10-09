<script lang="ts">
  import favicon from '$lib/assets/mole.png'
  import Header from '$lib/components/Header/index.svelte'
  import Toaster from '$lib/components/Toast/Toaster/index.svelte'
  import '@fontsource-variable/outfit'
  import '@fontsource-variable/plus-jakarta-sans'
  import '../style/global.css'
  import type { LayoutProps } from './$types'

  let { children, data }: LayoutProps = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<div class="container">
  <Header initialColorScheme={data.colorScheme} />
  <main>
    {@render children?.()}
  </main>
  <Toaster />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
  }

  main {
    display: flex;
    justify-content: center;
    overflow-y: scroll;
  }
</style>
