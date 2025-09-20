<script lang="ts">
	import type { Snippet } from 'svelte';

	type Props = {
		backgroundColor?: string;
		borderColor?: string;
		borderRadius?: string;
		padding?: string;
		customStyle?: string;
		children: Snippet;
	};

	let { children, backgroundColor, borderColor, borderRadius, padding, customStyle }: Props =
		$props();

	let style = $derived(
		[
			backgroundColor && `--card-bg: ${backgroundColor}`,
			borderColor && `--card-border-color: ${borderColor}`,
			borderRadius && `--card-border-radius: ${borderRadius}`,
			padding && `--card-padding: ${padding}`
		]
			.filter(Boolean)
			.join('; ')
	);
</script>

<div class="container" style={`${style};${customStyle}`}>{@render children()}</div>

<style>
	.container {
		flex: var(--flex, 0 1 auto);
		width: 100%;
		height: 100%;
		background-color: var(--card-bg, #ffffff);
		border: 1px solid var(--card-border-color, var(--color-border-default, #e0e0e0));
		border-radius: var(--card-border-radius, 0.5em);
		padding: var(--card-padding, 1em);
	}

	:global(.cardTitle) {
		font-size: 16px;
		font-weight: 600;
		color: var(--color-text-secondary);
	}
</style>
