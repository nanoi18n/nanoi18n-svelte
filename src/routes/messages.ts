import { createI18NContext } from '$lib/index.js'
import type { NanoI18nL10nImporters } from '@nanoi18n/core'
import type enMessages from './messages.en.js'
import type esMessages from './messages.es.js'

const importers: NanoI18nL10nImporters<
	'en' | 'es',
	// TODO: Update README on core to use & instead of a single type
	typeof enMessages & typeof esMessages
> = {
	['en']: async () => (await import('./messages.en.js')).default,
	['es']: async () => (await import('./messages.es.js')).default,
}

const contextKey = 'components-messsages'

export const { initI18N, setI18NContext, getI18NContext } = createI18NContext(
	contextKey,
	importers,
)