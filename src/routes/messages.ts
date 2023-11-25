import { createI18NContext } from '$lib/index.ts'
import type { Importers } from '@nanoi18n/nanoi18n'
import type enMessages from './messages.en.ts'
import type esMessages from './messages.es.ts'

const importers: Importers<'en' | 'es', typeof enMessages, typeof esMessages> =
	{
		['en']: async () => (await import('./messages.en.ts')).default,
		['es']: async () => (await import('./messages.es.ts')).default,
	}

const contextKey = 'components-messsages'

export const { initI18N, setI18NContext, getI18NContext } = createI18NContext(
	contextKey,
	importers,
)
