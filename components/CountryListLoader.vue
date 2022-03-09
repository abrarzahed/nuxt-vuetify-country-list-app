<template>
  <v-row>
    <v-col cols="12" md="3" v-for="item in 8" :key="item">
      <v-skeleton-loader elevation="0" loading type="card"></v-skeleton-loader>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style></style>
