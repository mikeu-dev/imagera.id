<script>
  import ToolHeader from '../molecules/ToolHeader.svelte';
  import ToolContainer from '../organisms/ToolContainer.svelte';
  import Text from '../atoms/Text.svelte';

  let { 
    title, 
    description, 
    seoText,
    preview: preview_prop, 
    controls: controls_prop, 
    info: info_prop 
  } = $props();
</script>

<div class="py-12 md:py-20 bg-linear-to-b from-blue-50/50 to-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <ToolHeader {title} {description} />
    
    <div class="mt-12">
      <ToolContainer>
        {#snippet preview()}
          {@render preview_prop?.()}
        {/snippet}
        
        {#snippet controls()}
          {@render controls_prop?.()}
        {/snippet}
        
        {#snippet info()}
          {@render info_prop?.()}
        {/snippet}
      </ToolContainer>
    </div>

    {#if seoText}
      <section class="mt-24 border-t border-gray-100 pt-16">
        <Text tag="h2" variant="headline" weight="bold" class="mb-6">Informasi Lengkap</Text>
        <div class="prose prose-blue max-w-none text-gray-600">
          {@render seoText?.()}
        </div>
      </section>
    {/if}
  </div>
</div>
