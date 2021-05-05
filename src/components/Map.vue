<template>
  <MglMap
    :accessToken="accessToken"
    :mapStyle.sync="mapStyle"
    class="w-scree h-screen absolute"
    style="z-index: 0"
    :center.sync="initialCenter"
    :zoom="5"
    interactive
    @load="onMapLoaded"
    @touchend="(v) => $emit('touchend', v)"
    @click="(v) => $emit('click', v)"
  >
    <MglGeolocateControl ref="geoLocate" position="top-left" />
    <MglMarker
      v-if="markerUpload"
      :coordinates="markerUpload.coordinates"
      anchor="bottom"
      @click="$emit('clickMarkerUpload')"
    >
      <img
        :src="require('../assets/marker-upload.png')"
        slot="marker"
        class="w-10"
      />
    </MglMarker>
    <MglMarker
      v-for="(marker, i) in markers"
      :key="i"
      :coordinates="marker.coordinates"
      anchor="bottom"
      @click="$emit('on-marker-click', marker.id)"
    >
      <img :src="require('../assets/marker.png')" slot="marker" class="w-10" />
    </MglMarker>
  </MglMap>
</template>

<script>
import Mapbox from "mapbox-gl";
import { MglMap, MglGeolocateControl, MglMarker } from "vue-mapbox";
import { MAPBOX_TOKEN } from "../../.env.js";

export default {
  name: "Home",
  props: {
    markerUpload: {
      type: Object,
      required: false,
    },
    markers: {
      type: Array,
      default: () => [],
    },
    center: {
      type: Array,
      required: true,
    },
  },
  components: {
    MglMarker,
    MglGeolocateControl,
    MglMap,
  },
  created() {
    this.mapbox = Mapbox;
  },
  data() {
    return {
      initialCenter: this.center,
      accessToken: MAPBOX_TOKEN,
      mapStyle: "mapbox://styles/mapbox/light-v10",
    };
  },
  watch: {
    center(newValue) {
      this.jumpTo(newValue);
    },
  },
  methods: {
    jumpTo() {
      if (!this.map) return;
      this.map.easeTo({
        center: this.center,
        zoom: 14,
        duration: 1000,
      });
    },
    onMapLoaded(event) {
      this.map = event.map;
      setTimeout(() => {
        this.$refs.geoLocate.trigger();
      }, 1000);
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition(
        (location) => {
          this.currentLocation = [
            location.coords.latitude,
            location.coords.longitude,
          ];
        },
        () => {}
      );
    },
  },
};
</script>
