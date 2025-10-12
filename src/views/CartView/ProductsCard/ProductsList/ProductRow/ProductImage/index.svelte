<script lang="ts">
  import Button from '$lib/components/Button/index.svelte'
  import Modal from '$lib/components/Modal/index.svelte'
  import type { Product } from '$lib/types'
  import { quintOut } from 'svelte/easing'
  import { crossfade } from 'svelte/transition'

  const [send, receive] = crossfade({ easing: quintOut, duration: 400 })

  let { product }: { product: Product } = $props()

  let showModal: boolean = $state(false)
  let isTransitioning: boolean = $state(false)

  const onImageClick = () => {
    showModal = true
  }
</script>

<Button variant="outlined" size="small" onclick={onImageClick} --border="none" --padding="0">
  <div class="product-img-container">
    {#if !showModal}
      <img out:send={{ key: product.image }} src={product.image} alt={product.title} />
    {/if}
  </div>
</Button>

{#if showModal}
  <Modal bind:showModal width="450px" title={product.title} {isTransitioning}>
    <img
      class="modal-img"
      src={product.image}
      alt={product.title}
      width="100%"
      height="100%"
      in:receive={{ key: product.image }}
      onintrostart={() => {
        isTransitioning = true
      }}
      onintroend={() => {
        isTransitioning = false
      }}
    />
  </Modal>
{/if}

<style>
  @import './styles.css';
</style>
