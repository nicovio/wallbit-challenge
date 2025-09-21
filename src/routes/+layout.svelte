<script lang="ts">
  import favicon from '$lib/assets/mole.png'
  import '../style/reset.css'
  import '../style/global.css'

  let { children } = $props()
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
