<template>
  <div>
    <v-row dense>
      <!-- <v-col cols="12" md="3" v-for=""></v-col> -->
    </v-row>
    <h2 v-if="!allCountries.length">Loading....</h2>
    <div class="country" v-if="getListType == 'count'">
      <div
        v-for="(item, i) in countedCountries"
        :key="i"
        class="card"
        :class="{ dark: $vuetify.theme.dark }"
        @click="goToCountryPage(item.name)"
      >
        <div
          class="card__image"
          :style="{ backgroundImage: `url('${item.flags.svg}')` }"
        ></div>
        <div class="card__content">
          <h2 class="card__title">{{ item.name }}</h2>
          <p class="card__subtitle">
            <span>{{ item.independent ? "Independent" : "Dependent" }}</span>
            <v-icon :color="item.independent ? 'primary' : 'info'" right>{{
              item.independent ? "mdi-check-circle" : "mdi-minus-circle"
            }}</v-icon>
          </p>
        </div>
      </div>
    </div>
    <div class="country" v-if="getListType == 'search'">
      <div
        v-for="(item, i) in searchedCountries"
        :key="i"
        class="card"
        :class="{ dark: $vuetify.theme.dark }"
        @click="goToCountryPage(item.name)"
      >
        <div
          class="card__image"
          :style="{ backgroundImage: `url('${item.flags.svg}')` }"
        ></div>
        <div class="card__content">
          <h2 class="card__title">{{ item.name }}</h2>
          <p class="card__subtitle">
            <span>{{ item.independent ? "Independent" : "Dependent" }}</span>
            <v-icon :color="item.independent ? 'primary' : 'info'" right>{{
              item.independent ? "mdi-check-circle" : "mdi-minus-circle"
            }}</v-icon>
          </p>
        </div>
      </div>
    </div>
    <div
      v-if="allCountries.length && getListType == 'count'"
      class="btn-group d-flex my-10 justify-center"
    >
      <v-btn
        v-if="countedCountries.length < 250"
        @click="count += 8"
        class="button-capitalize"
        tile
        depressed
        large
        color="secondary"
        >Show More</v-btn
      >
      <v-btn
        v-if="countedCountries.length > 8"
        @click="count -= 8"
        class="button-capitalize"
        tile
        depressed
        large
        >Show Less</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {},
  async fetch() {
    this.getCountries();
  },
  data() {
    return {
      count: 8,
    };
  },
  methods: {
    ...mapActions("country", ["getCountries"]),
    goToCountryPage(name) {
      this.$router.push(`/${name}`);
    },
  },
  computed: {
    ...mapGetters("country", ["allCountries", "getSearchTerm", "getListType"]),
    searchedCountries() {
      return this.allCountries.filter((item) =>
        item.name.includes(this.getSearchTerm)
      );
    },
    countedCountries() {
      return this.allCountries.slice(0, this.count);
    },
  },
  mounted() {},
  updated() {},
};
</script>
<style lang="scss">
.country {
  align-items: center;
  gap: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  isolation: isolate;
  justify-content: center;
  align-items: stretch;
  .card {
    --background: #ddd;
    --border-radius: 0.8rem;
    display: flex;
    flex-direction: column;
    position: relative;
    cursor: pointer;
    &.dark {
      --background: #444;
    }
    &::after {
      background: var(--background);
      border-radius: var(--border-radius);
      bottom: 0;
      content: "";
      display: block;
      height: calc(100% - 2.5rem);
      position: absolute;
      right: -0.5rem;
      width: 100%;
      z-index: -1;
      transition: all ease 0.2s;
      transition-property: width, height, bottom;
    }
    &:hover::after {
      width: calc(100% + 1rem);
      height: calc(100% + 1rem);
      bottom: -0.1rem;
    }
    &__content {
      text-align: center;
      padding: 1rem 2rem 0;
      display: grid;
      gap: 5px;
    }
    &__title {
      line-height: 1.2;
      margin-bottom: 0;
      font-size: 20px;
    }
    &__image {
      border: 1px solid #ddd;
      border-radius: var(--border-radius);
      order: -1;
      height: 140px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }
}
</style>
