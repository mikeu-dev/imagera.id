<script>
  import Navbar from '../organisms/Navbar.svelte';
  import Footer from '../organisms/Footer.svelte';

  let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-white">
  <Navbar />
  
  <main class="flex-grow">
    {@render children?.()}
  </main>
  
  <Footer />
</div>
