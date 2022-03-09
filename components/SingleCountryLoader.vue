<template>
  <div>
    <v-skeleton-loader elevation="0" loading type="card"></v-skeleton-loader>
    <v-row dense class="mt-8">
      <v-col class="" cols="12" md="3" v-for="item in 4" :key="item">
        <v-skeleton-loader
          elevation="0"
          loading
          type="list-item-three-line"
        ></v-skeleton-loader>
        <v-skeleton-loader
          elevation="0"
          loading
          type="list-item-two-line"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
