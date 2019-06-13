<template>
  <div class="canvas col-sm-8 col-md-8 col-lg-8">
    <div class="block canvas" @dragover="onDragOver" @drop="onDrop">
      <template v-for="(asset, index) in assets">
        <div
          draggable="true"
          @dragstart="onDragStart(asset, $event)"
          @drop="onItemDrop(asset, $event)"
          @dragover="onDragOver"
          v-if="asset.type === 'image'"
          :key="asset.id"
          class="image"
          :style="getStyles(index)"
        >
          <img :src="asset.url">
          <button @click="$emit('delete-asset', index)" class="delete-button btn-danger">
            <i class="fa fa-close"></i>
          </button>
        </div>
      </template>
    </div>
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
      movedObjectSize: {
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    onDragStart: function(asset, event) {
      event.dataTransfer.setData("text", asset.id);
      this.movedObjectSize = {
        x: event.target.clientWidth,
        y: event.target.clientHeight
      };
    },
    onDragOver: function(event) {
      event.preventDefault();
    },
    onDrop: function(event) {
      event.preventDefault();
      const id = Number(event.dataTransfer.getData("text"));
      let offsetValues = {
        left: event.offsetX - this.movedObjectSize.x / 2,
        top: event.offsetY - this.movedObjectSize.y / 2
      };
      this.$emit("asset-moved", { id, offsetValues });
    },
    onItemDrop: function(asset, event) {
      event.preventDefault();
      event.stopPropagation();
      const id = Number(event.dataTransfer.getData("text"));
      let offsetValues = {
        left: asset.left + event.offsetX - this.movedObjectSize.x / 2,
        top: asset.top + event.offsetY - this.movedObjectSize.y / 2
      };
      this.$emit("asset-moved", { id, offsetValues });
    },
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
.image {
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
</style>