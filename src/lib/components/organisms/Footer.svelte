<script>
  import Text from '../atoms/Text.svelte';
</script>

<footer class="bg-gray-50 border-t border-gray-100 py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
      <div class="col-span-2 space-y-4">
        <a href="/" class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
          </div>
          <Text tag="span" weight="bold" class="text-xl tracking-tighter text-gray-900">
            Imagera.id
          </Text>
        </a>
        <Text tag="p" variant="body" class="max-w-xs">
          Solusi pengolahan gambar cepat, aman, dan 100% di browser Anda. Tanpa server, tanpa kompromi privasi.
        </Text>
      </div>

      <div>
        <Text tag="h4" variant="headline" weight="bold" class="mb-4">Peralatannya</Text>
        <ul class="space-y-2">
          <li><a href="/compress-image" class="text-sm text-gray-500 hover:text-blue-600 transition-colors">Kompres Gambar</a></li>
          <li><a href="/resize-image" class="text-sm text-gray-500 hover:text-blue-600 transition-colors">Ubah Ukuran</a></li>
          <li><a href="/png-to-jpg" class="text-sm text-gray-500 hover:text-blue-600 transition-colors">PNG ke JPG</a></li>
        </ul>
      </div>

      <div>
        <Text tag="h4" variant="headline" weight="bold" class="mb-4">Informasi</Text>
        <ul class="space-y-2">
          <li><a href="/" class="text-sm text-gray-500 hover:text-blue-600 transition-colors">Tentang Kami</a></li>
          <li><a href="/" class="text-sm text-gray-500 hover:text-blue-600 transition-colors">Kebijakan Privasi</a></li>
          <li><a href="/" class="text-sm text-gray-500 hover:text-blue-600 transition-colors">Syarat Penggunaan</a></li>
        </ul>
      </div>
    </div>
    
    <div class="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-sm text-gray-400">
      <p>&copy; {new Date().getFullYear()} Imagera.id - Dibuat dengan &hearts; untuk privasi Anda.</p>
      <div class="flex space-x-6">
        <a href="/" class="hover:text-blue-600 transition-colors" aria-label="Ikuti kami di Twitter">Twitter</a>
        <a href="/" class="hover:text-blue-600 transition-colors" aria-label="Lihat repositori GitHub">GitHub</a>
      </div>
    </div>
  </div>
</footer>
