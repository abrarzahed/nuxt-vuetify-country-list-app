<template>
  <v-app>
    <v-app-bar flat hide-on-scroll fixed app>
      <v-container>
        <v-row align="center" dense class="ma-0 pa-0">
          <v-col cols="2" class="ma-0 pa-0"
            ><v-btn fab small depressed color="secondary" large to="/">
              <v-icon x-large>mdi-earth</v-icon>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="10" md="6" align-self="center" class="pa-0">
            <div class="search-bar">
              <v-text-field
                outlined
                filled
                rounded
                dense
                clearable
                v-model.trim="searchTerm"
                color="secondary"
                class="mt-6 pa-0 ml-3 mr-md-0"
                placeholder="Search by country name"
                append-icon="mdi-search-web"
                @keyup="handleSearch"
                @click:clear.stop="clearListType"
              ></v-text-field>
              <v-btn
                fab
                small
                depressed
                dark
                class="ml-2 ml-md-10"
                @click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
              >
                <v-icon>mdi-brightness-4</v-icon>
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container class="py-10">
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "DefaultLayout",
  data() {
    return {
      searchTerm: "",
      listType: "count",
    };
  },

  methods: {
    ...mapActions("country", ["setSearchTerm", "setListType"]),
    handleSearch() {
      this.listType = "search";

      this.setListType(this.listType);
      let ltr = "";
      if (this.searchTerm) {
        ltr =
          this.searchTerm.charAt(0).toUpperCase() + this.searchTerm.slice(1);
        this.setSearchTerm(ltr);
      }
    },

    clearListType() {
      this.listType = "count";
      // console.log(`clear`, this.listType);

      this.setListType("count");
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.1) !important;
}

.search-bar {
  display: flex;
  align-items: center;
  .my-0 {
    margin-top: -3px !important;
    padding: 18px 20px !important;
  }
}
.v-text-field.v-text-field--enclosed:not(.v-text-field--rounded)
  > .v-input__control
  > .v-input__slot,
.v-text-field.v-text-field--enclosed .v-text-field__details {
  border-radius: 0;
}
</style>
