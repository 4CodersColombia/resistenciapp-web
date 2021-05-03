<template>
  <v-dialog v-model="showDialog">
    <div class="flex flex-col bg-white p-5 rounded-lg">
      <div class="flex justify-between mb-3">
        <img :src="require('@/assets/logo.png')" alt="" srcset="" />
        <v-btn fab class="self-end mb-1" small text @click="showDialog = false">
          <v-icon>mdi-close</v-icon></v-btn
        >
      </div>
      <v-text-field
        v-model="title"
        placeholder="Escribe un titulo para tu foto"
        outlined
      ></v-text-field>
      <v-file-input
        v-model="file"
        placeholder="Haz click aquí para subir una foto"
        outlined
      ></v-file-input>
      <v-btn
        @click="uploadPhoto"
        color="primary"
        :disabled="!validForm"
        :loading="loading"
        >Listo!</v-btn
      >
    </div>
  </v-dialog>
</template>

<script>
import { functions, storageRef } from "../firebaseConfig";
import imageCompression from "browser-image-compression";
import { getGeohash, isFileImage } from "../utils";

export default {
  props: {
    show: {
      type: Boolean,
      required: true,
    },
    coordinates: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      title: "",
      file: null,
      loading: false,
    };
  },
  computed: {
    showDialog: {
      get() {
        return this.show;
      },
      set(val) {
        this.$emit("update:show", val);
      },
    },
    validForm() {
      if (!this.file) return false;
      if (!this.title) return false;
      if (!isFileImage(this.file)) return false;
      return true;
    },
  },
  methods: {
    async uploadPhotoStorage(ref, file) {
      const getFileExtension = (filename) =>
        filename.substring(filename.lastIndexOf(".") + 1, filename.length) ||
        filename;
      const generateRandomId = () =>
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      if (!isFileImage(file)) throw new Error("El archivo no es una imagen.");
      const fileExtension = getFileExtension(file.name);
      const fileId = generateRandomId();

      return storageRef
        .ref(`${ref}/${fileId}.${fileExtension}`)
        .put(file)
        .then((res) => res.ref.getDownloadURL());
    },
    async uploadPhoto() {
      this.loading = true;
      const fileCompressed = await this.compressPhoto(this.file);
      const photoUrl = await this.uploadPhotoStorage("photos", fileCompressed);

      const createPhoto = functions.httpsCallable("createPhoto");
      await createPhoto({
        photoUrl,
        comment: this.title,
        geohash: getGeohash(this.coordinates),
      });
      window.alert("Imagen subida con éxito!");
      this.showDialog = false;
      this.loading = false;
    },
    async compressPhoto() {
      const options = {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 1080,
        useWebWorker: true,
      };

      const compressedPhoto = await imageCompression(this.file, options);
      return compressedPhoto;
    },
  },
};
</script>

<style lang="scss" scoped></style>
