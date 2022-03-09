<template>
  <div>
    <div class="single-country-wrapper">
      <h2 v-if="$fetchState.pending">single country Loading....</h2>
      <div class="single-country" v-if="!$fetchState.pending && countryData">
        <div
          :style="{ backgroundImage: `url('${countryData.flags.svg}')` }"
          class="single-country__flag m-0"
        ></div>
        <v-col class="single-country__content">
          <h4 class="text-h4 font-weight-medium">
            {{ countryData.name }} <br />
            <span
              class="text-h6"
              :class="{ 'primary--text': countryData.independent }"
              >{{ countryData.independent ? "Independent" : "Dependent" }}</span
            >
            <v-icon
              large
              :color="countryData.independent ? 'primary' : 'info'"
              right
              >{{
                countryData.independent
                  ? "mdi-check-circle"
                  : "mdi-minus-circle"
              }}</v-icon
            >
          </h4>
          <div class="data">
            <p>
              <v-icon>mdi-web</v-icon> Region:
              <strong> {{ countryData.region }}</strong>
            </p>
            <p>
              <v-icon>mdi-dots-hexagon</v-icon> Subregion:
              <strong> {{ countryData.subregion }}</strong>
            </p>
            <p>
              <v-icon>mdi-dots-hexagon</v-icon> Capital:
              <strong> {{ countryData.capital }}</strong>
            </p>
            <p v-if="countryData.topLevelDomain">
              <v-icon>mdi-web</v-icon> Top label domain:
              <strong> {{ countryData.topLevelDomain[0] }}</strong>
            </p>
            <p>
              <v-icon>mdi-dots-hexagon</v-icon> Alpha code:
              <strong>
                {{ countryData.alpha2Code }},
                {{ countryData.alpha3Code }}</strong
              >
            </p>
            <p v-if="countryData.callingCodes">
              <v-icon>mdi-phone</v-icon> Phone code:
              <strong> {{ countryData.callingCodes[0] }}</strong>
            </p>
            <p>
              <v-icon>mdi-account-group</v-icon> Population:
              <strong> {{ countryData.population }}</strong>
            </p>
            <p>
              <v-icon>mdi-map-marker-path</v-icon> Area:
              <strong> {{ countryData.area }}</strong>
            </p>
            <p v-if="countryData.timezones">
              <v-icon>mdi-clock-outline</v-icon> Timezone:
              <strong> {{ countryData.timezones[0] }}</strong>
            </p>
            <p>
              <v-icon>mdi-dots-hexagon</v-icon> Borders:
              <strong v-for="(border, i) in countryData.borders" :key="i">
                {{ border }},</strong
              >
            </p>
            <p>
              <v-icon>mdi-dots-hexagon</v-icon> Native name:
              <strong> {{ countryData.nativeName }}</strong>
            </p>
            <p>
              <v-icon>mdi-dots-hexagon</v-icon> Numeric code:
              <strong> {{ countryData.numericCode }}</strong>
            </p>
            <p v-for="(currency, i) in countryData.currencies" :key="i">
              <v-icon>mdi-cash</v-icon> Currencies: { <br />
              Code: <strong> {{ currency.code }}</strong
              ><br />
              Name: <strong> {{ currency.name }}</strong
              ><br />
              Symbol: <strong> {{ currency.symbol }}</strong
              ><br />}
            </p>
            <p v-if="countryData.regionalBlocs">
              <v-icon>mdi-dots-hexagon</v-icon> Regional Block:
              <strong> {{ countryData.regionalBlocs[0].name }}</strong>
            </p>
          </div>
          <!-- <p>{{ countryData }}</p> -->
        </v-col>
      </div>
    </div>

    <!-- fetch another country with same first letter -->

    <div v-if="!$fetchState.pending" class="mt-10">
      <h2 class="mb-5">Countries that start with "{{ firstLatter }}"</h2>
      <div class="country" v-if="getListType == 'search'">
        <div
          v-for="(item, i) in matchedCountries"
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
      <h2 v-if="!allCountries.length">Loading....</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  layout: "singe",
  async fetch() {
    console.log("fetching data in single country page");
    const res = await fetch(
      `https://restcountries.com/v2/name/${this.$route.params.country}`
    );
    const data = await res.json();
    this.countryData = await data[0];
    this.firstLatter = await this.countryData.name.charAt(0);
    console.log(`country data`, this.countryData, this.firstLatter);
  },
  data() {
    return {
      countryData: null,
      firstLatter: "",
    };
  },
  methods: {
    ...mapActions("country", ["setListType"]),
    goToCountryPage(name) {
      this.$router.push(`/${name}`);
    },
  },
  computed: {
    ...mapGetters("country", ["allCountries", "getListType"]),
    matchedCountries() {
      return this.allCountries.filter(
        (item) => item.name[0] == this.firstLatter
      );
    },
  },
  mounted() {
    this.setListType("search");
  },
  beforeDestroy() {
    this.setListType("count");
  },
};
</script>

<style lang="scss">
.single-country-wrapper {
  .single-country {
    // align-items: stretch;
    // display: flex;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    &__flag {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
      border-radius: 8px;
      min-height: 500px;
      // height: 100%;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      flex-basis: 70%;
      // border-top-right-radius: 20px;
      border-right: 2px solid #eee;
    }
    &__content {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      flex-basis: 40%;
      padding: 30px;
      display: grid;
      gap: 10px;
      .data {
        display: grid;
        gap: 6px;
        p {
          margin: 0;
        }
      }
    }
  }
}
</style>
