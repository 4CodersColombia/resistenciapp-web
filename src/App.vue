<template>
  <v-app>
    <v-main>
      <keep-alive>
        <router-view :key="$route.fullPath" />
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
