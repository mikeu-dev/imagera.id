<script>
  import Text from '../atoms/Text.svelte';

  let { title, description } = $props();
</script>

<div class="space-y-2 mb-8">
  <Text tag="h1" variant="headline" align="center">
    {title}
  </Text>
  <Text tag="p" variant="body" align="center" class="max-w-2xl mx-auto">
    {description}
  </Text>
</div>
