<template>
  <div class="relative flex flex-col items-center">
    <div
      class="absolute flex-col flex items-start p-2 z-10 space-y-4 self-start"
    >
      <v-btn fab text :to="{ name: 'home' }" exact>
        <v-icon>mdi-arrow-left</v-icon></v-btn
      >
    </div>
    <h1 class="font-bold mt-15 text-xl">ResistenciApp</h1>
    <div class="mx-5 mt-5 text-justify">
      <p>
        Somos una plataforma sin anímo de lucro, que entendemos la situación
        actual del país y queremos hacer algo para aportar nuestro grano de
        arena.
      </p>
      <p>
        Sabemos que actualmente los medios de comunicación de nuestro país, no
        muestran la realidad de las manifestaciones que se presentan, por eso
        queremos darles una plataforma descentralizada, al alcance de todas las
        personas, sin importar sus inclinaciones políticas o creencias, para
        poder ver la realidad de nuestro país y compartir con el mismo la
        realidad que estamos viviendo cada uno en nuestras ciudades.
      </p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
