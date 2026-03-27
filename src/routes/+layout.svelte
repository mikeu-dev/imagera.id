<script lang="ts">
	import '../app.css';
	import MainLayout from '$lib/components/templates/MainLayout.svelte';
	import { onNavigate } from '$app/navigation';

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<MainLayout>
	{@render children?.()}
</MainLayout>
