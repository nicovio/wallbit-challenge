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
  .toast-item {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;
    border-radius: 8px;
    overflow: hidden;

    background-color: var(--ui-surface);
    color: var(--ui-text-primary);
    border: 1px solid var(--ui-border);

    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 0.5rem;
    width: 350px;
  }

  .accent-bar {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
  }

  .icon-container {
    font-size: 1.5rem;
    line-height: 1;
    flex-shrink: 0;
  }

  .toast-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    flex-grow: 1;
    min-width: 0;
  }

  .title {
    font-weight: 600;
    color: var(--ui-text-primary);
  }

  .description {
    font-size: 0.9em;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--ui-text-secondary);
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    opacity: 0.7;
    margin-left: auto;
    align-self: flex-start;
    color: var(--ui-text-secondary);
    font-size: 1.25rem;
    line-height: 1;
    min-width: 16px;
    width: 16px;
    height: 16px;
    min-width: 16px;
  }

  button:hover {
    opacity: 1;
    color: var(--ui-text-primary);
  }

  .toast-item.success .accent-bar {
    background-color: var(--feedback-success);
  }
  .toast-item.success .icon-container {
    color: var(--feedback-success);
  }

  .toast-item.error .accent-bar {
    background-color: var(--feedback-error);
  }
  .toast-item.error .icon-container {
    color: var(--feedback-error);
  }

  .toast-item.warning .accent-bar {
    background-color: var(--feedback-warning);
  }
  .toast-item.warning .icon-container {
    color: var(--feedback-warning);
  }

  @media (prefers-color-scheme: dark) {
    .toast-item.error .accent-bar,
    .toast-item.error .icon-container {
      color: var(--feedback-error-light);
    }
    .toast-item.success .accent-ba,
    .toast-item.success .icon-container {
      color: #4ade80;
    }
  }

  :root[data-color-scheme='dark'] {
    .toast-item.error .accent-bar,
    .toast-item.error .icon-container {
      color: var(--feedback-error-light);
    }
    .toast-item.success .accent-ba,
    .toast-item.success .icon-container {
      color: #4ade80;
    }
  }
</style>
