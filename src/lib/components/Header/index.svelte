<script lang="ts">
  import { PUBLIC_COOKIE_COLOR_SCHEME } from '$lib/constants'
  import type { ColorScheme } from '../../../app'

  let { initialColorScheme }: { initialColorScheme: ColorScheme } = $props()

  let colorScheme = $state<ColorScheme>(initialColorScheme)

  const toggleColorScheme = () => {
    const newColorScheme = colorScheme === 'light' ? 'dark' : 'light'
    document.documentElement.dataset.colorScheme = newColorScheme
    document.cookie = `${PUBLIC_COOKIE_COLOR_SCHEME}=${newColorScheme}; path=/; SameSite=Lax; Secure`
    colorScheme = newColorScheme
  }
</script>

<nav>
  {#if colorScheme === 'light'}
    <button onclick={toggleColorScheme}>🌙</button>
  {:else}
    <button onclick={toggleColorScheme}>☀️</button>
  {/if}
</nav>

<style>
  nav {
    display: flex;
    padding: 1rem;
    justify-content: flex-end;
    border-bottom: 1px solid #ccc;
    width: 100%;
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-color-scheme='light']) nav {
      background-color: red;
    }
  }

  :root[data-color-scheme='dark'] nav {
    background-color: red;
  }
</style>
