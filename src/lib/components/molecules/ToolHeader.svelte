<script>
	import Text from '../atoms/Text.svelte';

	let { title, description } = $props();
</script>

<div class="mb-8 space-y-2">
	<Text tag="h1" variant="headline" align="center">
		{title}
	</Text>
	<Text tag="p" variant="body" align="center" class="mx-auto max-w-2xl">
		{description}
	</Text>
</div>
