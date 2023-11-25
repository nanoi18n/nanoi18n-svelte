import type { LayoutLoad } from './$types.js'
import { initI18N } from './messages.js'

export const prerender = true

export const load: LayoutLoad = async () => {
	await initI18N('es')
}
