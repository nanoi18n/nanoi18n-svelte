<script context="module" lang="ts">
	interface Props<TKey, TI18N = (key: TKey) => string> {
		t: TI18N
		key: TKey
	}
</script>

<script lang="ts" generics="TKey extends string">
	// TODO: Remove once this issue is fixed
	// https://github.com/sveltejs/svelte-eslint-parser/issues/306
	/* eslint-disable-next-line no-undef */
	const { key, t } = $props<Props<TKey>>()

	let text: string = $state('')

	$effect.pre(() => {
		text = t(key)
	})
</script>

{#if text}
	{text}
{/if}
