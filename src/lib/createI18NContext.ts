import type {
	NanoI18nL10nFunction,
	NanoI18nL10nImporters,
	NanoI18nL10nMessages,
} from '@nanoi18n/core'
import { loadL10n } from '@nanoi18n/core'
import { getContext, hasContext, setContext } from 'svelte'

export type ContextKey = string

export type I18NInitializerFunction<TLocale> = (
	locale: TLocale,
) => Promise<void>

export type I18NContextSetterFunction = () => void

export type I18NContextGetterFunction<
	TMessages extends NanoI18nL10nMessages<TMessages>,
> = () => NanoI18nL10nFunction<TMessages>

type I18NL10nLocalFunction = (
	key: string,
	...params: Readonly<unknown[]>
) => string

const messages: Partial<Record<ContextKey, I18NL10nLocalFunction>> = {}

const createI18NInitializer =
	<TLocale extends string, TMessages extends NanoI18nL10nMessages<TMessages>>(
		contextKey: ContextKey,
		importers: NanoI18nL10nImporters<TLocale, TMessages>,
	): I18NInitializerFunction<TLocale> =>
	async (locale: TLocale): Promise<void> => {
		if (messages[contextKey] === undefined) {
			const l = await loadL10n(locale, importers)
			messages[contextKey] ??= l as I18NL10nLocalFunction
		}
	}

const createI18NContextSetter =
	(contextKey: ContextKey): I18NContextSetterFunction =>
	(): void => {
		const l = messages[contextKey]

		if (l === undefined) {
			throw new Error(
				'I18N must be initialized before it can be set as context.',
			)
		}

		setContext(contextKey, l)
	}

const createI18NContextGetter =
	<TMessages extends NanoI18nL10nMessages<TMessages>>(
		contextKey: ContextKey,
	): I18NContextGetterFunction<TMessages> =>
	(): ReturnType<I18NContextGetterFunction<TMessages>> => {
		if (!hasContext(contextKey)) {
			throw new Error(
				'I18N must be initialized before it can be retrieved as context.',
			)
		}

		return getContext(contextKey)
	}

export interface I18NContext<
	TLocale,
	TMessages extends NanoI18nL10nMessages<TMessages>,
> {
	initI18N: I18NInitializerFunction<TLocale>
	setI18NContext: I18NContextSetterFunction
	getI18NContext: I18NContextGetterFunction<TMessages>
}

export const createI18NContext = <
	TLocale extends string,
	TMessages extends NanoI18nL10nMessages<TMessages>,
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
