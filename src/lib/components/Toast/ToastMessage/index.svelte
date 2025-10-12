<script lang="ts">
  import { toastService, type Toast } from '$lib/stores/toast'
  import type { Component } from 'svelte'
  import type { SVGAttributes } from 'svelte/elements'
  import { slide } from 'svelte/transition'
  import ErrorIcon from '~icons/mdi/alert-circle-outline'
  import WarningIcon from '~icons/mdi/alert-outline'
  import SuccessIcon from '~icons/mdi/check-circle-outline'
  import CloseIcon from '~icons/mdi/close'
  import InfoIcon from '~icons/mdi/information-outline'

  let { toast }: { toast: Toast } = $props()

  const icons: { [key in Toast['type']]: Component<SVGAttributes<SVGSVGElement>, object> } = {
    success: SuccessIcon,
    error: ErrorIcon,
    warning: WarningIcon,
    info: InfoIcon
  }
  const Icon = icons[toast.type] || icons.info
</script>

<div transition:slide={{ duration: 300 }} class="toast-item {toast.type}" role="alert">
  <div class="accent-bar"></div>

  <div class="icon-container">
    <Icon width="24px" height="24px" />
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
    <CloseIcon width="100%" height="100%" />
  </button>
</div>

<style>
  @import './styles.css';
</style>
