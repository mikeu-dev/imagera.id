<script lang="ts">
  import ToolPageTemplate from '$lib/components/templates/ToolPageTemplate.svelte';
  import ImageUploader from '$lib/components/molecules/ImageUploader.svelte';
  import ImagePreview from '$lib/components/molecules/ImagePreview.svelte';
  import SizeInfo from '$lib/components/molecules/SizeInfo.svelte';
  import ToolControls from '$lib/components/organisms/ToolControls.svelte';
  import Text from '$lib/components/atoms/Text.svelte';
  import { convertImage } from '$lib/utils/imageConverter';

  let selectedFile = $state<File | null>(null);
  let previewSrc = $state<string>('');
  let resultBlob = $state<Blob | null>(null);
  let resultSrc = $state<string>('');
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
      const blob = await convertImage(selectedFile, 'image/jpeg');
      resultBlob = blob;
      resultSrc = URL.createObjectURL(blob);
    } catch (err) {
      console.error('Conversion failed:', err);
      alert('Gagal mengonversi gambar. Silakan coba lagi.');
    } finally {
      processing = false;
    }
  }

  function handleDownload() {
    if (!resultBlob || !selectedFile) return;
    const link = document.createElement('a');
    link.href = resultSrc;
    link.download = `converted-${selectedFile.name.replace(/\.[^/.]+$/, "")}.jpg`;
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
  <title>PNG ke JPG Online - Konversi Gratis & Aman | Imagera.id</title>
  <meta name="description" content="Konversi file PNG Anda ke JPG dengan latar belakang putih secara instan. 100% aman dan berjalan di browser. Gratis tanpa batas." />
</svelte:head>

<ToolPageTemplate
  title="Konversi PNG ke JPG"
  description="Ubah file PNG transparan menjadi JPG berkualitas tinggi dengan latar belakang putih."
>
  {#snippet preview()}
    <div class="space-y-6">
      {#if !selectedFile}
        <ImageUploader onupload={handleUpload} />
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="space-y-2">
            <Text tag="span" variant="muted" class="text-xs uppercase font-bold text-purple-600">PNG Asli</Text>
            <ImagePreview src={previewSrc} />
          </div>
          <div class="space-y-2">
            <Text tag="span" variant="muted" class="text-xs uppercase font-bold text-blue-600">Hasil JPG</Text>
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
      <div class="p-4 bg-purple-50 rounded-xl border border-purple-100 flex items-center space-x-3">
        <div class="p-2 bg-purple-100 rounded-lg text-purple-700">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <p class="text-xs text-purple-900 leading-tight">
          Latar belakang transparan pada file PNG Anda akan secara otomatis ditutup dengan warna <strong>Putih</strong>.
        </p>
      </div>
      <Text tag="p" variant="muted" class="text-xs italic mt-4">
        Format JPG tidak mendukung transparansi, sehingga area transparan akan berubah menjadi solid.
      </Text>
    </ToolControls>
  {/snippet}

  {#snippet info()}
    {#if selectedFile}
      <SizeInfo {originalSize} {resultSize} />
    {/if}
  {/snippet}

  {#snippet seoText()}
    <Text tag="h3" variant="headline" weight="bold">Kenapa konversi diperlukan?</Text>
    <p>File PNG seringkali memiliki ukuran yang jauh lebih besar karena resolusi dan data transparansi (alpha channel). Konversi ke JPG sangat disarankan untuk penggunaan di website atau blog guna mempercepat loading halaman.</p>
    <ul>
      <li><strong>Efisiensi:</strong> Ukuran file JPG lebih optimal untuk optimasi SEO.</li>
      <li><strong>Kompatibilitas:</strong> JPG didukung oleh hampir semua aplikasi pembaca berita dan email.</li>
      <li><strong>Tanpa Server:</strong> Konversi dilakukan secara instan di sisi klien.</li>
    </ul>
  {/snippet}
</ToolPageTemplate>
