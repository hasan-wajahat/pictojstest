<template>
  <div class="form">
    <h3>Form</h3>
    <input
      type="file"
      id="file-input"
      class="form-control"
      placeholder="Upload Your Images"
      accept="image/*"
      @change="filesChange($event);"
    >
    <!-- Image preview -->
    <img v-if="file" :src="filePreview" class="preview-image">
    <button @click="onClick" class="btn btn-default upload-button">Upload</button>
  </div>
</template>

<script>
import { uploadFile } from "../helpers/Api";
const reader = new FileReader();
export default {
  name: "FileUpload",
  data: function() {
    return {
      file: null,
      filePreview: null
    };
  },
  methods: {
    filesChange: function(event) {
      this.file = event.target.files[0];

      reader.onload = event => {
        this.filePreview = event.target.result;
      };
      // reads file to show image preview
      reader.readAsDataURL(this.file);
    },
    onClick: async function() {
      if (!this.file) return;
      try {
        const response = await uploadFile("/uploads", this.file);
        if (response) {
          // save to list the new upload file
          this.$emit("file-upload", response.file);
          this.reset();
        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(Error);
      }
    },
    reset: function() {
      this.file = null;
      this.filePreview = null;
      // clears the file input
      document.getElementById("file-input").value = "";
    }
  }
};
</script>

<style lang="scss" scoped>
.preview-image {
  height: 50px;
  width: 50px;
  border-radius: 6px;
  display: block;
  margin-top: 10px;
}
.upload-button {
  margin-top: 20px;
}
</style>