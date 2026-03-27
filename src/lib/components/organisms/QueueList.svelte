<script lang="ts">
	import Text from '../atoms/Text.svelte';
	import * as m from '$lib/paraglide/messages';

	export interface QueueItem {
		id: string;
		file: File;
		status: 'waiting' | 'processing' | 'done' | 'error';
		resultBlob?: Blob;
	}

	let { 
		items, 
		onremove, 
		onclear, 
		ondownloadzip,
		processing = false
	}: { 
		items: QueueItem[]; 
		onremove: (id: string) => void; 
		onclear: () => void; 
		ondownloadzip: () => void;
		processing?: boolean;
	} = $props();

	const totalOriginalSize = $derived(items.reduce((acc, item) => acc + item.file.size, 0));
	const totalResultSize = $derived(items.reduce((acc, item) => acc + (item.resultBlob?.size || 0), 0));
	const completedCount = $derived(items.filter(i => i.status === 'done').length);
</script>

<div class="space-y-4 rounded-3xl border border-gray-100 bg-white p-6 shadow-xl shadow-gray-200/50">
	<div class="flex items-center justify-between">
		<Text tag="h3" weight="bold" class="text-lg text-gray-800">{m.bulk_queue()} ({items.length})</Text>
		<div class="flex space-x-2">
			<button 
				onclick={onclear}
				disabled={processing || items.length === 0}
				class="text-xs font-bold text-gray-400 hover:text-rose-500 disabled:opacity-50"
			>
				{m.bulk_clear()}
			</button>
		</div>
	</div>

	<div class="max-h-[400px] space-y-2 overflow-y-auto pr-2 custom-scrollbar">
		{#each items as item (item.id)}
			<div class="flex items-center justify-between rounded-2xl border border-gray-50 bg-gray-50/50 p-4 transition-all hover:bg-gray-50">
				<div class="flex items-center space-x-4">
					<div class="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
					</div>
					<div>
						<p class="max-w-[150px] truncate text-sm font-bold text-gray-700 md:max-w-[250px]">{item.file.name}</p>
						<p class="text-xs text-gray-400">{(item.file.size / 1024 / 1024).toFixed(2)} MB</p>
					</div>
				</div>

				<div class="flex items-center space-x-4">
					<div class="text-right">
						{#if item.status === 'waiting'}
							<span class="rounded-full bg-gray-100 px-3 py-1 text-[10px] font-bold text-gray-500 uppercase">{m.status_waiting()}</span>
						{:else if item.status === 'processing'}
							<span class="flex items-center space-x-1 rounded-full bg-blue-100 px-3 py-1 text-[10px] font-bold text-blue-600 uppercase">
								<span class="h-2 w-2 animate-pulse rounded-full bg-blue-600"></span>
								<span>{m.status_processing()}</span>
							</span>
						{:else if item.status === 'done'}
							<span class="rounded-full bg-green-100 px-3 py-1 text-[10px] font-bold text-green-600 uppercase">{m.status_done()}</span>
						{:else}
							<span class="rounded-full bg-rose-100 px-3 py-1 text-[10px] font-bold text-rose-600 uppercase">{m.status_error()}</span>
						{/if}
						
						{#if item.resultBlob}
							<p class="mt-1 text-[10px] font-bold text-blue-600">
								-{Math.round((1 - (item.resultBlob.size / item.file.size)) * 100)}%
							</p>
						{/if}
					</div>

					<button 
						onclick={() => onremove(item.id)}
						disabled={processing}
						aria-label="Remove"
						class="text-gray-300 transition-colors hover:text-rose-500 disabled:opacity-30"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
					</button>
				</div>
			</div>
		{/each}
	</div>

	{#if completedCount > 0}
		<div class="pt-4">
			<button 
				onclick={ondownloadzip}
				class="w-full rounded-2xl bg-blue-600 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition-all hover:bg-blue-700 hover:shadow-blue-300"
			>
				{m.bulk_download_zip()} 🎁
			</button>
			<div class="mt-4 flex justify-between rounded-xl bg-green-50 p-4 text-xs font-bold text-green-700">
				<span>Total Original: {(totalOriginalSize / 1024 / 1024).toFixed(2)} MB</span>
				<span>Total Result: {(totalResultSize / 1024 / 1024).toFixed(2)} MB</span>
			</div>
		</div>
	{/if}
</div>

<style>
	.custom-scrollbar::-webkit-scrollbar {
		width: 4px;
	}
	.custom-scrollbar::-webkit-scrollbar-track {
		background: transparent;
	}
	.custom-scrollbar::-webkit-scrollbar-thumb {
		background: #e5e7eb;
		border-radius: 10px;
	}
</style>
