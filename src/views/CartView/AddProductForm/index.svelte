<script lang="ts">
	import type { FormItem } from '$lib/utils/cart';
	import Button from '../../../components/Button/index.svelte';
	import Card from '../../../components/Card/index.svelte';
	import Input from '../../../components/Input/index.svelte';
	import { cartUtils } from '$lib/utils/cart';

	const { isValidFormItem } = cartUtils;

	type Props = {
		loading: boolean;
		addProduct: (params: { quantity: number; productId: number }) => Promise<void>;
	};

	const defaultItem: FormItem = { quantity: undefined, productId: undefined };

	let item: FormItem = $state(defaultItem);

	let { loading, addProduct }: Props = $props();

	const invalidForm = $derived(!isValidFormItem(item));

	async function onSubmit(event: SubmitEvent) {
		event.preventDefault();
		if (!isValidFormItem(item)) return;
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
