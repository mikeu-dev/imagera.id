<script>
	let { src, alt = 'Pratinjau Gambar', loading = false } = $props();
</script>

<div
	class="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-gray-50 p-4"
>
	{#if src}
		<img
			{src}
			{alt}
			class="max-h-full max-w-full rounded-lg object-contain shadow-lg transition-opacity duration-300 {loading
				? 'opacity-50'
				: 'opacity-100'}"
		/>

		{#if loading}
			<div class="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-xs">
				<div
					class="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"
				></div>
			</div>
		{/if}
	{:else}
		<div class="space-y-2 text-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="mx-auto h-12 w-12 text-gray-300"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path
					d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"
				/>
			</svg>
			<p class="text-sm text-gray-400">Belum ada gambar terpilih</p>
		</div>
	{/if}
</div>
