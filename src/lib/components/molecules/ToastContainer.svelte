<script lang="ts">
	import { toast } from '$lib/stores/toast.svelte';
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';

	const typeClasses = {
		success: 'bg-green-50 border-green-200 text-green-800',
		error: 'bg-red-50 border-red-200 text-red-800',
		info: 'bg-blue-50 border-blue-200 text-blue-800',
		warning: 'bg-amber-50 border-amber-200 text-amber-800'
	};

	const iconPaths = {
		success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
		error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
		info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
		warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
	};
</script>

<div
	class="pointer-events-none fixed top-4 right-4 z-100 flex w-full max-w-sm flex-col space-y-2 px-4 sm:top-20 sm:px-0"
>
	{#each toast.toasts as t (t.id)}
		<div
			animate:flip={{ duration: 300 }}
			transition:fly={{ x: 100, duration: 300 }}
			class="pointer-events-auto flex w-full items-center justify-between rounded-xl border p-4 shadow-lg backdrop-blur-sm {typeClasses[
				t.type
			]}"
		>
			<div class="flex items-center space-x-3">
				<svg class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d={iconPaths[t.type]}
					/>
				</svg>
				<p class="text-sm font-medium">{t.message}</p>
			</div>
			<button
				onclick={() => toast.remove(t.id)}
				class="ml-4 rounded-lg p-1 transition-colors hover:bg-black/5"
				aria-label="Close"
			>
				<svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>
		</div>
	{/each}
</div>
