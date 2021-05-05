<template>
  <carousel-3d
    width="210"
    height="220"
    border="0"
    @after-slide-change="(v) => $emit('slide-change', v)"
  >
    <slide
      v-for="(photo, i) in photos"
      :key="photo.id"
      :index="i"
      class="border-0 bottom-10 z-10 self-center overflow-hidden rounded-lg bg-white"
    >
      <div class="flex flex-col bg-white rounded-lg">
        <img
          @click="
            $router.push({ name: 'photo', params: { photoId: photo.id } })
          "
          :src="photo.photoUrl"
          class="h-28 object-cover"
        />
        <span class="text-lg mt-1 mx-1 font-semibold truncate">
          {{ photo.comment }}
        </span>
        <span class="text-xs mx-1">{{
          photo.timestamp.toDate().toLocaleString()
        }}</span>
        <div class="flex px-1 items-center justify-between">
          <div class="flex justify-center flex-1">
            <span class="mr-1">{{ photos.comments || 0 }}</span>
            <v-icon>mdi-comment</v-icon>
          </div>
          <div class="flex flex-1">
            <div class="flex flex-col items-center">
              <v-btn @click="() => likePhoto(photo.id, false)" fab text small
                ><v-icon>mdi-arrow-down</v-icon></v-btn
              >
              <span>{{ photo.dislikes }}</span>
            </div>
            <div class="flex flex-col items-center">
              <v-btn @click="() => likePhoto(photo.id, true)" fab text small
                ><v-icon>mdi-arrow-up</v-icon></v-btn
              >
              <span>{{ photo.likes }}</span>
            </div>
          </div>
        </div>
      </div>
    </slide>
  </carousel-3d>
</template>

<script>
import { Carousel3d, Slide } from "vue-carousel-3d";
import { functions } from "../firebaseConfig";
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
    likePhoto(photoId, vote) {
      const voteSuggestion = functions.httpsCallable("votePhoto");
      voteSuggestion({ photoId, vote });
    },
  },
};
</script>

<style lang="scss" scoped>
.carousel-3d-container {
  position: absolute !important;
  z-index: 10 !important;
  margin-bottom: 0px !important;
}
.carousel-3d-slide {
  border-width: 0px !important;
  height: 100% !important;
}
</style>
