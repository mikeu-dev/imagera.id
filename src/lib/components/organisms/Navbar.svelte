<script lang="ts">
	import Text from '../atoms/Text.svelte';
	import { localizeHref as i, getLocale, setLocale } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';

	function toggleLanguage() {
		const newLang = getLocale() === 'id' ? 'en' : 'id';
		setLocale(newLang);
	}
</script>

<nav class="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<div class="flex shrink-0 items-center">
				<a href={i('/')} class="group flex items-center space-x-2">
					<div
						class="flex h-8 w-8 transform items-center justify-center rounded-lg bg-blue-600 shadow-md shadow-blue-200 transition-transform group-hover:rotate-12"
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
					<Text
						tag="span"
						weight="bold"
						class="text-xl tracking-tighter text-gray-900 transition-colors group-hover:text-blue-600"
					>
						Imagera.id
					</Text>
				</a>
			</div>

			<div class="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
				<a
					href={i('/')}
					class="text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
					>{m.nav_home()}</a
				>
				<div class="group relative">
					<button
						class="flex items-center text-sm font-medium text-gray-500 transition-colors hover:text-blue-600"
					>
						{m.nav_tools()}
						<svg class="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 9l-7 7-7-7"
							/></svg
						>
					</button>
					<div
						class="invisible absolute right-0 mt-2 w-48 origin-top-right scale-95 transform rounded-xl border border-gray-100 bg-white py-2 opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:scale-100 group-hover:opacity-100"
					>
						<a
							href={i('/compress-image')}
							class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
							>{m.nav_compress()}</a
						>
						<a
							href={i('/resize-image')}
							class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
							>{m.nav_resize()}</a
						>
						<a
							href={i('/png-to-jpg')}
							class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
							>{m.nav_png_to_jpg()}</a
						>
						<a
							href={i('/webp-converter')}
							class="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
							>{m.nav_webp_converter()}</a
						>
					</div>
				</div>
			</div>

			<div class="flex items-center space-x-4">
				<button
					onclick={toggleLanguage}
					class="rounded border border-gray-200 px-2 py-1 text-xs font-bold uppercase text-gray-600 hover:bg-gray-100"
					aria-label="Toggle Language"
				>
					{getLocale()}
				</button>

				<a
					href={i('/compress-image')}
					class="hidden items-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-hidden active:scale-95 md:inline-flex"
				>
					{m.nav_try_free()}
				</a>
				<button
					class="rounded-lg p-2 text-gray-500 hover:bg-gray-100 sm:hidden"
					aria-label="Buka Menu"
				>
					<svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M4 6h16M4 12h16M4 18h16"
						/></svg
					>
				</button>
			</div>
		</div>
	</div>
</nav>

