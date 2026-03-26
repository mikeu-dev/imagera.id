<script>
	import Navbar from '../organisms/Navbar.svelte';
	import Footer from '../organisms/Footer.svelte';

	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col bg-white">
	<Navbar />

	<main class="grow">
		{@render children?.()}
	</main>

	<Footer />
</div>
