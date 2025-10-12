<script lang="ts">
  import Button from '$lib/components/Button/index.svelte'

  let {
    label,
    onClick,
    disabled = false
  }: { label: '-' | '+'; onClick: () => void; disabled?: boolean } = $props()
</script>

<Button
  class="quantity-button"
  variant="outlined"
  size="small"
  --border="none"
  {disabled}
  onclick={onClick}
>
  {label}
</Button>

<style>
  @import './styles.css';
</style>
