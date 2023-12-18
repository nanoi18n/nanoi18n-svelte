<script lang="ts" context="module">
</script>

<script lang="ts">
	import { L } from '$lib/index.js'

	import { getI18NContext, setI18NContext } from './messages.js'

	// This needs to happen on component initialization
	setI18NContext()

	// This could happen inside components if not needed at the page level
	const m = getI18NContext()
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
	<L text={m['yes-button.text']()} />
</div>

<div>
	<L text={m['yes-button.with-name']({ personName: 'Human Name' })} />
</div>

<div>
	<L
		text={m['yes-button.with-full-name']({
			firstName: 'First',
			lastName: 'Last',
		})}
	/>
</div>

<div>
	l here: {m['yes-button.unused']()}
</div>

<div>
	l here: {m['yes-button.with-name']({ personName: 'Human Name' })}
</div>
