<script lang="ts">
  import Button from '$lib/components/Button/index.svelte'
  import type { Snippet } from 'svelte'
  import CloseIcon from '~icons/mdi/close'

  let {
    showModal = $bindable(),
    width = '500px',
    height = 'auto',
    title,
    isTransitioning,
    children
  }: {
    showModal: boolean
    width?: string
    height?: string
    title?: Snippet | string
    isTransitioning?: boolean
    children?: Snippet
  } = $props()

  let dialog: HTMLDialogElement | undefined = $state()

  $effect(() => {
    if (showModal) dialog?.showModal()
  })

  const closeModal = () => {
    if (isTransitioning) {
      return
    } else {
      dialog?.close()
    }
  }
</script>

<dialog
  bind:this={dialog}
  onkeydown={(e) => {
    e.preventDefault()
    if (e.key === 'Escape') closeModal()
  }}
  onmousedown={(e) => {
    if (e.target === dialog) closeModal()
  }}
  onclose={() => {
    showModal = false
  }}
>
  <div style="width: {width}; height: {height}">
    <header>
      {#if typeof title === 'string'}
        <h2>{title}</h2>
      {:else}
        {@render title?.()}
      {/if}
      <Button onclick={closeModal} variant="outlined" --border="none">
        <div class="close-icon">
          <CloseIcon />
        </div>
      </Button>
    </header>
    {#if title}<div class="separator"></div>{/if}
    {@render children?.()}
  </div>
</dialog>

<style>
  @import './styles.css';
</style>
