<script lang="ts">
  import { toastService, type Toast } from '$lib/stores/toast'
  import Icon from '@iconify/svelte'
  import { slide } from 'svelte/transition'

  let { toast }: { toast: Toast } = $props()

  const icons: { [key in Toast['type']]: string } = {
    success: 'mdi:check-circle-outline',
    error: 'mdi:alert-circle-outline',
    warning: 'mdi:alert-outline',
    info: 'mdi:information-outline'
  }
  const iconName = icons[toast.type] || icons.info
</script>

<div transition:slide={{ duration: 300 }} class="toast-item {toast.type}" role="alert">
  <div class="accent-bar"></div>

  <div class="icon-container">
    <Icon icon={iconName} />
  </div>

  <div class="toast-content">
    <div class="title">{toast.title}</div>
    {#if toast.description}
      {#if typeof toast.description === 'string'}
        <p class="description">{toast.description}</p>
      {:else}
        {@render toast.description()}
      {/if}
    {/if}
  </div>

  <button onclick={() => toastService.remove(toast.id)} aria-label="Cerrar">
    <Icon icon="mdi:close" />
  </button>
</div>

<style>
  @import './styles.css';
</style>
