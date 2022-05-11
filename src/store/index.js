import { createStore } from "vuex";

import currenciesModule from "./modules/currencies.js";

const store = createStore({
  modules: {
    curr: currenciesModule,
  },
  state() {
    return {};
  },
  mutations: {},
  actions: {},
  getters: {},
});

export default store;
