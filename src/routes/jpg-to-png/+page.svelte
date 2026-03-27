<script lang="ts">
	import ToolPageTemplate from '$lib/components/templates/ToolPageTemplate.svelte';
	import ImageUploader from '$lib/components/molecules/ImageUploader.svelte';
	import ImagePreview from '$lib/components/molecules/ImagePreview.svelte';
	import SizeInfo from '$lib/components/molecules/SizeInfo.svelte';
	import ToolControls from '$lib/components/organisms/ToolControls.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import { convertImage } from '$lib/utils/imageConverter';
	import * as m from '$lib/paraglide/messages';
	import { toast } from '$lib/stores/toast.svelte';

	let selectedFile = $state<File | null>(null);
	let previewSrc = $state<string>('');
	let resultBlob = $state<Blob | null>(null);
	let resultSrc = $state<string>('');
	let processing = $state<boolean>(false);

	const originalSize = $derived(selectedFile ? selectedFile.size : 0);
	const resultSize = $derived(resultBlob ? resultBlob.size : 0);

	function handleUpload(files: File[]) {
		const file = files[0];
		if (!file) return;
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
			const blob = await convertImage(selectedFile, 'image/png');
			resultBlob = blob;
			resultSrc = URL.createObjectURL(blob);
			toast.success(m.tool_result() + ' PNG');
		} catch (err) {
			console.error('PNG conversion failed:', err);
			toast.error(m.jpgtopng_err());
		} finally {
			processing = false;
		}
	}

	function handleDownload() {
		if (!resultBlob || !selectedFile) return;
		const link = document.createElement('a');
		link.href = resultSrc;
		link.download = `converted-${selectedFile.name.replace(/\.[^/.]+$/, '')}.png`;
		link.click();
	}

	function handleReset() {
		selectedFile = null;
		previewSrc = '';
		resultBlob = null;
		resultSrc = '';
	}
</script>

<svelte:head>
	<title>{m.jpgtopng_title()}</title>
	<meta name="description" content={m.jpgtopng_meta()} />
	<meta property="og:title" content={m.jpgtopng_title()} />
	<meta property="og:description" content={m.jpgtopng_meta()} />
</svelte:head>

<ToolPageTemplate title={m.jpgtopng_heading()} description={m.jpgtopng_desc()}>
	{#snippet preview()}
		<div class="space-y-6">
			{#if !selectedFile}
				<ImageUploader onupload={handleUpload} />
			{:else}
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="space-y-2">
						<Text tag="span" variant="muted" class="text-xs font-bold text-blue-600 uppercase"
							>{m.tool_original()}</Text
						>
						<ImagePreview src={previewSrc} />
					</div>
					<div class="space-y-2">
						<Text tag="span" variant="muted" class="text-xs font-bold text-green-600 uppercase"
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
			<div class="flex items-center space-x-3 rounded-xl border border-blue-100 bg-blue-50 p-4">
				<div class="rounded-lg bg-blue-100 p-2 text-blue-700">
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/></svg
					>
				</div>
				<p class="text-xs leading-tight text-blue-900">
					{m.jpgtopng_note()}
				</p>
			</div>
		</ToolControls>
	{/snippet}

	{#snippet info()}
		{#if selectedFile}
			<SizeInfo {originalSize} {resultSize} />
		{/if}
	{/snippet}

	{#snippet seoText()}
		<Text tag="h3" variant="headline" weight="bold">{m.jpgtopng_seo_title()}</Text>
		<p>
			{m.jpgtopng_seo_p1()}
		</p>
		<ul>
			<li><strong>{m.jpgtopng_seo_li1_label()}</strong>{m.jpgtopng_seo_li1_desc()}</li>
			<li><strong>{m.jpgtopng_seo_li2_label()}</strong>{m.jpgtopng_seo_li2_desc()}</li>
			<li><strong>{m.jpgtopng_seo_li3_label()}</strong>{m.jpgtopng_seo_li3_desc()}</li>
		</ul>
	{/snippet}
</ToolPageTemplate>
