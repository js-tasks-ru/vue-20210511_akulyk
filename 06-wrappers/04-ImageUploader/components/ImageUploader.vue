<template>
  <div class="image-uploader">
    <label @click="remove" class="image-uploader__preview" :class="{ 'image-uploader__preview-loading': loading }" :style="style">
      <span v-if="loading">Загрузка...</span>
      <span v-else-if="imageId">Удалить изображение</span>
      <span v-else>Загрузить изображение</span>
      <input
        v-if="!imageId"
        ref="file-input"
        type="file"
        accept="image/*"
        class="form-control-file"
        @change="handleChange"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../ImageService';

export default {
  name: 'ImageUploader',
  model: {
    prop: 'imageId',
    event: 'change',
  },

  props: {
    imageId: {
      type: Number,
    },
  },

  data: () => ({
    loading: false,
  }),

  computed: {
    style() {
      const style = {};
      if (this.imageId) style['--bg-image'] = `url('${ImageService.getImageURL(this.imageId)}')`;
      return style;
    },
  },

  methods: {
    async handleChange(e) {
      const file = e.target.files[0];
      this.loading = true;
      const { id: imageId } = await ImageService.uploadImage(file);
      this.loading = false;
      this.$refs['file-input'].value = null;
      this.$emit('change', imageId);
    },

    remove(e) {
      if (this.imageId) {
        e.preventDefault();
        this.$emit('change', null);
      }
    },
  },
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
