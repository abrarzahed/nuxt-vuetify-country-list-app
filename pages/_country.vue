<template>
  <div>
    <div class="single-country-wrapper">
      <div v-if="$fetchState.pending">
        <SingleCountryLoader />
      </div>
      <div class="single-country" v-if="!$fetchState.pending && countryData">
        <div
          :style="{ backgroundImage: `url('${countryData.flags.svg}')` }"
          class="single-country__flag m-0"
        ></div>
        <div class="single-country__content">
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
          <v-row dense>
            <!-- First column -->
            <v-col cols="12" md="3" class="pa-2 pa-md-5">
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
            </v-col>

            <!-- Second column -->
            <v-col cols="12" md="3" class="pa-2 pa-md-5">
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
                <strong>
                  {{
                    String(countryData.population).replace(
                      /(.)(?=(\d{3})+$)/g,
                      "$1,"
                    )
                  }}</strong
                >
              </p>
              <p>
                <v-icon>mdi-map-marker-path</v-icon> Area:
                <strong>
                  {{
                    String(countryData.area).replace(/(.)(?=(\d{3})+$)/g, "$1,")
                  }}</strong
                >
              </p>
            </v-col>

            <!-- Third column -->
            <v-col cols="12" md="3" class="pa-2 pa-md-5">
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
            </v-col>

            <!-- Fourth column -->
            <v-col cols="12" md="3" class="pa-2 pa-md-5">
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
            </v-col>
          </v-row>
        </div>
      </div>
    </div>

    <!-- fetch another country with same first letter -->

    <div v-if="!$fetchState.pending && matchedCountries.length" class="mt-16">
      <h5 class="mb-8 text-h5 font-weight-bold">
        Countries that start with "{{ firstLatter }}"
      </h5>

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
      <div v-if="!allCountries.length">
        <CountryListLoader />
      </div>
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
        (item) =>
          item.name[0] == this.firstLatter &&
          item.name !== this.countryData.name
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
    border-radius: 20px;
    box-shadow: 0px 0px 30px 10px rgba(0, 0, 0, 0.05);
    &__flag {
      box-shadow: -2px 0px 10px rgba(0, 0, 0, 0.1);
      border-radius: 20px;
      min-height: 500px;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      @media (max-width: 768px) {
        min-height: 300px;
      }
    }
    &__content {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      padding: 30px;
      display: grid;
      gap: 10px;
    }
  }
}
</style>
