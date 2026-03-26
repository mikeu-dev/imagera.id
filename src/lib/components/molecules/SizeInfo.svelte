<script lang="ts">
	interface Props {
		originalSize?: number;
		resultSize?: number;
	}

	let { originalSize = 0, resultSize = 0 }: Props = $props();

	function formatBytes(bytes: number, decimals = 2) {
		if (bytes <= 0) return '0 Bytes';
		const k = 1024;
		const dm = decimals < 0 ? 0 : decimals;
		const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		const i = Math.floor(Math.log(bytes) / Math.log(k));
		return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
	}

	const savings = $derived(
		originalSize > 0 && resultSize > 0
			? Math.round(((originalSize - resultSize) / originalSize) * 100)
			: 0
	);
</script>

<div class="grid grid-cols-2 gap-4 rounded-xl border border-gray-100 bg-gray-50 p-4 lg:grid-cols-3">
	<div class="flex flex-col">
		<span class="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase">Ukuran Asli</span>
		<span class="text-lg font-semibold text-gray-900">{formatBytes(originalSize)}</span>
	</div>
	<div class="flex flex-col">
		<span class="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase">Hasil Kompresi</span
		>
		<span class="text-lg font-semibold text-blue-600">{formatBytes(resultSize)}</span>
	</div>
	{#if savings > 0}
		<div class="col-span-2 flex flex-col lg:col-span-1">
			<span class="mb-1 text-xs font-bold tracking-wider text-gray-500 uppercase">Hemat</span>
			<span class="text-lg font-semibold text-green-600">-{savings}%</span>
		</div>
	{/if}
</div>
