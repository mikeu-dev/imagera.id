<script lang="ts">
	import ToolPageTemplate from '$lib/components/templates/ToolPageTemplate.svelte';
	import ImageUploader from '$lib/components/molecules/ImageUploader.svelte';
	import ImagePreview from '$lib/components/molecules/ImagePreview.svelte';
	import ToolControls from '$lib/components/organisms/ToolControls.svelte';
	import QueueList, { type QueueItem } from '$lib/components/organisms/QueueList.svelte';
	import Slider from '$lib/components/atoms/Slider.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import { applyFilters } from '$lib/utils/imageFilters';
	import * as m from '$lib/paraglide/messages';
	import { toast } from '$lib/stores/toast.svelte';
	import JSZip from 'jszip';

	let queue = $state<QueueItem[]>([]);
	let processing = $state<boolean>(false);

	// Filter States
	let brightness = $state<number>(1);
	let contrast = $state<number>(1);
	let saturation = $state<number>(1);
	let grayscale = $state<number>(0);
	let sepia = $state<number>(0);
	let invert = $state<number>(0);
	let blur = $state<number>(0);

	let activeResultSrc = $state<string>('');
	let activeResultBlob = $state<Blob | null>(null);
	let activeOriginalFile = $state<File | null>(null);

	function handleUpload(files: File[]) {
		const newItems: QueueItem[] = files.map((file) => ({
			id: Math.random().toString(36).substring(2, 9),
			file,
			status: 'waiting'
		}));
		queue = [...queue, ...newItems];

		if (!activeOriginalFile && files.length > 0) {
			activeOriginalFile = files[0];
		}
	}

	async function processItem(item: QueueItem) {
		item.status = 'processing';
		try {
			const blob = await applyFilters(item.file, {
				brightness,
				contrast,
				saturation,
				grayscale,
				sepia,
				invert,
				blur
			});
			item.resultBlob = blob;
			item.status = 'done';

			if (activeOriginalFile === item.file) {
				activeResultBlob = blob;
				activeResultSrc = URL.createObjectURL(blob);
			}
		} catch (err) {
			console.error(`Filter failed for ${item.file.name}:`, err);
			item.status = 'error';
		}
	}

	async function handleProcess() {
		if (queue.length === 0) return;
		processing = true;

		try {
			for (const item of queue) {
				if (item.status !== 'done') {
					await processItem(item);
				}
			}
			toast.success(m.status_done() + ' ' + m.nav_filter());
		} finally {
			processing = false;
		}
	}

	async function handleDownloadZip() {
		const zip = new JSZip();
		const completed = queue.filter((i) => i.resultBlob);
		if (completed.length === 0) return;

		completed.forEach((item) => {
			const fileName = `filtered-${item.file.name}`;
			zip.file(fileName, item.resultBlob!);
		});

		const content = await zip.generateAsync({ type: 'blob' });
		const link = document.createElement('a');
		link.href = URL.createObjectURL(content);
		link.download = `imagera-batch-filtered.zip`;
		link.click();
	}

	function handleDownload() {
		if (queue.length > 1) {
			handleDownloadZip();
		} else if (activeResultBlob && activeOriginalFile) {
			const link = document.createElement('a');
			link.href = activeResultSrc;
			link.download = `filtered-${activeOriginalFile.name}`;
			link.click();
		}
	}

	function handleRemove(id: string) {
		const itemToRemove = queue.find((i) => i.id === id);
		if (itemToRemove?.file === activeOriginalFile) {
			activeOriginalFile = null;
			activeResultBlob = null;
			activeResultSrc = '';
		}
		queue = queue.filter((item) => item.id !== id);
	}

	function handleReset() {
		queue = [];
		activeOriginalFile = null;
		activeResultBlob = null;
		activeResultSrc = '';
		brightness = 1;
		contrast = 1;
		saturation = 1;
		grayscale = 0;
		sepia = 0;
		invert = 0;
		blur = 0;
	}
</script>

<svelte:head>
	<title>{m.filter_title()}</title>
	<meta name="description" content={m.filter_meta()} />
	<meta property="og:title" content={m.filter_title()} />
	<meta property="og:description" content={m.filter_meta()} />
