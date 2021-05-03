<template>
  <div class="border p-1 flex flex-row justify-between rounded">
    <div class="flex flex-col justify-between">
      <span>{{ message }}</span>
      <span class="text-xs">{{ timestamp.toLocaleString() }}</span>
    </div>
    <div class="flex">
      <div class="flex flex-col items-center">
        <v-btn @click="$emit('vote', false)" fab text small
          ><v-icon>mdi-arrow-down</v-icon></v-btn
        >
        <span>{{ dislikes }}</span>
      </div>
      <div class="flex flex-col items-center">
        <v-btn @click="$emit('vote', true)" fab text small
          ><v-icon>mdi-arrow-up</v-icon></v-btn
        >
        <span>{{ likes }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
    },
    dislikes: {
      type: Number,
      required: true,
    },
    likes: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
