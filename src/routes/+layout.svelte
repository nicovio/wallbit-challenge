<script lang="ts">
  import favicon from '$lib/assets/mole.png'
  import Header from '$lib/components/Header/index.svelte'
  import Toaster from '$lib/components/Toast/Toaster/index.svelte'
  import '@fontsource-variable/outfit'
  import '@fontsource-variable/plus-jakarta-sans'
  import '../style/global.css'
  import '../style/reset.css'
  import type { LayoutProps } from './$types'

  let { children, data }: LayoutProps = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

<Header initialColorScheme={data.colorScheme} />

{@render children?.()}

<Toaster />
