<script>
  import '../app.css';
  import MainLayout from '$lib/components/templates/MainLayout.svelte';
  
  let { children } = $props();
</script>

<MainLayout>
  {@render children?.()}
</MainLayout>
