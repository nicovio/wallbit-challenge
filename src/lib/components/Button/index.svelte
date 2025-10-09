<script lang="ts">
  import type { HTMLButtonAttributes } from 'svelte/elements'

  type Props = HTMLButtonAttributes & {
    variant?: 'outlined' | 'primary' | 'secondary'
    size?: 'large' | 'medium' | 'small'
    loading?: boolean
    danger?: boolean
  }

  let {
    variant = 'primary',
    size = 'medium',
    class: className = '',
    loading = false,
    disabled = false,
    danger = false,
    children,
    ...rest
  }: Props = $props()

  let finalDisabled = $derived(disabled || loading)
</script>

<button
  class="button {variant} {size} {className}"
  class:loading
  class:danger
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
  @import './styles.css';
</style>
