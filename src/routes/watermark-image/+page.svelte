<script lang="ts">
	import ToolPageTemplate from '$lib/components/templates/ToolPageTemplate.svelte';
	import ImageUploader from '$lib/components/molecules/ImageUploader.svelte';
	import ImagePreview from '$lib/components/molecules/ImagePreview.svelte';
	import ToolControls from '$lib/components/organisms/ToolControls.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import Slider from '$lib/components/atoms/Slider.svelte';
	import * as m from '$lib/paraglide/messages';
	import { toast } from '$lib/stores/toast.svelte';

	let selectedFile = $state<File | null>(null);
	let previewSrc = $state<string>('');
	let logoSrc = $state<string>('');
	
	let watermarkType = $state<'text' | 'logo'>('text');
	let watermarkText = $state<string>('Imagera.id');
	let textColor = $state<string>('#ffffff');
	let fontSize = $state<number>(5); // % of width
	let opacity = $state<number>(0.7);
	let position = $state<string>('bottom-right');

	let resultBlob = $state<Blob | null>(null);
	let resultSrc = $state<string>('');
	let processing = $state<boolean>(false);

	const positions = [
		{ id: 'top-left', icon: '↖' }, { id: 'top-center', icon: '↑' }, { id: 'top-right', icon: '↗' },
		{ id: 'middle-left', icon: '←' }, { id: 'middle-center', icon: '·' }, { id: 'middle-right', icon: '→' },
		{ id: 'bottom-left', icon: '↙' }, { id: 'bottom-center', icon: '↓' }, { id: 'bottom-right', icon: '↘' }
	];

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

	function handleLogoUpload(files: File[]) {
		const file = files[0];
		if (!file) return;
		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target && typeof e.target.result === 'string') {
				logoSrc = e.target.result;
			}
		};
		reader.readAsDataURL(file);
	}

	async function applyWatermark(): Promise<Blob> {
		if (!selectedFile || !previewSrc) throw new Error('No image selected');

		const mainImg = new Image();
		mainImg.src = previewSrc;
		await new Promise((resolve) => (mainImg.onload = resolve));

		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		if (!ctx) throw new Error('No 2d context');

		canvas.width = mainImg.width;
		canvas.height = mainImg.height;

		// Draw main image
		ctx.drawImage(mainImg, 0, 0);

		const padding = canvas.width * 0.03; // 3% padding
		let x = 0;
		let y = 0;

		ctx.globalAlpha = opacity;

		if (watermarkType === 'text') {
			const size = (canvas.width * fontSize) / 100;
			ctx.font = `bold ${size}px Inter, sans-serif`;
			ctx.fillStyle = textColor;
			ctx.textBaseline = 'middle';
			
			const metrics = ctx.measureText(watermarkText);
			const textWidth = metrics.width;
			const textHeight = size;

			// Calculate X
			if (position.includes('left')) x = padding;
			else if (position.includes('center')) x = canvas.width / 2 - textWidth / 2;
			else if (position.includes('right')) x = canvas.width - textWidth - padding;

			// Calculate Y
			if (position.includes('top')) y = padding + textHeight / 2;
			else if (position.includes('middle')) y = canvas.height / 2;
			else if (position.includes('bottom')) y = canvas.height - padding - textHeight / 2;

			ctx.fillText(watermarkText, x, y);
		} else if (watermarkType === 'logo' && logoSrc) {
			const logoImg = new Image();
			logoImg.src = logoSrc;
			await new Promise((resolve) => (logoImg.onload = resolve));

			const logoRatio = logoImg.width / logoImg.height;
			const targetWidth = (canvas.width * fontSize * 3) / 100; // Logos need to be a bit bigger
			const targetHeight = targetWidth / logoRatio;

			// Calculate X
			if (position.includes('left')) x = padding;
			else if (position.includes('center')) x = canvas.width / 2 - targetWidth / 2;
			else if (position.includes('right')) x = canvas.width - targetWidth - padding;

			// Calculate Y
			if (position.includes('top')) y = padding;
			else if (position.includes('middle')) y = canvas.height / 2 - targetHeight / 2;
			else if (position.includes('bottom')) y = canvas.height - targetHeight - padding;

			ctx.drawImage(logoImg, x, y, targetWidth, targetHeight);
		}

		const fileType = selectedFile?.type || 'image/jpeg';

		return new Promise((resolve, reject) => {
			canvas.toBlob((blob) => {
				if (blob) resolve(blob);
				else reject(new Error('Canvas is empty'));
			}, fileType, 0.95);
		});
	}

	async function handleProcess() {
		if (!selectedFile) return;
		processing = true;
		try {
			const blob = await applyWatermark();
			resultBlob = blob;
			resultSrc = URL.createObjectURL(blob);
			toast.success(m.tool_result() + ' ' + m.nav_watermark());
		} catch (err) {
			console.error('Watermark failed:', err);
			toast.error(m.watermark_err());
		} finally {
			processing = false;
		}
	}

	function handleDownload() {
		if (!resultBlob || !selectedFile) return;
		const link = document.createElement('a');
		link.href = resultSrc;
		link.download = `watermarked-${selectedFile.name}`;
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
	<title>{m.watermark_title()}</title>
	<meta name="description" content={m.watermark_meta()} />
	<meta property="og:title" content={m.watermark_title()} />
	<meta property="og:description" content={m.watermark_meta()} />
</svelte:head>

<ToolPageTemplate title={m.watermark_heading()} description={m.watermark_desc()}>
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
			{#if selectedFile && !resultSrc}
				<div class="space-y-6">
					<!-- Type Switch -->
					<div class="flex rounded-xl bg-gray-100 p-1">
						<button 
							onclick={() => watermarkType = 'text'}
							class="flex-1 rounded-lg py-2 text-sm font-bold transition-all {watermarkType === 'text' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-500 hover:text-gray-700'}"
						>
							{m.watermark_type_text()}
						</button>
						<button 
							onclick={() => watermarkType = 'logo'}
							class="flex-1 rounded-lg py-2 text-sm font-bold transition-all {watermarkType === 'logo' ? 'bg-white text-blue-600 shadow-xs' : 'text-gray-500 hover:text-gray-700'}"
						>
							{m.watermark_type_logo()}
						</button>
					</div>

					{#if watermarkType === 'text'}
						<div class="space-y-3">
							<input
								type="text"
								bind:value={watermarkText}
								placeholder={m.watermark_text_placeholder()}
								class="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
							/>
							<div class="flex items-center space-x-3">
								<input type="color" bind:value={textColor} class="h-10 w-10 overflow-hidden rounded-lg border-none" />
								<Text variant="muted" class="text-xs">{m.watermark_color()}</Text>
							</div>
						</div>
					{:else}
						<div class="space-y-3">
							{#if !logoSrc}
								<ImageUploader onupload={handleLogoUpload} />
							{:else}
								<div class="flex items-center justify-between rounded-xl border border-gray-200 p-3">
									<img src={logoSrc} alt="Logo" class="h-12 w-12 object-contain" />
									<button onclick={() => logoSrc = ''} class="text-xs font-bold text-rose-500">{m.tool_reset()}</button>
								</div>
							{/if}
						</div>
					{/if}

					<!-- Shared Controls -->
					<div class="space-y-4">
						<div class="grid grid-cols-3 gap-2">
							<p class="col-span-3 text-xs font-bold text-gray-400 uppercase">{m.watermark_position()}</p>
							{#each positions as pos (pos.id)}
								<button
									onclick={() => position = pos.id}
									class="flex h-10 items-center justify-center rounded-lg border text-lg transition-all {position === pos.id ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-400 hover:border-blue-200'}"
								>
									{pos.icon}
								</button>
							{/each}
						</div>

						<div class="space-y-2">
							<div class="flex justify-between">
								<Text variant="muted" class="text-xs font-bold uppercase">{m.watermark_size()}</Text>
								<Text variant="muted" class="text-xs">{fontSize}%</Text>
							</div>
							<Slider bind:value={fontSize} min={1} max={50} />
						</div>

						<div class="space-y-2">
							<div class="flex justify-between">
								<Text variant="muted" class="text-xs font-bold uppercase">{m.watermark_opacity()}</Text>
								<Text variant="muted" class="text-xs">{Math.round(opacity * 100)}%</Text>
							</div>
							<Slider bind:value={opacity} min={0} max={1} step={0.1} />
						</div>
					</div>

					<div class="rounded-xl border border-blue-100 bg-blue-50 p-4">
						<p class="text-xs leading-tight text-blue-900">
							{m.watermark_note()}
						</p>
					</div>
				</div>
			{/if}
		</ToolControls>
	{/snippet}

	{#snippet seoText()}
		<Text tag="h3" variant="headline" weight="bold">{m.watermark_seo_title()}</Text>
		<p>
			{m.watermark_seo_p1()}
		</p>
		<ul>
			<li><strong>{m.watermark_seo_li1_label()}</strong>{m.watermark_seo_li1_desc()}</li>
			<li><strong>{m.watermark_seo_li2_label()}</strong>{m.watermark_seo_li2_desc()}</li>
			<li><strong>{m.watermark_seo_li3_label()}</strong>{m.watermark_seo_li3_desc()}</li>
		</ul>
	{/snippet}
</ToolPageTemplate>
