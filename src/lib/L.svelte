<script context="module" lang="ts">
	interface Props {
		text: string | undefined
	}
</script>

<script lang="ts">
	const { text } = $props<Props>()

	let internalText: string = $state('')

	$effect.pre(() => {
		if (text !== undefined) {
			internalText = text
		}
	})
</script>

{#if internalText}
	{internalText}
{/if}
