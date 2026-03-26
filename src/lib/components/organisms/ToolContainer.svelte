<script>
  let { preview, controls, info } = $props();
</script>

<div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
  <div class="lg:col-span-12">
    {@render info?.()}
  </div>
  
  <div class="lg:col-span-7 xl:col-span-8 flex flex-col space-y-6">
    <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      {@render preview?.()}
    </div>
  </div>
  
  <div class="lg:col-span-5 xl:col-span-4 flex flex-col space-y-6">
    {@render controls?.()}
  </div>
</div>
