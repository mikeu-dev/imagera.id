<script lang="ts">
	import ToolPageTemplate from '$lib/components/templates/ToolPageTemplate.svelte';
	import ImageUploader from '$lib/components/molecules/ImageUploader.svelte';
	import ImagePreview from '$lib/components/molecules/ImagePreview.svelte';
	import SizeInfo from '$lib/components/molecules/SizeInfo.svelte';
	import ToolControls from '$lib/components/organisms/ToolControls.svelte';
	import QueueList, { type QueueItem } from '$lib/components/organisms/QueueList.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import { resizeImage } from '$lib/utils/imageResize';
	import * as m from '$lib/paraglide/messages';
	import { toast } from '$lib/stores/toast.svelte';
	import JSZip from 'jszip';

	let queue = $state<QueueItem[]>([]);
	let width = $state<number>(1200);
	let height = $state<number>(800);
	let maintainRatio = $state<boolean>(true);
	let processing = $state<boolean>(false);

	let activeResultSrc = $state<string>('');
	let activeResultBlob = $state<Blob | null>(null);
	let activeOriginalFile = $state<File | null>(null);
	let originalWidth = $state<number>(0);
	let originalHeight = $state<number>(0);

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
			setActiveFile(files[0]);
		}
	}

	function setActiveFile(file: File) {
		activeOriginalFile = file;
		const img = new Image();
		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target && typeof e.target.result === 'string') {
				img.src = e.target.result;
				img.onload = () => {
					originalWidth = img.width;
					originalHeight = img.height;
					// Update default width/height based on first file
					if (queue.length <= filesPerUpload(file)) {
						width = img.width;
						height = img.height;
					}
				};
			}
		};
		reader.readAsDataURL(file);
	}

	// Helper to check if it's the first upload batch
	function filesPerUpload(file: File) {
		return queue.filter((i) => i.file === file).length;
	}

	function handleWidthChange() {
		if (maintainRatio && originalWidth > 0) {
			height = Math.round((width / originalWidth) * originalHeight);
		}
	}

	function handleHeightChange() {
		if (maintainRatio && originalHeight > 0) {
			width = Math.round((height / originalHeight) * originalWidth);
		}
	}

	async function processItem(item: QueueItem) {
		item.status = 'processing';
		try {
			const blob = await resizeImage(item.file, width, height, maintainRatio);
			item.resultBlob = blob;
			item.status = 'done';

			if (activeOriginalFile === item.file) {
				activeResultBlob = blob;
				activeResultSrc = URL.createObjectURL(blob);
			}
		} catch (err) {
			console.error(`Resize failed for ${item.file.name}:`, err);
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
			toast.success(m.status_done() + ' ' + m.nav_resize());
		} finally {
			processing = false;
		}
	}

	async function handleDownloadZip() {
		const zip = new JSZip();
		const completed = queue.filter((i) => i.resultBlob);
		if (completed.length === 0) return;

		completed.forEach((item) => {
			zip.file(`resized-${item.file.name}`, item.resultBlob!);
		});

		const content = await zip.generateAsync({ type: 'blob' });
		const link = document.createElement('a');
		link.href = URL.createObjectURL(content);
		link.download = `imagera-batch-resized.zip`;
		link.click();
	}

	function handleDownload() {
		if (queue.length > 1) {
			handleDownloadZip();
		} else if (activeResultBlob && activeOriginalFile) {
			const link = document.createElement('a');
			link.href = activeResultSrc;
			link.download = `resized-${activeOriginalFile.name}`;
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
		width = 1200;
		height = 800;
		originalWidth = 0;
		originalHeight = 0;
	}
</script>

<svelte:head>
	<title>{m.resize_title()}</title>
	<meta name="description" content={m.resize_meta()} />
	<meta property="og:title" content={m.resize_title()} />
	<meta property="og:description" content={m.resize_meta()} />
</svelte:head>

<ToolPageTemplate title={m.resize_heading()} description={m.resize_desc()}>
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
			<div class="grid grid-cols-2 gap-4">
				<Input
					label={m.resize_width()}
					type="number"
					bind:value={width}
					oninput={handleWidthChange}
					disabled={queue.length === 0 || processing}
				/>
				<Input
					label={m.resize_height()}
					type="number"
					bind:value={height}
					oninput={handleHeightChange}
					disabled={queue.length === 0 || processing}
				/>
			</div>
			<div class="flex items-center space-x-2">
				<input
					id="maintain-ratio"
					type="checkbox"
					bind:checked={maintainRatio}
					class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
					disabled={queue.length === 0 || processing}
				/>
				<label for="maintain-ratio" class="cursor-pointer text-sm font-medium text-gray-700"
					>{m.resize_maintain()}</label
				>
			</div>
			<Text tag="p" variant="muted" class="text-xs italic">
				{m.resize_note()}
			</Text>
		</ToolControls>
	{/snippet}

	{#snippet info()}
		{#if activeOriginalFile}
			<SizeInfo {originalSize} {resultSize} />
		{/if}
	{/snippet}

	{#snippet seoText()}
		<Text tag="h3" variant="headline" weight="bold">{m.resize_seo_title()}</Text>
		<p>
			{m.resize_seo_p1()}
		</p>
		<ul>
			<li><strong>{m.resize_seo_li1_label()}</strong>{m.resize_seo_li1_desc()}</li>
			<li><strong>{m.resize_seo_li2_label()}</strong>{m.resize_seo_li2_desc()}</li>
			<li><strong>{m.resize_seo_li3_label()}</strong>{m.resize_seo_li3_desc()}</li>
		</ul>
	{/snippet}
</ToolPageTemplate>
