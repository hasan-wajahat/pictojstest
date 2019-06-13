<template>
  <div class="main-container">
    <div class="sidepane col-sm-2 col-md-2 col-lg-2">
      <FileUpload v-on:file-upload="onFileUpload"/>
      <hr>
      <div class="assets">
        <h3>Assets</h3>
        <div class="text">
          <h4>Text</h4>
          <button id="addText" class="btn btn-default">Add Text</button>
        </div>
        <ImageList :images="images"/>
      </div>
    </div>
    <!-- canvas -->
    <div class="canvas col-sm-8 col-md-8 col-lg-8">
      <div class="block">
        <!-- Add images and texts to here -->
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "../helpers/Api";
import ImageList from "./ImageList";
import FileUpload from "./FileUpload";

export default {
  name: "HomePage",
  data: function() {
    return {
      images: []
    };
  },
  props: {
    msg: String
  },
  components: {
    ImageList,
    FileUpload
  },
  mounted: async function() {
    try {
      const response = await getData("/images");
      this.images = response;
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
  },
  methods: {
    onFileUpload: function(url) {
      this.images.push(url);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main-container {
  height: 100%;
}
</style>