</svelte:head>

<ToolPageTemplate title={m.filter_heading()} description={m.filter_desc()}>
	{#snippet preview()}
		<div class="space-y-6">
			{#if queue.length === 0}
				<ImageUploader onupload={handleUpload} multiple />
			{:else}
				<div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
					<div class="space-y-6">
						<QueueList
							items={queue}
							onremove={handleRemove}
							onclear={handleReset}
							ondownloadzip={handleDownloadZip}
							{processing}
						/>
						<button
							onclick={() => (queue = [])}
							class="w-full rounded-2xl border-2 border-dashed border-gray-200 py-4 text-sm font-bold text-gray-400 transition-all hover:border-blue-200 hover:text-blue-500"
						>
							+ {m.file_input_label()}
						</button>
					</div>

					<div class="space-y-4">
						<Text tag="h3" weight="bold" class="text-lg text-gray-800">{m.tool_preview()}</Text>
						<div class="grid grid-cols-1 gap-4">
							<div class="space-y-2">
								<Text tag="span" variant="muted" class="text-xs font-bold text-blue-600 uppercase"
									>{m.tool_result()}</Text
								>
								<div
									class="relative overflow-hidden rounded-3xl border border-gray-100 bg-gray-50 shadow-inner"
								>
									<ImagePreview src={activeResultSrc} loading={processing} />
									{#if !activeResultSrc && queue.length > 0}
										<div
											class="flex h-[300px] items-center justify-center p-12 text-center text-sm font-bold text-gray-400"
										>
											{m.status_waiting()}...
										</div>
									{/if}
								</div>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	{/snippet}

	{#snippet controls()}
		<ToolControls
			onprocess={handleProcess}
			ondownload={handleDownload}
			onreset={handleReset}
			{processing}
			hasResult={queue.some((i) => i.status === 'done')}
		>
			<div class="space-y-4">
				<Slider label={m.filter_brightness()} bind:value={brightness} min={0} max={2} step={0.1} disabled={queue.length === 0 || processing} />
				<Slider label={m.filter_contrast()} bind:value={contrast} min={0} max={2} step={0.1} disabled={queue.length === 0 || processing} />
				<Slider label={m.filter_saturation()} bind:value={saturation} min={0} max={2} step={0.1} disabled={queue.length === 0 || processing} />
				<Slider label={m.filter_blur()} bind:value={blur} min={0} max={10} step={1} disabled={queue.length === 0 || processing} />
				
				<div class="grid grid-cols-3 gap-2 pt-2">
					<button 
						onclick={() => grayscale = grayscale === 0 ? 1 : 0}
						class="rounded-xl border py-2 text-xs font-bold transition-all {grayscale > 0 ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-500 hover:border-blue-200'}"
					>
						{m.filter_grayscale()}
					</button>
					<button 
						onclick={() => sepia = sepia === 0 ? 1 : 0}
						class="rounded-xl border py-2 text-xs font-bold transition-all {sepia > 0 ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-500 hover:border-blue-200'}"
					>
						{m.filter_sepia()}
					</button>
					<button 
						onclick={() => invert = invert === 0 ? 1 : 0}
						class="rounded-xl border py-2 text-xs font-bold transition-all {invert > 0 ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-500 hover:border-blue-200'}"
					>
						{m.filter_invert()}
					</button>
				</div>
				
				<Text tag="p" variant="muted" class="text-xs italic">
					{m.filter_note()}
				</Text>
			</div>
		</ToolControls>
	{/snippet}

	{#snippet seoText()}
		<Text tag="h3" variant="headline" weight="bold">{m.filter_seo_title()}</Text>
		<p>{m.filter_seo_p1()}</p>
		<ul>
			<li><strong>{m.filter_seo_li1_label()}</strong>{m.filter_seo_li1_desc()}</li>
			<li><strong>{m.filter_seo_li2_label()}</strong>{m.filter_seo_li2_desc()}</li>
			<li><strong>{m.filter_seo_li3_label()}</strong>{m.filter_seo_li3_desc()}</li>
		</ul>
	{/snippet}
</ToolPageTemplate>
