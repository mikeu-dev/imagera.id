<script lang="ts">
	import Text from '$lib/components/atoms/Text.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import { localizeHref as i } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';

	const tools = [
		{
			title: m.home_tool_compress_title(),
			description: m.home_tool_compress_desc(),
			href: '/compress-image',
			icon: 'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
			color: 'bg-blue-500'
		},
		{
			title: m.home_tool_resize_title(),
			description: m.home_tool_resize_desc(),
			href: '/resize-image',
			icon: 'M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5',
			color: 'bg-green-500'
		},
		{
			title: m.home_tool_png_title(),
			description: m.home_tool_png_desc(),
			href: '/png-to-jpg',
			icon: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M8 10l-2 2 2 2 M16 10l2 2-2 2',
			color: 'bg-purple-500'
		},
		{
			title: m.home_tool_webp_title(),
			description: m.home_tool_webp_desc(),
			href: '/webp-converter',
			icon: 'M13 10V3L4 14h7v7l9-11h-7z',
			color: 'bg-amber-500'
		}
	];

	const features = [
		{
			title: m.home_features_fast_title(),
			description: m.home_features_fast_desc()
		},
		{
			title: m.home_features_secure_title(),
			description: m.home_features_secure_desc()
		},
		{
			title: m.home_features_free_title(),
			description: m.home_features_free_desc()
		}
	];
</script>

<svelte:head>
	<title>{m.home_title()}</title>
	<meta name="description" content={m.home_meta_desc()} />
</svelte:head>

<!-- Hero Section -->
<section
	class="relative overflow-hidden bg-linear-to-b from-blue-50 to-white pt-20 pb-20 md:pt-32 md:pb-32"
>
	<div class="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="text-center">
			<div
				class="mb-6 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-700"
			>
				{m.home_badge()}
			</div>
			<Text tag="h1" variant="headline" weight="bold" class="mb-6">
				{m.home_headline_1()} <span class="text-blue-600">{m.home_headline_2()}</span>
			</Text>
			<Text tag="p" variant="body" class="mx-auto mb-10 max-w-2xl text-lg">
				{m.home_desc()}
			</Text>
			<div class="flex flex-col justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
				<Button size="lg" onclick={() => (window.location.href = '#tools')}
					>{m.home_try_now()}</Button
				>
				<Button
					variant="secondary"
					size="lg"
					onclick={() => (window.location.href = '#features')}
					>{m.home_learn_more()}</Button
				>
			</div>
		</div>
	</div>

	<!-- Decorative Elements -->
	<div class="pointer-events-none absolute top-0 left-1/2 h-full w-full -translate-x-1/2">
		<div
			class="absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-blue-400 opacity-10 blur-3xl"
		></div>
		<div
			class="absolute right-1/4 bottom-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-400 opacity-10 blur-3xl"
			style="animation-delay: 1s;"
		></div>
	</div>
</section>

<!-- Tools Grid -->
<section id="tools" class="bg-white py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="mb-16 text-center">
			<Text tag="h2" variant="headline" weight="bold" class="mb-4">{m.home_tools_title()}</Text>
			<Text tag="p" variant="body" class="mx-auto max-w-xl"
				>{m.home_tools_desc()}</Text
			>
		</div>

		<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
			{#each tools as tool (tool.href)}
				<a
					href={i(tool.href)}
					class="group block rounded-3xl border border-gray-100 bg-white p-8 shadow-xs transition-all hover:-translate-y-1 hover:shadow-xl"
				>
					<div
						class="h-14 w-14 {tool.color} mb-6 flex items-center justify-center rounded-2xl text-white transition-transform group-hover:scale-110"
					>
						<svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={tool.icon} />
						</svg>
					</div>
					<Text tag="h3" variant="headline" weight="bold" class="mb-3">{tool.title}</Text>
					<Text tag="p" variant="body" class="text-sm">{tool.description}</Text>
					<div class="mt-6 flex items-center text-sm font-semibold text-blue-600">
						{m.home_tool_use()}
						<svg
							class="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M14 5l7 7m0 0l-7 7m7-7H3"
							/></svg
						>
					</div>
				</a>
			{/each}
		</div>
	</div>
</section>

<!-- Features Section -->
<section id="features" class="bg-gray-50 py-24">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-3">
			{#each features as feature (feature.title)}
				<div class="space-y-4 text-center md:text-left">
					<div
						class="inline-flex items-center justify-center rounded-xl border border-gray-100 bg-white p-3 text-blue-600 shadow-xs"
					>
						<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M5 13l4 4L19 7"
							/>
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
<section class="border-t border-gray-100 bg-white py-24">
	<div class="mx-auto prose max-w-4xl px-4 prose-blue sm:px-6 lg:px-8">
		<Text tag="h2" variant="headline" weight="bold" class="mb-6">{m.home_about_title()}</Text>
		<p>
			{m.home_about_p1()}
		</p>
		<p>
			{m.home_about_p2()}
		</p>
	</div>
</section>

