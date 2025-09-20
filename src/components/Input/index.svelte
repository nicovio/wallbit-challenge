<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';
	interface Props extends HTMLInputAttributes {
		label: string;
		type?: 'checkbox' | 'text' | 'number';
		value?: number;
		checked?: boolean;
	}
	let {
		id,
		label,
		type = 'text',
		value = $bindable(),
		checked = $bindable(),
		...rest
	}: Props = $props();
</script>

<div class="input-container">
	<label for={id}>{label} </label>
	<input {...rest} {id} {type} />
</div>

<style>
	.input-container {
		display: flex;
		flex-direction: column;
		gap: 0.2em;
		flex: 1;
	}

	input,
	label {
		font-size: 12px;
	}

	label {
		color: var(--color-text-secondary);
	}

	input {
		height: 28px;
		padding: 0.5em;
	}
</style>
