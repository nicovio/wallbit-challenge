<script lang="ts">
  import { PUBLIC_COOKIE_COLOR_SCHEME } from '$lib/constants'
  import type { ColorScheme } from '../../../app'
  import DarkModeIcon from '~icons/mdi/weather-night'
  import LightModeIcon from '~icons/mdi/white-balance-sunny'

  const THEME_ICON_SIZE = '24px'

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
      <DarkModeIcon width={THEME_ICON_SIZE} />
    {:else}
      <LightModeIcon width={THEME_ICON_SIZE} />
    {/if}
  </button>
</header>

<style>
  @import './styles.css';
</style>
