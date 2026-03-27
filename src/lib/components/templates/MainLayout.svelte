<script lang="ts">
	import Navbar from '../organisms/Navbar.svelte';
	import Footer from '../organisms/Footer.svelte';
	import ToastContainer from '../molecules/ToastContainer.svelte';

	let { children } = $props();
</script>

<div class="relative flex min-h-screen flex-col bg-white">
	<Navbar />

	<ToastContainer />

	<main class="grow">
		{@render children?.()}
	</main>

	<Footer />
</div>
