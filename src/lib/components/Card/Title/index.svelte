<script lang="ts">
  import Icon from '@iconify/svelte'
  let { title, icon }: { title: string; icon?: string } = $props()
</script>

<div class="title-container">
  {#if icon}
    <Icon {icon} width="25px" height="20px" color="var(--accent-500)" />
  {/if}
  <h2 class="cardTitle">{title}</h2>
</div>

<style>
  .title-container {
    display: flex;
    align-items: center;
    gap: 0.5em;
  }

  .cardTitle {
    font-size: 16px;
    font-weight: 400;
    color: var(--ui-text-primary);
  }
</style>
