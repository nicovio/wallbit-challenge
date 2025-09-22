<script lang="ts">
  import Toaster from '$lib/components/Toast/Toaster/index.svelte'
  import favicon from '$lib/assets/mole.png'
  import '../style/reset.css'
  import '../style/global.css'

  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}

<Toaster />
