<script lang="ts">
  import { PUBLIC_COOKIE_COLOR_SCHEME } from '$lib/constants'
  import type { ColorScheme } from '../../../app'
  import Icon from '@iconify/svelte'

  let { initialColorScheme }: { initialColorScheme: ColorScheme } = $props()

  let colorScheme = $state<ColorScheme>(initialColorScheme)

  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.colorScheme = newColorScheme
    document.cookie = `${PUBLIC_COOKIE_COLOR_SCHEME}=${newColorScheme}; path=/; SameSite=Lax; Secure; max-age=31536000`
    colorScheme = newColorScheme
  }
</script>

<header>
  <h1>Tienda - El Topo</h1>
  <button onclick={toggleColorScheme}>
    {#if colorScheme === 'light'}
      <Icon icon="mdi:weather-night" />
    {:else}
      <Icon icon="mdi:white-balance-sunny" />
    {/if}
  </button>
</header>

<style>
  header {
    width: 100%;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--ui-border);
    background-color: var(--ui-surface);
  }

  h1 {
    font-size: 24px;
    font-weight: 700;
    color: var(--ui-text-primary);
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    padding: 0;
    color: var(--ui-text-primary);
  }

  button:hover {
    color: var(--accent-500);
  }
</style>
