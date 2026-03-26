<script>
  let { 
    value = $bindable(80), 
    min = 0, 
    max = 100, 
    step = 1, 
    id = '', 
    label = '', 
    ...props 
  } = $props();

  const baseClasses = 'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 focus:outline-hidden';
</script>

<div class="w-full space-y-2">
  <div class="flex justify-between items-center">
    {#if label}
      <label for={id} class="block text-sm font-medium text-gray-700">
        {label}
      </label>
    {/if}
    <span class="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
      {value}%
    </span>
  </div>
  <input
    {id}
    type="range"
    {min}
    {max}
    {step}
    bind:value
    class={baseClasses}
    {...props}
  />
</div>
