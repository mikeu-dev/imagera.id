<script lang="ts">
	import Text from '../atoms/Text.svelte';
	import { localizeHref as i } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';
</script>

<footer class="border-t border-gray-100 bg-gray-50 py-12">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-4">
			<div class="col-span-2 space-y-4">
				<a href={i('/')} class="flex items-center space-x-2">
					<div
						class="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-md shadow-blue-200"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-5 w-5 text-white"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						>
							<rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle
								cx="9"
								cy="9"
								r="2"
							/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
						</svg>
					</div>
					<Text tag="span" weight="bold" class="text-xl tracking-tighter text-gray-900">
						Imagera.id
					</Text>
				</a>
				<Text tag="p" variant="body" class="max-w-xs">
					{m.footer_desc()}
				</Text>
			</div>

			<div>
				<Text tag="h4" variant="headline" weight="bold" class="mb-4">{m.footer_products()}</Text>
				<ul class="space-y-2">
					<li>
						<a
							href={i('/compress-image')}
							class="text-sm text-gray-500 transition-colors hover:text-blue-600">{m.nav_compress()}</a
						>
					</li>
					<li>
						<a
							href={i('/resize-image')}
							class="text-sm text-gray-500 transition-colors hover:text-blue-600">{m.nav_resize()}</a
						>
					</li>
					<li>
						<a
							href={i('/png-to-jpg')}
							class="text-sm text-gray-500 transition-colors hover:text-blue-600">{m.nav_png_to_jpg()}</a
						>
					</li>
					<li>
						<a
							href={i('/webp-converter')}
							class="text-sm text-gray-500 transition-colors hover:text-blue-600">{m.nav_webp_converter()}</a
						>
					</li>
				</ul>
			</div>

			<div>
				<Text tag="h4" variant="headline" weight="bold" class="mb-4">{m.footer_legal()}</Text>
				<ul class="space-y-2">
					<li>
						<a href={i('/')} class="text-sm text-gray-500 transition-colors hover:text-blue-600"
							>{m.footer_privacy()}</a
						>
					</li>
					<li>
						<a href={i('/')} class="text-sm text-gray-500 transition-colors hover:text-blue-600"
							>{m.footer_terms()}</a
						>
					</li>
				</ul>
			</div>
		</div>

		<div
			class="mt-12 flex flex-col items-center justify-between space-y-4 border-t border-gray-200 pt-8 text-sm text-gray-400 md:flex-row md:space-y-0"
		>
			<p>
				{m.footer_copyright()}
			</p>
			<div class="flex space-x-6">
				<a href="/" class="transition-colors hover:text-blue-600" aria-label="Twitter"
					>Twitter</a
				>
				<a
					href="https://github.com/mikeu-dev/imagera.id"
					class="transition-colors hover:text-blue-600"
					aria-label="GitHub">GitHub</a
				>
			</div>
		</div>
	</div>
</footer>
