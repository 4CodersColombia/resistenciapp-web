<template>
  <carousel-3d
    width="192"
    height="200"
    border="0"
    @after-slide-change="(v) => $emit('slide-change', v)"
  >
    <slide
      v-for="(photo, i) in photos"
      :key="photo.id"
      :index="i"
      class="border-0 backdrop-filter backdrop-blur-sm bottom-10 z-10 self-center overflow-hidden rounded-xl bg-black bg-opacity-50"
    >
      <div
        class="flex flex-col items-center"
        @click="$router.push({ name: 'photo', params: { photoId: photo.id } })"
      >
        <img :src="photo.photoUrl" class="h-28 object-cover" />
        <p class="text-lg m-1 font-semibold break-words w-48 text-center">
          {{ photo.comment }}
        </p>
      </div>
    </slide>
  </carousel-3d>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
export default {
  components: {
    Carousel3d,
    Slide,
  },
  name: "carousel-photos",
  props: {
    photos: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPhoto: 0,
    };
  },
  methods: {
    onAfterSlideChange(e) {
      console.log(e);
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-3d-container {
  position: absolute !important;
  z-index: 10 !important;
  background-color: transparent !important;
  margin-bottom: 0px !important;
}
.carousel-3d-slide {
  border-width: 0px !important;
  height: 100% !important;
  background-color: transparent;
}
</style>
