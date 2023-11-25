<script lang="ts" context="module">
</script>

<script lang="ts">
	import { T } from '$lib/index.ts'

	import { getI18NContext, setI18NContext } from './messages.ts'

	setI18NContext()
	const t = getI18NContext()
</script>

<h1>Welcome to your library project</h1>
<p>
	Create your package using @sveltejs/package and preview/showcase your work
	with SvelteKit
</p>
<p>
	Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>

<div>
	T here:
	<T {t} key="yes-button.text" />
</div>

<div>
	t here: {t('yes-button.unused')}
</div>
