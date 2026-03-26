<script>
  let { originalSize = 0, resultSize = 0 } = $props();

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  const savings = $derived(
    originalSize > 0 && resultSize > 0 
      ? Math.round(((originalSize - resultSize) / originalSize) * 100) 
      : 0
  );
</script>

<div class="grid grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
  <div class="flex flex-col">
    <span class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Ukuran Asli</span>
    <span class="text-lg font-semibold text-gray-900">{formatBytes(originalSize)}</span>
  </div>
  <div class="flex flex-col">
    <span class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Hasil Kompresi</span>
    <span class="text-lg font-semibold text-blue-600">{formatBytes(resultSize)}</span>
  </div>
  {#if savings > 0}
    <div class="flex flex-col col-span-2 lg:col-span-1">
      <span class="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Hemat</span>
      <span class="text-lg font-semibold text-green-600">-{savings}%</span>
    </div>
  {/if}
</div>
