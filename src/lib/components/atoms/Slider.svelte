<script lang="ts">
	let {
		value = $bindable(80),
		min = 0,
		max = 100,
		step = 1,
		id = Math.random().toString(36).substring(2, 9),
		label = '',
		disabled = false,
		...props
	} = $props();

	const percentage = $derived(((value - min) / (max - min)) * 100);
</script>

<div class="w-full space-y-3">
	<div class="flex items-center justify-between">
		{#if label}
			<label for={id} class="block text-sm font-semibold tracking-tight text-gray-700">
				{label}
			</label>
		{/if}
		<span
			class="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-bold tabular-nums text-blue-600 ring-1 ring-blue-100 ring-inset"
		>
			{value}%
		</span>
	</div>

	<div class="group relative flex items-center">
		<input
			{id}
			{disabled}
			type="range"
			{min}
			{max}
			{step}
			bind:value
			class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 transition-all focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
			style="background: linear-gradient(to right, #2563eb {percentage}%, #e5e7eb {percentage}%);"
			{...props}
		/>
	</div>
</div>

<style>
	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		background: white;
		border: 2px solid #2563eb;
		border-radius: 50%;
		cursor: pointer;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}

	input[type='range']:not(:disabled)::-webkit-slider-thumb:hover {
		transform: scale(1.15);
		box-shadow: 0 10px 15px -3px rgb(37 99 235 / 0.3);
		border-width: 3px;
	}

	input[type='range']:not(:disabled):active::-webkit-slider-thumb {
		transform: scale(0.95);
		background: #2563eb;
	}

	/* Firefox */
	input[type='range']::-moz-range-thumb {
		width: 20px;
		height: 20px;
		background: white;
		border: 2px solid #2563eb;
		border-radius: 50%;
		cursor: pointer;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
	}

	input[type='range']:not(:disabled)::-moz-range-thumb:hover {
		transform: scale(1.15);
		box-shadow: 0 10px 15px -3px rgb(37 99 235 / 0.3);
		border-width: 3px;
	}
</style>
