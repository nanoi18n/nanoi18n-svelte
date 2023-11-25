import type { LayoutLoad } from './$types.js'
import { initI18N } from './messages.ts'

export const prerender = true

export const load: LayoutLoad = async () => {
	await initI18N('es')
}
