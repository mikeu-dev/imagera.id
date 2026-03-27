<script lang="ts">
	import ToolPageTemplate from '$lib/components/templates/ToolPageTemplate.svelte';
	import ImageUploader from '$lib/components/molecules/ImageUploader.svelte';
	import ImagePreview from '$lib/components/molecules/ImagePreview.svelte';
	import SizeInfo from '$lib/components/molecules/SizeInfo.svelte';
	import ToolControls from '$lib/components/organisms/ToolControls.svelte';
	import QueueList, { type QueueItem } from '$lib/components/organisms/QueueList.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import { convertImage } from '$lib/utils/imageConverter';
	import * as m from '$lib/paraglide/messages';
	import { toast } from '$lib/stores/toast.svelte';
	import JSZip from 'jszip';

	let queue = $state<QueueItem[]>([]);
	let processing = $state<boolean>(false);

	let activeResultSrc = $state<string>('');
	let activeResultBlob = $state<Blob | null>(null);
	let activeOriginalFile = $state<File | null>(null);

	const originalSize = $derived(activeOriginalFile ? activeOriginalFile.size : 0);
	const resultSize = $derived(activeResultBlob ? activeResultBlob.size : 0);

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
			const blob = await convertImage(item.file, 'image/jpeg');
			item.resultBlob = blob;
			item.status = 'done';

			if (activeOriginalFile === item.file) {
				activeResultBlob = blob;
				activeResultSrc = URL.createObjectURL(blob);
			}
		} catch (err) {
			console.error(`Conversion failed for ${item.file.name}:`, err);
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
			toast.success(m.status_done() + ' ' + m.nav_png_to_jpg());
		} finally {
			processing = false;
		}
	}

	async function handleDownloadZip() {
		const zip = new JSZip();
		const completed = queue.filter((i) => i.resultBlob);
		if (completed.length === 0) return;

		completed.forEach((item) => {
			const fileName = `${item.file.name.replace(/\.[^/.]+$/, '')}.jpg`;
			zip.file(fileName, item.resultBlob!);
		});

		const content = await zip.generateAsync({ type: 'blob' });
		const link = document.createElement('a');
		link.href = URL.createObjectURL(content);
		link.download = `imagera-batch-jpg.zip`;
		link.click();
	}

	function handleDownload() {
		if (queue.length > 1) {
			handleDownloadZip();
		} else if (activeResultBlob && activeOriginalFile) {
			const link = document.createElement('a');
			link.href = activeResultSrc;
			link.download = `converted-${activeOriginalFile.name.replace(/\.[^/.]+$/, '')}.jpg`;
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
	}
</script>

<svelte:head>
	<title>{m.pngtojpg_title()}</title>
	<meta name="description" content={m.pngtojpg_meta()} />
	<meta property="og:title" content={m.pngtojpg_title()} />
	<meta property="og:description" content={m.pngtojpg_meta()} />
</svelte:head>

<ToolPageTemplate title={m.pngtojpg_heading()} description={m.pngtojpg_desc()}>
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
									>{m.pngtojpg_result()}</Text
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
			<div
				class="flex items-center space-x-3 rounded-xl border border-purple-100 bg-purple-50 p-4"
			>
				<div class="rounded-lg bg-purple-100 p-2 text-purple-700">
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
				</div>
				<p class="text-xs leading-tight text-purple-900">
					{m.pngtojpg_note1_start()}
					<strong class="text-purple-700">{m.pngtojpg_note1_bold()}</strong>{m.pngtojpg_note1_end()}
				</p>
			</div>
			<Text tag="p" variant="muted" class="mt-4 text-xs italic">
				{m.pngtojpg_note2()}
			</Text>
		</ToolControls>
	{/snippet}

	{#snippet info()}
		{#if activeOriginalFile}
			<SizeInfo {originalSize} {resultSize} />
		{/if}
	{/snippet}

	{#snippet seoText()}
		<Text tag="h3" variant="headline" weight="bold">{m.pngtojpg_seo_title()}</Text>
		<p>
			{m.pngtojpg_seo_p1()}
		</p>
		<ul>
			<li><strong>{m.pngtojpg_seo_li1_label()}</strong>{m.pngtojpg_seo_li1_desc()}</li>
			<li><strong>{m.pngtojpg_seo_li2_label()}</strong>{m.pngtojpg_seo_li2_desc()}</li>
			<li><strong>{m.pngtojpg_seo_li3_label()}</strong>{m.pngtojpg_seo_li3_desc()}</li>
		</ul>
	{/snippet}
</ToolPageTemplate>
