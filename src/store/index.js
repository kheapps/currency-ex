import { createStore } from "vuex";

import currenciesModule from "./modules/currencies.js";

const store = createStore({
  modules: {
    curr: currenciesModule,
  },
  state() {
    return {
      baseUrlApi: "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/",
    };
  },
  mutations: {},
  actions: {},
  getters: {
    baseUrlApi(state) {
      return state.baseUrlApi;
    },
  },
});

export default store;
