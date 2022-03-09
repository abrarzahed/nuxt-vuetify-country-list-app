export const state = () => ({
  countries: [],
  searchTerm: "",
  listType: "count",
});
export const mutations = {
  SET_COUNTRIES(state, countries) {
    state.countries = countries;
  },
  SET_SEARCH_TERM(state, searchTerm) {
    state.searchTerm = searchTerm;
  },
  SET_LEST_TYPE(state, type) {
    state.listType = type;
  },
};
export const actions = {
  async getCountries(context) {
    console.log(`fetching data in store`);

    const res = await fetch("https://restcountries.com/v2/all");
    console.log(`res`, res);

    const countries = await res.json();
    // console.log(countries);
    context.commit("SET_COUNTRIES", countries);
  },
  setSearchTerm(context, searchTerm) {
    context.commit("SET_SEARCH_TERM", searchTerm);
  },
  setListType(context, type) {
    console.log(`store list type`, type);

    context.commit("SET_LEST_TYPE", type);
  },
};
export const getters = {
  allCountries(state) {
    return state.countries;
  },
  getSearchTerm(state) {
    return state.searchTerm;
  },
  getListType(state) {
    return state.listType;
  },
};
