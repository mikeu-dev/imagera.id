<script lang="ts">
	import FileInput from '../atoms/FileInput.svelte';

	let {
		onupload,
		multiple = false
	}: {
		onupload: (files: File[]) => void;
		multiple?: boolean;
	} = $props();

	function handleFileChange(event: Event) {
		const target = event.target as HTMLInputElement;
		const files = target.files;
		if (files && files.length > 0) {
			onupload(Array.from(files));
		}
	}

	function handleDrop(event: DragEvent) {
		event.preventDefault();
		if (event.dataTransfer) {
			const files = event.dataTransfer.files;
			if (files && files.length > 0) {
				onupload(Array.from(files));
			}
		}
	}

	function handleDragOver(event: DragEvent) {
		event.preventDefault();
	}
</script>

<div role="presentation" class="w-full" ondrop={handleDrop} ondragover={handleDragOver}>
	<FileInput {multiple} onchange={handleFileChange} />
</div>
