<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'

  type Props = HTMLButtonAttributes & {
    variant?: 'primary' | 'secondary' | 'outlined'
    size?: 'small' | 'medium' | 'large'
    loading?: boolean
  }

  let {
    variant = 'primary',
    size = 'medium',
    loading = false,
    disabled = false,
    children,
    ...rest
  }: Props = $props()

  let finalDisabled = $derived(disabled || loading)
</script>

<button
  class="button {variant} {size} {rest.class || ''}"
  class:loading
  disabled={finalDisabled}
  {...rest}
>
  {#if loading}
    <div class="spinner" aria-hidden="true"></div>
    <span class="content-loading">{@render children?.()}</span>
  {:else}
    {@render children?.()}
  {/if}
</button>

<style>
  .button {
    --border-radius-default: 6px;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    font-family: inherit;
    font-weight: 600;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    transition:
      background-color 0.2s ease,
      color 0.2s ease,
      border-color 0.2s ease,
      opacity 0.2s ease;

    background-color: var(--bg-color, var(--bg-color-default));
    color: var(--text-color, var(--color-default));
    padding: var(--padding, var(--padding-default));
    font-size: var(--font-sie, var(--font-size-default));
    border: var(--border, var(--border-default));
    border-radius: var(--border-radius, var(--border-radius-default));
  }

  .primary {
    --bg-color-default: var(--color-primary, black);
    --bg-hover-color-default: var(--color-primary-hover, #1b1c1c);
    --color-default: var(--color-primary-contrast, #ffffff);
    --border-default: 1px solid transparent;
  }

  .secondary {
    --bg-color-default: var(--color-secondary, #6c757d);
    --bg-hover-color-default: var(--color-secondary-hover, #545b62);
    --color-default: var(--color-secondary-contrast, #ffffff);
    --border-default: 1px solid var(--gray-light, #6c757d);
  }

  .outlined {
    --bg-color-default: transparent;
    --bg-hover-color-default: var(--gray-lightest, #1b1c1c);
    --color-default: var(--color-primary, #007bff);
    --border-default: 1px solid var(--color-primary, #007bff);
  }

  .button:hover:not(:disabled) {
    background-color: var(--bg-hover-color, var(--bg-hover-color-default));
    color: var(--text-color-hover, var(--text-color, var(--color-default)));
  }

  .small {
    --font-size-default: 0.75rem;
    --padding-default: 0.4em 0.8em;
  }

  .medium {
    --font-size-default: 1rem;
    --padding-default: 0.5em 1em;
  }

  .large {
    --font-size-default: 1.125rem;
    --padding-default: 0.6em 1.2em;
  }

  .button:focus-visible {
    outline: 2px solid var(--bg-color, var(--bg-color-default));
    outline-offset: 2px;
  }

  .button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .content-loading {
    opacity: 0.5;
  }

  .spinner {
    position: absolute;
    width: 1.2em;
    height: 1.2em;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>
