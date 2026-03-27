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

<svelte:head>
	<meta property="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:site_name" content="Imagera.id" />
</svelte:head>

<MainLayout>
	{@render children?.()}
</MainLayout>
