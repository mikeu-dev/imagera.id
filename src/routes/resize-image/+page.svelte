<script lang="ts">
	import ToolPageTemplate from '$lib/components/templates/ToolPageTemplate.svelte';
	import ImageUploader from '$lib/components/molecules/ImageUploader.svelte';
	import ImagePreview from '$lib/components/molecules/ImagePreview.svelte';
	import SizeInfo from '$lib/components/molecules/SizeInfo.svelte';
	import ToolControls from '$lib/components/organisms/ToolControls.svelte';
	import Input from '$lib/components/atoms/Input.svelte';
	import Text from '$lib/components/atoms/Text.svelte';
	import { resizeImage } from '$lib/utils/imageResize';

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
		} catch (err) {
			console.error('Resize failed:', err);
			alert('Gagal mengubah ukuran gambar. Silakan coba lagi.');
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
	<title>Ubah Ukuran Gambar Online - Cepat & Aman | Imagera.id</title>
	<meta
		name="description"
		content="Ubah dimensi lebar dan tinggi gambar Anda secara instan. Menjaga rasio aspek dengan mudah. 100% aman dan berjalan di browser."
	/>
</svelte:head>

<ToolPageTemplate
	title="Ubah Ukuran Gambar"
	description="Ubah resolusi lebar dan tinggi gambar Anda sesuai kebutuhan secara akurat."
>
	{#snippet preview()}
		<div class="space-y-6">
			{#if !selectedFile}
				<ImageUploader onupload={handleUpload} />
			{:else}
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div class="space-y-2">
						<Text tag="span" variant="muted" class="text-xs font-bold text-gray-500 uppercase"
							>Asli: {originalWidth}x{originalHeight}</Text
						>
						<ImagePreview src={previewSrc} />
					</div>
					<div class="space-y-2">
						<Text tag="span" variant="muted" class="text-xs font-bold text-blue-600 uppercase"
							>Hasil: {width}x{height}</Text
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
					label="Lebar (px)"
					type="number"
					bind:value={width}
					oninput={handleWidthChange}
					disabled={!selectedFile || processing}
				/>
				<Input
					label="Tinggi (px)"
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
					>Jaga Rasio Aspek</label
				>
			</div>
			<Text tag="p" variant="muted" class="text-xs italic">
				Dimensi yang lebih besar akan menambah ukuran file dan dapat mengurangi ketajaman.
			</Text>
		</ToolControls>
	{/snippet}

	{#snippet info()}
		{#if selectedFile}
			<SizeInfo {originalSize} {resultSize} />
		{/if}
	{/snippet}

	{#snippet seoText()}
		<Text tag="h3" variant="headline" weight="bold">Cara mengubah ukuran gambar dengan cepat</Text>
		<p>
			Gunakan pengukur dimensi gambar kami untuk mengubah resolusi foto Anda tanpa perlu mengunduh
			aplikasi khusus. Berikut keunggulannya:
		</p>
		<ul>
			<li>
				<strong>Akurat:</strong> Tentukan lebar (width) dan tinggi (height) secara presisi dengan pixel.
			</li>
			<li>
				<strong>Rasio Aspek:</strong> Jaga proporsi gambar asli agar tidak terlihat gepeng atau melar.
			</li>
			<li>
				<strong>Canvas API:</strong> Proses perubahan ukuran dilakukan dengan algoritma perataan browser
				untuk hasil terbaik.
			</li>
		</ul>
	{/snippet}
</ToolPageTemplate>
