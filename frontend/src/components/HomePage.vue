<template>
  <div class="main-container">
    <div class="sidepane col-sm-2 col-md-2 col-lg-2">
      <FileUpload @file-upload="onFileUpload"/>
      <hr>
      <div class="assets">
        <h3>Assets</h3>
        <TextAsset @add-text="onAddAsset"/>
        <ImageList :images="images" @asset-click="onAddAsset"/>
      </div>
    </div>
    <Canvas
      :assets="assets"
      @asset-moved="onAssetMoved"
      @delete-asset="onDeleteAsset"
      @save="onSave"
    />
  </div>
</template>

<script>
// Main container housing all the components and the state

import { getData, saveApi, loadApi } from "../helpers/Api";
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
    TextAsset
  },
  // get images and saved data on load
  mounted: function() {
    this.loadImages();
    this.loadSavedData();
  },
  methods: {
    loadImages: async function() {
      try {
        const response = await getData("/images");
        if (response) this.images = response;
      } catch (error) {
        // eslint-disable-next-line
        console.log(error);
      }
    },
    loadSavedData: function() {
      const data = loadApi();
      if (data && data.length) this.assets = data;
    },
    onFileUpload: function(url) {
      this.images.push(url);
    },
    onAddAsset: function(asset) {
      this.assets.push({
        // we add our own id
        id: Date.now(),
        // initialize position for asset
        left: 0,
        top: 0,
        ...asset
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
    },
    onSave: function() {
      // save asset
      saveApi(this.assets);
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
