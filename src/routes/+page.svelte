<script lang="ts">
  import Text from '$lib/components/atoms/Text.svelte';
  import Button from '$lib/components/atoms/Button.svelte';
  import { localizeHref as i } from '$lib/paraglide/runtime';

  const tools = [
    {
      title: 'Kompres Gambar',
      description: 'Kurangi ukuran file gambar Anda tanpa kehilangan kualitas secara signifikan.',
      href: i('/compress-image'),
      icon: 'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
      color: 'bg-blue-500'
    },
    {
      title: 'Ubah Ukuran',
      description: 'Ubah dimensi lebar dan tinggi gambar Anda dengan mudah dan cepat.',
      href: i('/resize-image'),
      icon: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5',
      color: 'bg-green-500'
    },
    {
      title: 'PNG ke JPG',
      description: 'Konversi file PNG transparan Anda menjadi format JPG berkualitas tinggi.',
      href: i('/png-to-jpg'),
      icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M8 10l-2 2 2 2 M16 10l2 2-2 2',
      color: 'bg-purple-500'
    }
  ];

  const features = [
    {
      title: 'Cepat & Ringan',
      description: 'Semua proses dilakukan langsung di browser Anda. Tidak ada waktu tunggu unggah.'
    },
    {
      title: '100% Aman',
      description: 'Gambar Anda tidak pernah meninggalkan perangkat Anda. Privasi terjamin sepenuhnya.'
    },
    {
      title: 'Gratis Selamanya',
      description: 'Gunakan semua fitur kami sepuasnya tanpa biaya tersembunyi atau langganan.'
    }
  ];
</script>

<svelte:head>
  <title>Imagera.id - Edit Gambar Tanpa Ribet</title>
  <meta name="description" content="Platform pengolahan gambar gratis yang cepat, aman, dan 100% berjalan di browser. Kompres, ubah ukuran, dan konversi gambar secara instan." />
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32 bg-linear-to-b from-blue-50 to-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
    <div class="text-center">
      <div class="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
        ✨ Pemrosesan 100% di browser
      </div>
      <Text tag="h1" variant="headline" weight="bold" class="mb-6">
        Edit gambar, <span class="text-blue-600">tanpa ribet.</span>
      </Text>
      <Text tag="p" variant="body" class="max-w-2xl mx-auto text-lg mb-10">
        Pemrosesan gambar secepat kilat tanpa perlu mengunggah file ke server. Privasi Anda adalah prioritas utama kami.
      </Text>
      <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button size="lg" onclick={() => window.location.href = '#tools'}>Coba Sekarang</Button>
        <Button variant="secondary" size="lg" onclick={() => window.location.href = '#features'}>Pelajari Lebih Lanjut</Button>
      </div>
    </div>
  </div>
  
  <!-- Decorative Elements -->
  <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
    <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-400 opacity-10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-400 opacity-10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
  </div>
</section>

<!-- Tools Grid -->
<section id="tools" class="py-24 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <Text tag="h2" variant="headline" weight="bold" class="mb-4">Pilih Alat Anda</Text>
      <Text tag="p" variant="body" class="max-w-xl mx-auto">Mulai mengolah gambar Anda dengan alat-alat profesional kami yang sederhana.</Text>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      {#each tools as tool (tool.href)}
        <a href={i(tool.href)} class="group block p-8 bg-white border border-gray-100 rounded-3xl shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all">
          <div class="w-14 h-14 {tool.color} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform">
            <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={tool.icon} />
            </svg>
          </div>
          <Text tag="h3" variant="headline" weight="bold" class="mb-3">{tool.title}</Text>
          <Text tag="p" variant="body" class="text-sm">{tool.description}</Text>
          <div class="mt-6 flex items-center text-blue-600 font-semibold text-sm">
            Gunakan Alat
            <svg class="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>

<!-- Features Section -->
<section id="features" class="py-24 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
      {#each features as feature (feature.title)}
        <div class="text-center md:text-left space-y-4">
          <div class="inline-flex items-center justify-center p-3 bg-white rounded-xl shadow-xs border border-gray-100 text-blue-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <Text tag="h3" variant="headline" weight="bold">{feature.title}</Text>
          <Text tag="p" variant="body" class="text-gray-500">{feature.description}</Text>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- SEO Content -->
<section class="py-24 bg-white border-t border-gray-100">
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-blue">
    <Text tag="h2" variant="headline" weight="bold" class="mb-6">Tentang Imagera.id</Text>
    <p>Imagera.id adalah platform pengolahan gambar modern yang dirancang untuk kecepatan dan keamanan. Kami memahami bahwa mengunggah data pribadi ke server sering kali menimbulkan kekhawatiran privasi. Itulah sebabnya kami mendevelop teknologi ini untuk berjalan 100% secara lokal di browser Anda.</p>
    <p>Baik Anda perlu mengompres foto untuk website, mengubah ukuran gambar untuk media sosial, atau mengonversi format file, Imagera.id menawarkan pengalaman yang mulus tanpa perlu instalasi aplikasi tambahan. Semuanya dapat diakses secara instan dari perangkat manapun.</p>
  </div>
</section>
