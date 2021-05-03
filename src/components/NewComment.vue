<template>
  <div class="flex flex-col">
    <v-textarea
      auto-grow
      height="50"
      outlined
      placeholder="Agrega un comentario"
      v-model="textComment"
    ></v-textarea>
    <v-btn color="primary" @click="$emit('send-comment')" :disabled="!text"
      >Enviar</v-btn
    >
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  computed: {
    textComment: {
      get() {
        return this.text;
      },
      set(v) {
        this.$emit("update:text", v);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
