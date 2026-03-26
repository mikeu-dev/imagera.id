<script>
  import FileInput from '../atoms/FileInput.svelte';
  
  let { onupload } = $props();

  function handleFileChange(event) {
    const files = event.target.files;
    if (files && files.length > 0) {
      onupload(files[0]);
    }
  }

  function handleDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      onupload(files[0]);
    }
  }

  function handleDragOver(event) {
    event.preventDefault();
  }
</script>

<div 
  class="w-full"
  ondrop={handleDrop}
  ondragover={handleDragOver}
>
  <FileInput onchange={handleFileChange} />
</div>
