<script>
  import Button from '../atoms/Button.svelte';

  let { 
    children, 
    onprocess, 
    ondownload, 
    onreset,
    processing = false,
    hasResult = false
  } = $props();
</script>

<div class="bg-white border border-gray-100 rounded-2xl p-6 shadow-xs space-y-6">
  <div class="space-y-4">
    {@render children?.()}
  </div>

  <div class="pt-4 border-t border-gray-100 grid grid-cols-1 gap-3">
    <Button 
      onclick={onprocess} 
      disabled={processing}
      class="w-full"
    >
      {#if processing}
        <span class="mr-2 h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
        Memproses...
      {:else}
        Proses Gambar
      {/if}
    </Button>
    
    {#if hasResult}
      <Button 
        variant="success" 
        onclick={ondownload}
        class="w-full bg-green-600 hover:bg-green-700 text-white"
      >
        Unduh Hasil
      </Button>
    {/if}
    
    <Button 
      variant="ghost" 
      onclick={onreset}
      class="w-full"
    >
      Mulai Ulang
    </Button>
  </div>
</div>
