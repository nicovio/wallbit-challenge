<script lang="ts">
  import { page } from '$app/state'
  const { status } = page
</script>

<div>
  {#if status >= 500}
    <h1>{status}</h1>
    <p>There was an error on the server</p>
  {/if}
  {#if page.error && status >= 400 && status < 500}
    <h1>{page.status}</h1>
    <p>{page.error.message}</p>
  {/if}
</div>
