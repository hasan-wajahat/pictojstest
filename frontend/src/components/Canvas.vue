<template>
  <div class="canvas col-sm-8 col-md-8 col-lg-8">
    <div class="block canvas" @dragover.prevent @drop="onDrop">
      <template v-for="(asset, index) in assets">
        <!-- draggable assets -->
        <div
          draggable="true"
          @dragstart="onDragStart(asset, $event)"
          @drop="onItemDrop(asset, $event)"
          @dragover.prevent
          :key="asset.id"
          class="asset"
          :style="getStyles(index)"
        >
          <img v-if="asset.type === 'image'" :src="asset.url">
          <textarea v-else-if="asset.type === 'text'" v-model="asset.text" />
          <button @click="$emit('delete-asset', index)" class="delete-button btn-danger">
            <i class="fa fa-close"></i>
          </button>
        </div>
      </template>
    </div>
    <button class="btn btn-default save-button" @click="$emit('save')">Save</button>
  </div>
</template>

<script>
export default {
  name: "Canvas",
  props: {
    assets: Array
  },
  data: function() {
    return {
      // used to save the size of the currently moved asset
      movedObjectSize: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    onDragStart: function(asset, event) {
      // Saves id of the asset being dragged
      event.dataTransfer.setData("text", asset.id);
      this.movedObjectSize = {
        x: event.target.clientWidth,
        y: event.target.clientHeight
      };
    },
    // when dropped on canvase
    onDrop: function(event) {
      event.preventDefault();
      // convert from string to number
      const id = Number(event.dataTransfer.getData("text"));
      let offsetValues = {
        // to caclulate position of asset, subtract assets dimensions by half from offset position
        left: event.offsetX - this.movedObjectSize.x / 2,
        top: event.offsetY - this.movedObjectSize.y / 2
      };
      this.$emit("asset-moved", { id, offsetValues });
    },
    // when dropped on asset
    onItemDrop: function(asset, event) {
      event.preventDefault();
      event.stopPropagation();
      const id = Number(event.dataTransfer.getData("text"));
      // In case of asset the offset is calculated from the position of the asset on whic
      // the new asset is dropped. So we add that asset's own position as well
      let offsetValues = {
        left: asset.left + event.offsetX - this.movedObjectSize.x / 2,
        top: asset.top + event.offsetY - this.movedObjectSize.y / 2
      };
      this.$emit("asset-moved", { id, offsetValues });
    },
    // styles for moving the assets
    getStyles: function(index) {
      return {
        left: `${this.assets[index].left}px`,
        top: `${this.assets[index].top}px`
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.canvas {
  position: relative;
  overflow: hidden;
}
.asset {
  cursor: pointer;
  position: absolute;
  img {
    max-width: 90%;
  }
  &:hover {
    background: darken(white, 5%);
    .delete-button {
      display: block;
    }
  }
}
.delete-button {
  padding: 2px 4px;
  position: absolute;
  top: -5px;
  right: -5px;
  font-size: 12px;
  border-radius: 50%;
  cursor: pointer;
  display: none;
}
.save-button {
  padding: 8px 30px;
  margin-left: 10px;
}
</style>