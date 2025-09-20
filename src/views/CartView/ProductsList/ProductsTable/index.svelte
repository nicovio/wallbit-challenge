<script lang="ts">
	import type { CartItem } from '../../../../lib/types';
	import Button from '../../../../components/Button/index.svelte';

	let { cart }: { cart: CartItem[] } = $props();
</script>

<div class="container">
	{#each cart as { product, quantity } (product.id)}
		<div class="product">
			<div class="product-data">
				<img src={product.image} alt={product.title} />
				<div>
					<h3 class="title">{product.title}</h3>
				</div>
			</div>
			<div class="product-actions">
				<div class="quantity">
					<Button
						variant="primary"
						size="small"
						--text-color="black"
						--border="none"
						--bg-color="transparent"
						--bg-hover-color="transparent"
					>
						-
					</Button>
					{quantity}
					<Button variant="secondary" size="small" --border="none">+</Button>
				</div>
				<p class="price">${product.price * quantity}</p>
			</div>
		</div>
	{/each}
</div>

<!-- <table class="products-table">
	<thead>
		<tr>
			<th>Cantidad</th>
			<th>Nombre</th>
			<th>Precio Unitario</th>
			<th>Total</th>
			<th>Foto</th>
		</tr>
	</thead>
	<tbody>
		{#each cart as { product, quantity } (product.id)}
			<tr class="product">
				<td>{quantity}</td>
				<td>{product.title}</td>
				<td>${product.price}</td>
				<td>${product.price * quantity}</td>
				<td>
					<img src={product.image} alt={product.title} />
				</td>
			</tr>
		{/each}
	</tbody>
</table> -->

<style>
	.add {
		background-color: violet;
	}

	.container {
		display: flex;
		flex-direction: column;
		gap: 2em;
	}

	.product {
		display: flex;
		justify-content: space-between;
		gap: 1em;
	}

	.product-data {
		display: flex;
		gap: 1em;
		align-items: center;
	}

	.product .title {
		font-size: 14px;
		color: var(--color-text-secondary);
	}

	.product .price {
		font-size: 14px;
		color: var(--color-text-primary);
	}

	.product-actions {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1em;
		align-items: center;
	}

	.quantity {
		display: flex;
		align-items: center;
		gap: 0.5em;
	}

	.products-table {
		/* flex: 1; */
		width: 100%;
		overflow-x: auto;
		margin: 20px 0;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		/* max-height: 300px; */
		height: 100%;
		overflow-y: scroll;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin: 0;
		padding: 0;
		table-layout: fixed;
	}

	tbody {
		display: block;
		min-width: 100%;
		max-width: 100%;
	}

	tbody {
		max-height: 400px;
		overflow-y: scroll;
	}

	thead tr {
		position: sticky; /* Make header sticky */
		top: 0;
		background-color: #f2f2f2; /* Background for sticky header */
	}

	th,
	td {
		padding: 12px 15px;
		text-align: left;
		border-bottom: 1px solid #e0e0e0;
		word-wrap: break-word;
		font-size: 12px;
	}

	th {
		color: var(--color-text-secondary);
		background-color: #f2f2f2;
		font-weight: bold;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		/* text-align: left; */
	}

	td {
		/* text-align: center; */
	}

	tbody tr:nth-child(even) {
		background-color: var(--gray-lightest);
	}

	tbody tr:hover {
		background-color: #e0f2f7; /* Resaltar fila al pasar el ratón */
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	td:first-child,
	th:first-child {
		border-top-left-radius: 8px;
		border-bottom-left-radius: 8px;
	}

	td:last-child,
	th:last-child {
		border-top-right-radius: 8px;
		border-bottom-right-radius: 8px;
	}

	.product img {
		object-fit: contain;
		width: 40px;
		aspect-ratio: 1/1;
	}

	/* Responsive para pantallas pequeñas */
	@media (max-width: 768px) {
		table,
		thead,
		tbody,
		th,
		td,
		tr {
			display: block;
		}

		thead tr {
			position: absolute;
			top: -9999px;
			left: -9999px;
		}

		tr {
			border: 1px solid #ddd;
			margin-bottom: 10px;
			border-radius: 8px;
			overflow: hidden;
		}

		td {
			border: none;
			border-bottom: 1px solid #eee;
			position: relative;
			padding-left: 50%;
			text-align: right;
		}

		td:before {
			content: attr(data-label); /* Mostrar el encabezado de la columna como etiqueta */
			position: absolute;
			left: 6px;
			width: 45%;
			padding-right: 10px;
			white-space: nowrap;
			text-align: left;
			font-weight: bold;
			color: #555;
		}

		td:last-child {
			border-bottom: none;
		}

		tbody tr:hover {
			background-color: #f0f8ff; /* Resaltado al pasar el ratón en móvil */
		}
	}
</style>
