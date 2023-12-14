<script lang="ts" context="module">
</script>

<script lang="ts">
	import { L } from '$lib/index.js'

	import { getI18NContext, setI18NContext } from './messages.js'

	setI18NContext()
	const l = getI18NContext()
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
	L here:
	<L {l} key="yes-button.text" />
</div>

<div>
	<L {l} key="yes-button.with-name" params={{ a: 'Human Name' }} />
</div>

<div>
	<L
		{l}
		key="yes-button.with-full-name"
		params={{ firstName: 'First', lastName: 'Lasat' }}
	/>
</div>

<div>
	l here: {l('yes-button.unused')}
</div>

<div>
	l here: {l('yes-button.with-name', { personName: 'Human' })}
</div>
