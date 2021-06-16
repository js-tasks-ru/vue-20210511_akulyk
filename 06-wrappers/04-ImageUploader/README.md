# ImageUploader

Основная задача — загрузка изображения.

Для получения изображения требуется обработать событие `@change` у поля ввода. Файл с выбранным изображением можно найти в `$event.target.files[0]`.

Файл с изображением также можно получить в любой момент времени, если установить `ref` на `input`.

Ещё одна проблема может быть, если при удалении изображения не сбрасывать значения поля ввода. В этом случае не получится повторно выбрать тот же файл, так как не сработает событие `change`. Для удаления выбранного изображения можно, например, установить пустую строку или `null` в качестве значения. При клике на "Удалить изображение" важно также вызывать `$event.preventDefault();`, чтобы не открыть диалог выбора файла.

```html
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
```
