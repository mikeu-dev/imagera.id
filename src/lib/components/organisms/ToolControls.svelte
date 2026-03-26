<script>
	import Button from '../atoms/Button.svelte';

	let {
		children,
		onprocess,
		ondownload,
		onreset,
		processing = false,
		hasResult = false
	} = $props();
</script>

<div class="space-y-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-xs">
	<div class="space-y-4">
		{@render children?.()}
	</div>

	<div class="grid grid-cols-1 gap-3 border-t border-gray-100 pt-4">
		<Button onclick={onprocess} disabled={processing} class="w-full">
			{#if processing}
				<span class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
				></span>
				Memproses...
			{:else}
				Proses Gambar
			{/if}
		</Button>

		{#if hasResult}
			<Button
				variant="success"
				onclick={ondownload}
				class="w-full bg-green-600 text-white hover:bg-green-700"
			>
				Unduh Hasil
			</Button>
		{/if}

		<Button variant="ghost" onclick={onreset} class="w-full">Mulai Ulang</Button>
	</div>
</div>
