<script lang="ts">
  import type { Snippet } from 'svelte'

  type Props = {
    backgroundColor?: string
    borderColor?: string
    borderRadius?: string
    padding?: string
    customStyle?: string
    children: Snippet
  }

  let { children, backgroundColor, borderColor, borderRadius, padding, customStyle }: Props =
    $props()

  let style = $derived(
    [
      backgroundColor && `--card-bg: ${backgroundColor}`,
      borderColor && `--card-border-color: ${borderColor}`,
      borderRadius && `--card-border-radius: ${borderRadius}`,
      padding && `--card-padding: ${padding}`
    ]
      .filter(Boolean)
      .join('; ')
  )
</script>

<div class="container" style={`${style};${customStyle}`}>{@render children()}</div>

<style>
  @import './styles.css';
</style>
