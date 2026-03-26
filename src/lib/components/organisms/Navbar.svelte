<script lang="ts">
  import Text from '../atoms/Text.svelte';
  import { localizeHref as i } from '$lib/paraglide/runtime';
</script>

<nav class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <div class="shrink-0 flex items-center">
        <a href={i('/')} class="flex items-center space-x-2 group">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-md shadow-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
          </div>
          <Text tag="span" weight="bold" class="text-xl tracking-tighter text-gray-900 group-hover:text-blue-600 transition-colors">
            Imagera.id
          </Text>
        </a>
      </div>
      
      <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
        <a href={i('/')} class="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors">Beranda</a>
        <div class="relative group">
          <button class="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors flex items-center">
            Peralatan
            <svg class="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div class="absolute right-0 w-48 mt-2 py-2 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right group-hover:scale-100 scale-95">
            <a href={i('/compress-image')} class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Kompres Gambar</a>
            <a href={i('/resize-image')} class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">Ubah Ukuran</a>
            <a href={i('/png-to-jpg')} class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">PNG ke JPG</a>
          </div>
        </div>
      </div>

      <div class="flex items-center space-x-4">
        <a href={i('/compress-image')} class="hidden md:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:scale-95">
          Coba Gratis
        </a>
        <button 
          class="sm:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg"
          aria-label="Buka Menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
      </div>
    </div>
  </div>
</nav>
