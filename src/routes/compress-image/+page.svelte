<script lang="ts">
	import ToolPageTemplate from '$lib/components/templates/ToolPageTemplate.svelte';
	import ImageUploader from '$lib/components/molecules/ImageUploader.svelte';
	import ImagePreview from '$lib/components/molecules/ImagePreview.svelte';
	import SizeInfo from '$lib/components/molecules/SizeInfo.svelte';
	import ToolControls from '$lib/components/organisms/ToolControls.svelte';
	import Slider from '$lib/components/atoms/Slider.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import { compressImage } from '$lib/utils/imageCompression';
	import * as m from '$lib/paraglide/messages';
	import { toast } from '$lib/stores/toast.svelte';

	let selectedFile = $state<File | null>(null);
	let previewSrc = $state<string>('');
	let resultBlob = $state<Blob | null>(null);
	let resultSrc = $state<string>('');
	let quality = $state<number>(80);
	let processing = $state<boolean>(false);

	const originalSize = $derived(selectedFile ? selectedFile.size : 0);
	const resultSize = $derived(resultBlob ? resultBlob.size : 0);

	function handleUpload(file: File) {
		selectedFile = file;
		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target && typeof e.target.result === 'string') {
				previewSrc = e.target.result;
				resultSrc = '';
				resultBlob = null;
			}
		};
		reader.readAsDataURL(file);
	}

	async function handleProcess() {
		if (!selectedFile) return;

		processing = true;
		try {
			const blob = await compressImage(selectedFile, quality / 100);
			resultBlob = blob;
			resultSrc = URL.createObjectURL(blob);
			toast.success(m.tool_result() + ' ' + m.nav_compress());
		} catch (err) {
			console.error('Compression failed:', err);
			toast.error(m.compress_err());
		} finally {
			processing = false;
		}
	}

	function handleDownload() {
		if (!resultBlob || !selectedFile) return;
		const link = document.createElement('a');
		link.href = resultSrc;
		link.download = `compressed-${selectedFile.name.replace(/\.[^/.]+$/, '')}.jpg`;
		link.click();
	}

	function handleReset() {
		selectedFile = null;
		previewSrc = '';
		resultBlob = null;
		resultSrc = '';
		quality = 80;
	}
</script>

<svelte:head>
	<title>{m.compress_title()}</title>
	<meta name="description" content={m.compress_meta()} />
	<meta property="og:title" content={m.compress_title()} />
	<meta property="og:description" content={m.compress_meta()} />
</svelte:head>

<ToolPageTemplate title={m.compress_heading()} description={m.compress_desc()}>
	{#snippet preview()}
		<div class="space-y-6">
			{#if !selectedFile}
				<ImageUploader onupload={handleUpload} />
			{:else}
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="space-y-2">
						<Text tag="span" variant="muted" class="text-xs font-bold uppercase"
							>{m.tool_original()}</Text
						>
						<ImagePreview src={previewSrc} />
					</div>
					<div class="space-y-2">
						<Text tag="span" variant="muted" class="text-xs font-bold text-blue-600 uppercase"
							>{m.tool_result()}</Text
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
			<Slider
				label={m.compress_quality()}
				bind:value={quality}
				min={1}
				max={100}
				disabled={!selectedFile || processing}
			/>
			<Text tag="p" variant="muted" class="text-xs italic">
				{m.compress_note()}
			</Text>
		</ToolControls>
	{/snippet}

	{#snippet info()}
		{#if selectedFile}
			<SizeInfo {originalSize} {resultSize} />
		{/if}
	{/snippet}

	{#snippet seoText()}
		<Text tag="h3" variant="headline" weight="bold">{m.compress_seo_title()}</Text>
		<p>
			{m.compress_seo_p1()}
		</p>
		<ul>
			<li><strong>{m.compress_seo_li1_label()}</strong>{m.compress_seo_li1_desc()}</li>
			<li><strong>{m.compress_seo_li2_label()}</strong>{m.compress_seo_li2_desc()}</li>
			<li><strong>{m.compress_seo_li3_label()}</strong>{m.compress_seo_li3_desc()}</li>
		</ul>
	{/snippet}
</ToolPageTemplate>
