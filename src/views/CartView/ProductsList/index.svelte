<script lang="ts">
	import Card from '../../../components/Card/index.svelte';
	import type { CartItem } from '../../../types';
	import ProductsTable from './ProductsTable/index.svelte';

	let { cart }: { cart: CartItem[] } = $props();
</script>

<Card customStyle="flex: 1; display: flex; flex-direction: column;">
	<div class="card-container">
		<div class="title-container">
			<h2 class="cardTitle">Carrito de compra</h2>
			<span>Iniciado 15/05/2022 - 16:00</span>
		</div>
		{#if cart.length == 0}
			<p class="empty-cart">Tu carrito está vacío</p>
		{:else}
			<ProductsTable {cart} />
		{/if}
	</div>
</Card>

<style>
	.title-container {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.5em;
		font-size: 12px;
	}

	.title-container span {
		color: var(--color-text-secondary);
	}

	.card-container {
		display: flex;
		flex-direction: column;
		gap: 1em;
		flex: 1;
	}

	.empty-cart {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		color: var(--color-text-secondary);
		font-size: 14px;
	}
</style>
