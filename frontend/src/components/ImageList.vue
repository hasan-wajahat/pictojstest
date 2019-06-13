<template>
  <div class="image">
    <h4>Images</h4>
    <ul class="list-unstyled">
      <li
        :key="index"
        v-for="(image, index) in images"
        class="image-asset"
        @click="$emit('asset-click', {url: image, type: 'image'})"
      >
        <img :src="image" class="img-rounded non-draggable">
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

<style lang="scss" scoped>
.image-asset {
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
  }
}
.non-draggable {
  user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-drag: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
</style>