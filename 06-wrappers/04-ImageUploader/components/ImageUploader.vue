<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :class="{ 'image-uploader__preview-loading': isLoading }"
      :style="imageURL ? `--bg-image: url('${imageURL}')` : ''"
    >
      <span v-if="state === $options.states.LOADING">Загрузка...</span>
      <span v-else-if="state === $options.states.FILLED">Удалить изображение</span>
      <span v-else-if="state === $options.states.EMPTY">Загрузить изображение</span>
      <input
        ref="input"
        type="file"
        accept="image/*"
        class="form-control-file"
        @change="handleFileSelected"
        @click="handleClick"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../ImageService';

export default {
  name: 'ImageUploader',

  states: {
    LOADING: 'loading',
    FILLED: 'filled',
    EMPTY: 'empty',
  },

  model: {
    prop: 'imageId',
    event: 'change',
  },

  props: {
    imageId: {
      default: null,
    },
  },

  data() {
    return {
      isLoading: false,
    };
  },

  computed: {
    state() {
      if (this.isLoading) {
        return this.$options.states.LOADING;
      } else if (this.imageId !== null) {
        return this.$options.states.FILLED;
      } else {
        return this.$options.states.EMPTY;
      }
    },

    imageURL() {
      return this.imageId ? ImageService.getImageURL(this.imageId) : null;
    },
  },

  methods: {
    handleFileSelected($event) {
      this.isLoading = true;
      return ImageService.uploadImage($event.target.files[0])
        .then((result) => {
          this.$emit('change', result.id);
        })
        .catch(() => {
          // Здесь может быть обработка ошибок, например, вывод тоста
        })
        .finally(() => {
          this.isLoading = false;
        });
    },

    handleClick($event) {
      if (this.state === this.$options.states.LOADING) {
        $event.preventDefault();
      } else if (this.state === this.$options.states.FILLED) {
        $event.preventDefault();
        this.resetFile();
      }
    },

    resetFile() {
      this.$refs.input.value = '';
      this.$emit('change', null);
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
