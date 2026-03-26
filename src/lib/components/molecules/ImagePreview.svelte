<script>
  let { src, alt = 'Pratinjau Gambar', loading = false } = $props();
</script>

<div class="relative w-full aspect-square bg-gray-50 border border-gray-100 rounded-2xl overflow-hidden flex items-center justify-center p-4">
  {#if src}
    <img 
      {src} 
      {alt} 
      class="max-w-full max-h-full object-contain shadow-lg rounded-lg transition-opacity duration-300 {loading ? 'opacity-50' : 'opacity-100'}" 
    />
    
    {#if loading}
      <div class="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-xs">
        <div class="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    {/if}
  {:else}
    <div class="text-center space-y-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-gray-300 mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
      </svg>
      <p class="text-gray-400 text-sm">Belum ada gambar terpilih</p>
    </div>
  {/if}
</div>
