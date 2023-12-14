<script context="module" lang="ts">
	type M = {
		a: 'somestuff'
		b: (p: { a: string }) => string
		c: (p: { b: string }) => string
	}

	export type NanoI18nL10nFunctionParams<
		TMessages,
		TKey extends keyof TMessages,
	> = TMessages[TKey] extends (params: Readonly<infer P>) => string ? [P] : []

	export type NanoI18nL10nFunction<TMessages> = <TKey extends keyof TMessages>(
		key: TKey,
		...params: Readonly<NanoI18nL10nFunctionParams<TMessages, TKey>>
	) => string

	type FF = NanoI18nL10nFunction<M>

	type PP = Props3<NanoI18nL10nFunction<M>>

	type F1 = (key: 'a') => string
	type F2 = (key: 'b') => string
	type F3 = (key: 'c', p: { n: string }) => string
	type F4 = (key: 'd', p: { o: string; p: string }) => string

	type Props3<TL10nFunction> = {
		l: TL10nFunction
	} & (
		| {
				key: 'yes-button.with-full-name'
				params: { firstName: string; lastName: string }
		  }
		| {
				key: 'yes-button.with-name'
				params: { personName: string }
		  }
		| {
				key: 'yes-button.text'
				params?: never
		  }
		| {
				key: 'yes-button.unused'
				params?: never
		  }
	)

	type Key<TL10nFunction> = TL10nFunction extends (
		key: infer K,
		...args: any
	) => string
		? K
		: never

	type Param<TL10nFunction, TKey> = TL10nFunction extends (
		key: TKey,
		param: infer P,
	) => string
		? P
		: never

	type Props5<TL10nFunction> = (
		TL10nFunction extends any ? (x: TL10nFunction) => any : never
	) extends (t: infer F) => any
		? Param<F, Key<TL10nFunction>> extends undefined
					? {
							key: Key<F>
							param?: never
						}
					: {
							key: Key<F>
							param: Param<F, Key<F>>
						}

	type Props6<TL10nFunction> = TL10nFunction extends any
		? Param<TL10nFunction> extends undefined
			? { l: TL10nFunction; key: Key<TL10nFunction>; param?: never }
			: {
					l: TL10nFunction
					key: Key<TL10nFunction>
					param: Param<TL10nFunction>
				}
		: never

	type P5 = Props5<F1 | F2 | F3 | F4>
</script>

<script lang="ts" generics="TL10nFunction">
	// TODO: Remove once this issue is fixed
	// https://github.com/sveltejs/svelte-eslint-parser/issues/306
	/* eslint-disable-next-line no-undef */
	const { l, key, params } = $props<Props5<TL10nFunction>>()

	let text: string = $state('')

	$effect.pre(() => {
		if (typeof l === 'function' && key !== undefined) {
			text = l(key, ...[params])
		}
	})
</script>

{#if text}
	{text}
{/if}
