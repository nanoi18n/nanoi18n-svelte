import type {
	NanoI18nL10nImporters,
	NanoI18nL10nMessageFunction,
} from '@nanoi18n/core'
import { getContext, hasContext, setContext } from 'svelte'

export type ContextKey = string

export type I18NInitializerFunction<TLocale> = (
	locale: TLocale,
) => Promise<void>

export type I18NContextSetterFunction = () => void

export type I18NContextGetterFunction<
	TMessages extends Record<
		keyof TMessages,
		NanoI18nL10nMessageFunction<TMessages[keyof TMessages]>
	>,
> = () => NanoI18nL10nMessageFunction<TMessages>

const messages: Partial<Record<ContextKey, unknown>> = {}

const createI18NInitializer =
	<
		TLocale extends string,
		TMessages extends Record<
			keyof TMessages,
			NanoI18nL10nMessageFunction<TMessages[keyof TMessages]>
		>,
	>(
		contextKey: ContextKey,
		importers: NanoI18nL10nImporters<TLocale, TMessages>,
	): I18NInitializerFunction<TLocale> =>
	async (locale: TLocale): Promise<void> => {
		if (messages[contextKey] === undefined) {
			const m = await importers[locale]()
			messages[contextKey] ??= m
		}
	}

const createI18NContextSetter =
	(contextKey: ContextKey): I18NContextSetterFunction =>
	(): void => {
		const m = messages[contextKey]

		if (m === undefined) {
			throw new Error(
				'I18N must be initialized before it can be set as context.',
			)
		}

		setContext(contextKey, m)
	}

const createI18NContextGetter =
	<
		TMessages extends Record<
			keyof TMessages,
			NanoI18nL10nMessageFunction<TMessages[keyof TMessages]>
		>,
	>(
		contextKey: ContextKey,
	) =>
	(): TMessages => {
		if (!hasContext(contextKey)) {
			throw new Error(
				'I18N must be initialized before it can be retrieved as context.',
			)
		}

		return getContext(contextKey)
	}

export interface I18NContext<
	TLocale,
	TMessages extends Record<
		keyof TMessages,
		NanoI18nL10nMessageFunction<TMessages[keyof TMessages]>
	>,
> {
	initI18N: I18NInitializerFunction<TLocale>
	setI18NContext: I18NContextSetterFunction
	getI18NContext: () => TMessages
}

export const createI18NContext = <
	TLocale extends string,
	TMessages extends Record<
		keyof TMessages,
		NanoI18nL10nMessageFunction<TMessages[keyof TMessages]>
	>,
>(
	contextKey: ContextKey,
	importers: NanoI18nL10nImporters<TLocale, TMessages>,
): I18NContext<TLocale, TMessages> => {
	return {
		initI18N: createI18NInitializer<TLocale, TMessages>(contextKey, importers),
		setI18NContext: createI18NContextSetter(contextKey),
		getI18NContext: createI18NContextGetter<TMessages>(contextKey),
	}
}
