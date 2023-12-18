<script lang="ts" context="module">
</script>

<script lang="ts">
	import { getI18NContext, setI18NContext } from './messages.js'

	// This needs to happen on component initialization
	setI18NContext()

	// This could happen inside components if not needed at the page level
	const m = getI18NContext()
</script>

<h1>@nanoi18n/svelte test page</h1>

<div>
	message without params: {m['app.text']()}
</div>

<div>
	message with param: {m['app.hi-with-full-name']({ fullName: 'Human Name' })}
</div>
