<template>
  <div class="main-container">
    <div class="sidepane col-sm-2 col-md-2 col-lg-2">
      <FileUpload v-on:file-upload="onFileUpload"/>
      <hr>
      <div class="assets">
        <h3>Assets</h3>
        <TextAsset v-on:add-text="onAddAsset" />
        <ImageList :images="images" v-on:asset-click="onAddAsset"/>
      </div>
    </div>
    <Canvas :assets="assets" v-on:asset-moved="onAssetMoved" v-on:delete-asset="onDeleteAsset"/>
  </div>
</template>

<script>
import { getData } from "../helpers/Api";
import ImageList from "./ImageList";
import FileUpload from "./FileUpload";
import Canvas from "./Canvas";
import TextAsset from "./TextAsset";

export default {
  name: "HomePage",
  data: function() {
    return {
      images: [],
      assets: []
    };
  },
  components: {
    ImageList,
    FileUpload,
    Canvas,
    TextAsset,
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
    },
    onAddAsset: function(asset) {
      this.assets.push({
        ...asset,
        id: Date.now(),
        left: 0,
        top: 0
      });
    },
    onAssetMoved: function({ id, offsetValues }) {
      const index = this.assets.findIndex(asset => asset.id === id);
      const currentAsset = this.assets[index];
      const newAsset = {
        ...currentAsset,
        ...offsetValues
      };
      this.assets.splice(index, 1, newAsset);
    },
    onDeleteAsset: function(index) {
      this.assets.splice(index, 1);
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
