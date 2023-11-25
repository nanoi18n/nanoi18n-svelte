import type { Importers, MessageKeys } from '@nanoi18n/nanoi18n'
import { load } from '@nanoi18n/nanoi18n'
import { getContext, hasContext, setContext } from 'svelte'

type ContextKey = string

type I18NInitializerFunction<TLocale> = (locale: TLocale) => Promise<void>
type I18NContextSetterFunction = () => void
type I18NContextGetterFunction<
	T0 extends Record<string, string>,
	T1 extends Record<string, string> = never,
	T2 extends Record<string, string> = never,
	T3 extends Record<string, string> = never,
	T4 extends Record<string, string> = never,
	T5 extends Record<string, string> = never,
	T6 extends Record<string, string> = never,
	T7 extends Record<string, string> = never,
	T8 extends Record<string, string> = never,
	T9 extends Record<string, string> = never,
> = () => (key: MessageKeys<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>) => string

const messages: Partial<Record<ContextKey, (key: string) => string>> = {}

const createI18NInitializer =
	<
		TLocale extends string,
		T0 extends Record<string, string>,
		T1 extends Record<string, string> = never,
		T2 extends Record<string, string> = never,
		T3 extends Record<string, string> = never,
		T4 extends Record<string, string> = never,
		T5 extends Record<string, string> = never,
		T6 extends Record<string, string> = never,
		T7 extends Record<string, string> = never,
		T8 extends Record<string, string> = never,
		T9 extends Record<string, string> = never,
	>(
		contextKey: ContextKey,
		importers: Importers<TLocale, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>,
	): I18NInitializerFunction<TLocale> =>
	async (locale: TLocale): Promise<void> => {
		if (messages[contextKey] === undefined) {
			const t = await load(locale, importers)
			messages[contextKey] ??= t
		}
	}

const createI18NContextSetter =
	(contextKey: ContextKey): I18NContextSetterFunction =>
	(): void => {
		const t = messages[contextKey]

		if (t === undefined) {
			throw new Error(
				'I18N must be initialized before it can be set as context.',
			)
		}

		setContext(contextKey, t)
	}

const createI18NContextGetter =
	<
		T0 extends Record<string, string>,
		T1 extends Record<string, string> = never,
		T2 extends Record<string, string> = never,
		T3 extends Record<string, string> = never,
		T4 extends Record<string, string> = never,
		T5 extends Record<string, string> = never,
		T6 extends Record<string, string> = never,
		T7 extends Record<string, string> = never,
		T8 extends Record<string, string> = never,
		T9 extends Record<string, string> = never,
	>(
		contextKey: ContextKey,
	): I18NContextGetterFunction<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9> =>
	(): ReturnType<
		I18NContextGetterFunction<T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>
	> => {
		if (!hasContext(contextKey)) {
			throw new Error(
				'I18N must be initialized before it can be retrieved as context.',
			)
		}

		return getContext(contextKey)
	}

interface I18NContext<
	TLocale,
	T0 extends Record<string, string>,
	T1 extends Record<string, string> = never,
	T2 extends Record<string, string> = never,
	T3 extends Record<string, string> = never,
	T4 extends Record<string, string> = never,
	T5 extends Record<string, string> = never,
	T6 extends Record<string, string> = never,
	T7 extends Record<string, string> = never,
	T8 extends Record<string, string> = never,
	T9 extends Record<string, string> = never,
> {
	initI18N: I18NInitializerFunction<TLocale>
	setI18NContext: I18NContextSetterFunction
	getI18NContext: I18NContextGetterFunction<
		T0,
		T1,
		T2,
		T3,
		T4,
		T5,
		T6,
		T7,
		T8,
		T9
	>
}

export const createI18NContext = <
	TLocale extends string,
	T0 extends Record<string, string>,
	T1 extends Record<string, string> = never,
	T2 extends Record<string, string> = never,
	T3 extends Record<string, string> = never,
	T4 extends Record<string, string> = never,
	T5 extends Record<string, string> = never,
	T6 extends Record<string, string> = never,
	T7 extends Record<string, string> = never,
	T8 extends Record<string, string> = never,
	T9 extends Record<string, string> = never,
>(
	contextKey: ContextKey,
	importers: Importers<TLocale, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9>,
): I18NContext<TLocale, T0, T1, T2, T3, T4, T5, T6, T7, T8, T9> => {
	return {
		initI18N: createI18NInitializer<
			TLocale,
			T0,
			T1,
			T2,
			T3,
			T4,
			T5,
			T6,
			T7,
			T8,
			T9
		>(contextKey, importers),
		setI18NContext: createI18NContextSetter(contextKey),
		getI18NContext: createI18NContextGetter<
			T0,
			T1,
			T2,
			T3,
			T4,
			T5,
			T6,
			T7,
			T8,
			T9
		>(contextKey),
	}
}
