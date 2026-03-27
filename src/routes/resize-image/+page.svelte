<script lang="ts">
	import ToolPageTemplate from '$lib/components/templates/ToolPageTemplate.svelte';
	import ImageUploader from '$lib/components/molecules/ImageUploader.svelte';
	import ImagePreview from '$lib/components/molecules/ImagePreview.svelte';
	import SizeInfo from '$lib/components/molecules/SizeInfo.svelte';
	import ToolControls from '$lib/components/organisms/ToolControls.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import { resizeImage } from '$lib/utils/imageResize';
	import * as m from '$lib/paraglide/messages';
	import { toast } from '$lib/stores/toast.svelte';

	let selectedFile = $state<File | null>(null);
	let previewSrc = $state<string>('');
	let resultBlob = $state<Blob | null>(null);
	let resultSrc = $state<string>('');
	let width = $state<number>(1200);
	let height = $state<number>(800);
	let maintainRatio = $state<boolean>(true);
	let processing = $state<boolean>(false);
	let originalWidth = $state<number>(0);
	let originalHeight = $state<number>(0);

	const originalSize = $derived(selectedFile ? selectedFile.size : 0);
	const resultSize = $derived(resultBlob ? resultBlob.size : 0);

	function handleUpload(file: File) {
		selectedFile = file;
		const img = new Image();
		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target && typeof e.target.result === 'string') {
				previewSrc = e.target.result;
				img.src = e.target.result;
				img.onload = () => {
					originalWidth = img.width;
					originalHeight = img.height;
					width = img.width;
					height = img.height;
				};
				resultSrc = '';
				resultBlob = null;
			}
		};
		reader.readAsDataURL(file);
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

	async function handleProcess() {
		if (!selectedFile) return;

		processing = true;
		try {
			const blob = await resizeImage(selectedFile, width, height, maintainRatio);
			resultBlob = blob;
			resultSrc = URL.createObjectURL(blob);
			toast.success(m.tool_result() + ' ' + m.nav_resize());
		} catch (err) {
			console.error('Resize failed:', err);
			toast.error(m.resize_err());
		} finally {
			processing = false;
		}
	}

	function handleDownload() {
		if (!resultBlob || !selectedFile) return;
		const link = document.createElement('a');
		link.href = resultSrc;
		link.download = `resized-${selectedFile.name}`;
		link.click();
	}

	function handleReset() {
		selectedFile = null;
		previewSrc = '';
		resultBlob = null;
		resultSrc = '';
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
			{#if !selectedFile}
				<ImageUploader onupload={handleUpload} />
			{:else}
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="space-y-2">
						<Text tag="span" variant="muted" class="text-xs font-bold text-gray-500 uppercase"
							>{m.tool_original()}: {originalWidth}x{originalHeight}</Text
						>
						<ImagePreview src={previewSrc} />
					</div>
					<div class="space-y-2">
						<Text tag="span" variant="muted" class="text-xs font-bold text-blue-600 uppercase"
							>{m.tool_result()}: {width}x{height}</Text
						>
						<ImagePreview src={resultSrc} loading={processing} />
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
			hasResult={!!resultBlob}
		>
			<div class="grid grid-cols-2 gap-4">
				<Input
					label={m.resize_width()}
					type="number"
					bind:value={width}
					oninput={handleWidthChange}
					disabled={!selectedFile || processing}
				/>
				<Input
					label={m.resize_height()}
					type="number"
					bind:value={height}
					oninput={handleHeightChange}
					disabled={!selectedFile || processing}
				/>
			</div>
			<div class="flex items-center space-x-2">
				<input
					id="maintain-ratio"
					type="checkbox"
					bind:checked={maintainRatio}
					class="h-4 w-4 rounded-sm border-gray-300 bg-gray-100 text-blue-600 focus:ring-blue-500"
					disabled={!selectedFile || processing}
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
		{#if selectedFile}
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
