<template>
  <div class="text">
    <h4>Text</h4>
    <!-- Add text to canvas -->
    <button @click="$emit('add-text', {type: 'text', text: ''})" class="btn btn-default">Add Text</button>
  </div>
</template>

<script>
export default {
  name: "TextAsset"
};
</script>