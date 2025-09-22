<script lang="ts">
  import { toastService, type Toast } from '$lib/stores/toast'
  import { fly } from 'svelte/transition'

  let { toast }: { toast: Toast } = $props()
</script>

<div transition:fly={{ y: -30, duration: 300 }} class="toast-item {toast.type}" role="alert">
  <div class="toast-content">
    <div class="title">
      {toast.title}
    </div>
    {#if toast.description}
      {#if typeof toast.description === 'string'}
        <p class="description">{toast.description}</p>
      {:else}
        {@render toast.description()}
      {/if}
    {/if}
  </div>
  <button onclick={() => toastService.remove(toast.id)} aria-label="Cerrar">&times;</button>
</div>

<style>
  .toast-item {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    color: white;
    box-shadow:
      0 4px 6px -1px rgb(0 0 0 / 0.1),
      0 2px 4px -2px rgb(0 0 0 / 0.1);
    margin-bottom: 0.5rem;
    width: 350px;
  }

  .toast-content {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .title {
    flex-grow: 1;
    font-size: 0.9em;
    font-weight: 600;
    color: white;
  }

  .description {
    font-size: 0.8em;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    color: var(--gray-lightest);
  }

  button {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
    padding: 0;
    opacity: 0.7;
    position: absolute;
    right: 12px;
    top: 12px;
  }

  button:hover {
    opacity: 1;
  }

  .toast-item.success {
    background-color: #218b3a;
  }
  .toast-item.error {
    background-color: #dc3545;
  }
  .toast-item.warning {
    background-color: #ffc107;
    color: #212529;
  }
  .toast-item.info {
    background-color: #17a2b8;
  }
</style>
