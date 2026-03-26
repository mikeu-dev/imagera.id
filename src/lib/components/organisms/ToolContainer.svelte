<script>
	let { preview, controls, info } = $props();
</script>

<div class="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
	<div class="lg:col-span-12">
		{@render info?.()}
	</div>

	<div class="flex flex-col space-y-6 lg:col-span-7 xl:col-span-8">
		<div class="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
			{@render preview?.()}
		</div>
	</div>

	<div class="flex flex-col space-y-6 lg:col-span-5 xl:col-span-4">
		{@render controls?.()}
	</div>
</div>
