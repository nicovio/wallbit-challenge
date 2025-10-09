<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements'
  interface Props extends HTMLInputAttributes {
    label: string
    type?: 'checkbox' | 'number' | 'text'
    value?: number
    checked?: boolean
  }
  let {
    id,
    label,
    type = 'text',
    value = $bindable(),
    checked = $bindable(),
    ...rest
  }: Props = $props()
</script>

<div class="input-container">
  <label for={id}>{label} </label>
  {#if type === 'checkbox'}
    <input bind:checked {id} type="checkbox" {...rest} />
  {:else}
    <input bind:value {id} {type} {...rest} />
  {/if}
</div>

<style>
  @import './styles.css';
</style>
