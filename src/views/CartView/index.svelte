<script lang="ts">
	import { productsService } from '../../services/products';
	import AddProductForm from './AddProductForm/index.svelte';
	import ProductsList from './ProductsList/index.svelte';
	import type { CartItem } from '../../types';

	let cart: CartItem[] = $state([]);
	let loading = $state(false);

	async function addProduct({ quantity, productId }: { quantity: number; productId: number }) {
		loading = true;
		const product = await productsService.getProduct(productId);
		cart = [...cart, { product, quantity }];
		loading = false;
	}
</script>

<section class="content">
	<h1>Tienda - El Topo</h1>
	<AddProductForm {loading} {addProduct} />
	<ProductsList {cart} />
</section>

<style>
	.content {
		min-width: 800px;
		max-width: 800px;
		display: flex;
		flex-direction: column;
		gap: 2em;
		min-height: 100%;
		padding-block: 2em;
	}

	h1 {
		font-size: 24px;
		font-weight: 700;
		color: var(--color-text-primary);
	}
</style>
