<template>
  <div class="image">
    <h4>Images</h4>
    <ul class="list-unstyled">
      <li :key="index" v-for="(image, index) in images">
        <img :src="image" class="img-rounded">
      </li>
    </ul>
  </div>
</template>


<script>
export default {
  name: "ImageList",
  props: {
    images: Array
  }
};
</script>