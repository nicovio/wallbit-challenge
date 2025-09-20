<script lang="ts">
	import Button from '../../../components/Button/index.svelte';
	import Card from '../../../components/Card/index.svelte';
	import Input from '../../../components/Input/index.svelte';

	type CartItem = {
		quantity: number;
		productId: number;
	};

	type Props = {
		loading: boolean;
		addProduct: (params: { quantity: number; productId: number }) => Promise<void>;
	};

	const defaultItem: CartItem = { quantity: 1, productId: 1 };

	let item: CartItem = $state(defaultItem);

	let { loading, addProduct }: Props = $props();

	const invalidForm = $derived(item.quantity == undefined || item.productId == undefined);

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (invalidForm) return;
		await addProduct(item);
		item = defaultItem;
	}
</script>

<Card>
	<form onsubmit={onSubmit} method="post">
		<section class="formContent">
			<h2 class="cardTitle">Agregar productos</h2>
			<div class="inputs">
				<Input
					id="productId"
					name="productId"
					type="number"
					label="ID del producto"
					min="1"
					bind:value={item.productId}
				/>
				<Input
					id="cantidad"
					name="Cantidad"
					type="number"
					label="Cantidad"
					min="1"
					bind:value={item.quantity}
				/>
			</div>
		</section>
		<Button type="submit" size="small" variant="primary" disabled={invalidForm} {loading}
			>Agregar
		</Button>
	</form>
</Card>

<style>
	form {
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		gap: 1em;
	}

	.formContent {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.formContent {
		width: 100%;
	}

	.inputs {
		display: flex;
		gap: 1em;
	}
</style>
