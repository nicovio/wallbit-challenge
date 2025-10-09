<script lang="ts">
  import { flip } from 'svelte/animate'
  import { toasts } from '$lib/stores/toast.js'
  import ToastMessage from '../ToastMessage/index.svelte'
</script>

<div class="toaster-container">
  {#each $toasts as toast (toast.id)}
    <div animate:flip={{ duration: 300 }}>
      <ToastMessage {toast} />
    </div>
  {/each}
</div>

<style>
  @import './styles.css';
</style>
