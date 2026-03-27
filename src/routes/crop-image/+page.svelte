<script lang="ts">
	import Cropper from 'svelte-easy-crop';
	import ToolPageTemplate from '$lib/components/templates/ToolPageTemplate.svelte';
	import ImageUploader from '$lib/components/molecules/ImageUploader.svelte';
	import ToolControls from '$lib/components/organisms/ToolControls.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import * as m from '$lib/paraglide/messages';
	import { toast } from '$lib/stores/toast.svelte';
	import { fade } from 'svelte/transition';

	let selectedFile = $state<File | null>(null);
	let imageSrc = $state<string>('');
	let crop = $state({ x: 0, y: 0 });
	let zoom = $state(1);
	let aspect = $state<number | undefined>(1); // Default 1:1
	let pixelCrop = $state<{ x: number; y: number; width: number; height: number } | null>(null);
	let resultBlob = $state<Blob | null>(null);
	let resultSrc = $state<string>('');
	let processing = $state<boolean>(false);

	const aspectOptions = [
		{ label: '1:1', value: 1 },
		{ label: '4:3', value: 4 / 3 },
		{ label: '16:9', value: 16 / 9 },
		{ label: '3:2', value: 3 / 2 },
		{ label: m.crop_ratio_free(), value: null }
	];

	function handleUpload(files: File[]) {
		const file = files[0];
		if (!file) return;
		selectedFile = file;
		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target && typeof e.target.result === 'string') {
				imageSrc = e.target.result;
				resultSrc = '';
				resultBlob = null;
			}
		};
		reader.readAsDataURL(file);
	}

	interface CropDetail {
		pixels: {
			x: number;
			y: number;
			width: number;
			height: number;
		};
	}

	function onCropComplete(e: CustomEvent<CropDetail>) {
		pixelCrop = e.detail.pixels;
	}

	async function getCroppedImg(imageSrc: string, pixelCrop: { x: number; y: number; width: number; height: number }): Promise<Blob> {
		const image = new Image();
		image.src = imageSrc;
		await new Promise((resolve) => (image.onload = resolve));

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');

		if (!ctx) throw new Error('No 2d context');

		canvas.width = pixelCrop.width;
		canvas.height = pixelCrop.height;

		ctx.drawImage(
			image,
			pixelCrop.x,
			pixelCrop.y,
			pixelCrop.width,
			pixelCrop.height,
			0,
			0,
			pixelCrop.width,
			pixelCrop.height
		);

		return new Promise((resolve, reject) => {
			canvas.toBlob((blob) => {
				if (blob) resolve(blob);
				else reject(new Error('Canvas is empty'));
			}, selectedFile?.type || 'image/jpeg');
		});
	}

	async function handleProcess() {
		if (!imageSrc || !pixelCrop) return;

		processing = true;
		try {
			const blob = await getCroppedImg(imageSrc, pixelCrop);
			resultBlob = blob;
			resultSrc = URL.createObjectURL(blob);
			toast.success(m.tool_result() + ' ' + m.nav_crop());
		} catch (err) {
			console.error('Crop failed:', err);
			toast.error(m.crop_err());
		} finally {
			processing = false;
		}
	}

	function handleDownload() {
		if (!resultBlob || !selectedFile) return;
		const link = document.createElement('a');
		link.href = resultSrc;
		const ext = selectedFile.type.split('/')[1] || 'jpg';
		link.download = `cropped-${selectedFile.name.replace(/\.[^/.]+$/, '')}.${ext}`;
		link.click();
	}

	function handleReset() {
		selectedFile = null;
		imageSrc = '';
		resultBlob = null;
		resultSrc = '';
		crop = { x: 0, y: 0 };
		zoom = 1;
	}
</script>

<svelte:head>
	<title>{m.crop_title()}</title>
	<meta name="description" content={m.crop_meta()} />
	<meta property="og:title" content={m.crop_title()} />
	<meta property="og:description" content={m.crop_meta()} />
</svelte:head>

<ToolPageTemplate title={m.crop_heading()} description={m.crop_desc()}>
	{#snippet preview()}
		<div class="relative h-[400px] w-full overflow-hidden rounded-3xl bg-gray-100 md:h-[500px]">
			{#if !selectedFile}
				<div class="flex h-full items-center justify-center p-8">
					<ImageUploader onupload={handleUpload} />
				</div>
			{:else if resultSrc && !processing}
				<div
					class="flex h-full flex-col items-center justify-center p-4"
					transition:fade={{ duration: 200 }}
				>
					<div class="mb-4 flex items-center space-x-2">
						<span class="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
						<Text tag="span" variant="muted" class="text-xs font-bold text-green-600 uppercase"
							>{m.tool_result()}</Text
						>
					</div>
					<div class="relative max-h-full overflow-hidden rounded-2xl shadow-xl">
						<img src={resultSrc} alt="Cropped result" class="max-h-[350px] object-contain" />
					</div>
					<button
						onclick={() => (resultSrc = '')}
						class="mt-4 text-sm font-semibold text-blue-600 hover:text-blue-700"
					>
						← Kembali Edit
					</button>
				</div>
			{:else}
				<div class="relative h-full w-full">
					<Cropper
						image={imageSrc}
						bind:crop
						bind:zoom
						{aspect}
						{...{ 'on:cropcomplete': onCropComplete }}
					/>
				</div>
			{/if}

			{#if processing}
				<div
					class="absolute inset-0 z-10 flex items-center justify-center bg-white/60 backdrop-blur-xs"
				>
					<div class="flex flex-col items-center">
						<div
							class="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"
						></div>
						<Text tag="p" class="mt-4 font-semibold text-blue-600">{m.tool_processing()}</Text>
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
			{#if selectedFile && !resultSrc}
				<div class="space-y-6">
					<div class="space-y-3">
						<p class="text-sm font-semibold tracking-tight text-gray-700">
							{m.crop_ratio()}
						</p>
						<div class="grid grid-cols-3 gap-2">
							{#each aspectOptions as opt (opt.label)}
								<button
									onclick={() => (aspect = opt.value ?? undefined)}
									class="rounded-xl border py-2 text-xs font-bold transition-all {aspect ===
									opt.value
										? 'border-blue-600 bg-blue-50 text-blue-600'
										: 'border-gray-200 bg-white text-gray-600 hover:border-blue-200 hover:bg-blue-50/30'}"
								>
									{opt.label}
								</button>
							{/each}
						</div>
					</div>

					<div class="rounded-xl border border-blue-100 bg-blue-50 p-4">
						<p class="text-xs leading-tight text-blue-900">
							{m.crop_note()}
						</p>
					</div>
				</div>
			{/if}
		</ToolControls>
	{/snippet}

	{#snippet seoText()}
		<Text tag="h3" variant="headline" weight="bold">{m.crop_seo_title()}</Text>
		<p>
			{m.crop_seo_p1()}
		</p>
		<ul>
			<li><strong>{m.crop_seo_li1_label()}</strong>{m.crop_seo_li1_desc()}</li>
			<li><strong>{m.crop_seo_li2_label()}</strong>{m.crop_seo_li2_desc()}</li>
			<li><strong>{m.crop_seo_li3_label()}</strong>{m.crop_seo_li3_desc()}</li>
		</ul>
	{/snippet}
</ToolPageTemplate>
