<script lang="ts">
  let { 
    onchange, 
    id = '', 
    accept = 'image/*', 
    multiple = false, 
    disabled = false, 
    ...props 
  }: {
    onchange?: (e: Event & { target: HTMLInputElement }) => void;
    id?: string;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    [key: string]: unknown;
  } = $props();

  const handleFileChange = (e: Event) => {
    if (onchange) {
      onchange(e as Event & { target: HTMLInputElement });
    }
  };
</script>

<div class="relative w-full">
  <input
    {id}
    type="file"
    {accept}
    {multiple}
    {disabled}
    class="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer disabled:cursor-not-allowed"
    onchange={handleFileChange}
    {...props}
  />
  <div class="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center transition-all hover:border-blue-400 hover:bg-blue-50/50 group">
    <div class="flex flex-col items-center justify-center space-y-4">
      <div class="p-4 bg-blue-100/50 rounded-full group-hover:scale-110 transition-transform">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
        </svg>
      </div>
      <div class="text-sm font-medium text-gray-700">
        Pilih gambar atau seret ke sini
      </div>
      <div class="text-xs text-gray-400">
        Mendukung format JPG, PNG, WEBP (Maks. 10MB)
      </div>
    </div>
  </div>
</div>
