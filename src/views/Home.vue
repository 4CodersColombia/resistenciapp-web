<template>
  <div class="relative h-screen w-screen flex flex-col">
    <div
      class="absolute flex-col flex items-end p-2 z-10 bg-black bg-opacity-10 self-end"
    >
      <v-btn :to="{ name: 'suggestions' }" color="primary" fab
        ><v-icon>mdi-message-alert</v-icon></v-btn
      >
    </div>
    <carousel-photos
      class="absolute bottom-2 z-10"
      v-if="markers.length"
      :photos="markers"
      @slide-change="(v) => (mapCenter = markers[v].coordinates)"
    ></carousel-photos>
    <div
      v-else
      class="absolute flex items-center backdrop-filter backdrop-blur-sm bottom-10 z-10 self-center p-5 rounded-xl bg-black bg-opacity-5"
    >
      <span class="font-semibold mx-2">Toca el mapa para subir una foto</span>
    </div>
    <Map
      :markers="markers"
      :markerUpload="markerUpload"
      @click="showUploadMarker"
      @clickMarkerUpload="showUploadDialog = true"
      :center="mapCenter"
    />
    <upload-dialog
      :show.sync="showUploadDialog"
      :coordinates="markerUpload.coordinates"
      v-if="markerUpload"
    ></upload-dialog>
  </div>
</template>

<script>
import CarouselPhotos from "../components/CarouselPhotos.vue";
import UploadDialog from "../components/uploadDialog.vue";
import { BOGOTA_LOCATION } from "../constants";
import { db } from "../firebaseConfig";
import { getCoordinate } from "../utils";
const Map = () => import("@/components/Map.vue");

export default {
  components: {
    Map,
    CarouselPhotos,
    UploadDialog,
  },
  created() {
    db.collection("photos").onSnapshot((snapshot) => {
      this.markers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        coordinates: getCoordinate(doc.data().geohash),
      }));
    });
  },
  data() {
    return {
      markers: [],
      markerUpload: null,
      showUploadDialog: false,
      mapCenter: BOGOTA_LOCATION,
    };
  },
  methods: {
    showUploadMarker(e) {
      const coords = e.mapboxEvent.lngLat;
      this.markerUpload = { coordinates: [coords.lng, coords.lat] };
    },
  },
};
</script>

<style lang="scss" scoped></style>
