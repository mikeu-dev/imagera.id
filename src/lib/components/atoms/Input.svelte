<script>
	let {
		type = 'text',
		value = $bindable(),
		placeholder = '',
		disabled = false,
		id = '',
		label = '',
		error = '',
		...props
	} = $props();

	const baseClasses =
		'block w-full rounded-md border-gray-300 shadow-sm transition-all focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 border p-2 bg-white';
</script>

<div class="w-full space-y-1">
	{#if label}
		<label for={id} class="block text-sm font-medium text-gray-700">
			{label}
		</label>
	{/if}
	<input
		{id}
		{type}
		bind:value
		{placeholder}
		{disabled}
		class="{baseClasses} {error ? 'border-red-300 ring-red-300' : 'border-gray-300'}"
		{...props}
	/>
	{#if error}
		<p class="mt-1 text-xs text-red-600">{error}</p>
	{/if}
</div>
