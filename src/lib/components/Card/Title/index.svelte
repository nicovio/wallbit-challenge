<script lang="ts">
  import type { Component } from 'svelte'
  import type { SVGAttributes } from 'svelte/elements'

  let { title, Icon }: { title: string; Icon?: Component<SVGAttributes<SVGSVGElement>, object> } =
    $props()
</script>

<div class="title-container">
  {#if Icon}
    <Icon width="20px" height="20px" color="var(--accent-500)" />
  {/if}
  <h2 class="cardTitle">{title}</h2>
</div>

<style>
  .title-container {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .cardTitle {
    font-size: 16px;
    font-weight: 400;
    color: var(--ui-text-primary);
  }
</style>
