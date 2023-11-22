import { sveltekit } from '@sveltejs/kit/vite'
import { searchForWorkspaceRoot } from 'vite'
import type { UserConfig, UserConfigFnPromise } from 'vitest/config'
import { defineConfig } from 'vitest/config'

const configGenerator: UserConfigFnPromise = async () => {
	const plugins = (await sveltekit()) as UserConfig['plugins']

	if (plugins === undefined) {
		throw new Error('pluging unexpectedly undefined in vite.config.ts')
	}

	const config: UserConfig = {
		plugins,
		server: {
			fs: {
				// NOTE: Fix for 'The request url "<pnp module path>" is outside of
				// Vite serving allow list.'
				// Reference: https://vitejs.dev/config/server-options.html#server-fs-allow
				allow: [
					// search up for workspace root
					searchForWorkspaceRoot(process.cwd()),
				],
			},
		},
		test: {
			include: ['src/**/*.{test,spec}.{js,ts}'],
		},
	}

	return config
}

export default defineConfig(configGenerator)
