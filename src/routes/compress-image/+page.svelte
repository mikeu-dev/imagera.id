<script lang="ts">
  import ToolPageTemplate from '$lib/components/templates/ToolPageTemplate.svelte';
  import ImageUploader from '$lib/components/molecules/ImageUploader.svelte';
  import ImagePreview from '$lib/components/molecules/ImagePreview.svelte';
  import SizeInfo from '$lib/components/molecules/SizeInfo.svelte';
  import ToolControls from '$lib/components/organisms/ToolControls.svelte';
  import Slider from '$lib/components/atoms/Slider.svelte';
  import Text from '$lib/components/atoms/Text.svelte';
  import { compressImage } from '$lib/utils/imageCompression';

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
    } catch (err) {
      console.error('Compression failed:', err);
      alert('Gagal mengompres gambar. Silakan coba lagi.');
    } finally {
      processing = false;
    }
  }

  function handleDownload() {
    if (!resultBlob || !selectedFile) return;
    const link = document.createElement('a');
    link.href = resultSrc;
    link.download = `compressed-${selectedFile.name.replace(/\.[^/.]+$/, "")}.jpg`;
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
  <title>Kompres Gambar Online - Cepat & Aman | Imagera.id</title>
  <meta name="description" content="Kurangi ukuran file gambar JPG, PNG, atau WEBP Anda tanpa kehilangan kualitas secara signifikan. 100% aman dan berjalan di browser." />
</svelte:head>

<ToolPageTemplate
  title="Kompres Gambar"
  description="Kurangi ukuran file gambar Anda dengan mengatur kualitas kompresi secara instan."
>
  {#snippet preview()}
    <div class="space-y-6">
      {#if !selectedFile}
        <ImageUploader onupload={handleUpload} />
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Text tag="span" variant="muted" class="text-xs uppercase font-bold">Asli</Text>
            <ImagePreview src={previewSrc} />
          </div>
          <div class="space-y-2">
            <Text tag="span" variant="muted" class="text-xs uppercase font-bold text-blue-600">Hasil</Text>
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
      processing={processing}
      hasResult={!!resultBlob}
    >
      <Slider 
        label="Kualitas Kompresi" 
        bind:value={quality} 
        min={1} 
        max={100} 
        disabled={!selectedFile || processing}
      />
      <Text tag="p" variant="muted" class="text-xs italic">
        Kualitas lebih rendah menghasilkan ukuran file yang lebih kecil tetapi detail gambar berkurang.
      </Text>
    </ToolControls>
  {/snippet}

  {#snippet info()}
    {#if selectedFile}
      <SizeInfo {originalSize} {resultSize} />
    {/if}
  {/snippet}

  {#snippet seoText()}
    <Text tag="h3" variant="headline" weight="bold">Mengapa menggunakan alat kompresi kami?</Text>
    <p>Alat kompresi gambar kami menggunakan teknologi Canvas API browser modern untuk memproses file Anda secara lokal. Ini berarti gambar Anda tidak pernah diunggah ke server manapun, menjamin privasi data Anda 100%.</p>
    <ul>
      <li><strong>Privasi Penuh:</strong> Data Anda tetap di perangkat Anda.</li>
      <li><strong>Kecepatan Instan:</strong> Tidak ada waktu tunggu upload/download dari server.</li>
      <li><strong>Pratinjau Langsung:</strong> Lihat perbedaan kualitas sebelum mengunduh hasil.</li>
    </ul>
  {/snippet}
</ToolPageTemplate>
