<script context="module" lang="ts">
  interface Props<TKey, TI18N = (key: TKey) => string> {
    t: TI18N
    key: TKey
  }
</script>

<script lang="ts" generics="TKey extends string">
  const { key, t } = $props<Props<TKey>>()

  let text: string

  $effect.pre(() => {
    text = t(key)
  })
</script>

{#if text}
  {text}
{/if}
