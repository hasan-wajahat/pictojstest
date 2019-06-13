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
    <button @click="onClick" class="btn btn-default">upload</button>
  </div>
</template>

<script>
import { uploadFile } from "../helpers/Api";
export default {
  name: "FileUpload",
  data: function() {
    return {
      file: null,
    };
  },
  methods: {
    filesChange: function(event) {
      this.file = event.target.files[0];
    },
    onClick: async function() {
      try {
        const response = await uploadFile('/uploads', this.file);
        if (response) {
          this.$emit('file-upload', response.file);
          document.getElementById("file-input").value = "";

        }
      } catch (error) {
        // eslint-disable-next-line
        console.log(Error);
      }
    }
  }
};
</script>