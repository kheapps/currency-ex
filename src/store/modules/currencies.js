import axios from "axios";

export default {
  state() {
    return {
      currencies: [],
    };
  },
  mutations: {
    setCurrencies(state, payload) {
      const data = payload.currencies;
      for (var e in data) {
        state.currencies.push({
          code: e,
          name: data[e],
        });
      }
    },
  },
  actions: {
    async initCurrencies(ctx) {
      const resp = await axios({
        method: "get",
        url: "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json",
        responseType: "json",
      });

      ctx.commit("setCurrencies", { currencies: resp.data });
    },
  },
  getters: {
    currencies(state) {
      return state.currencies;
    },
  },
};
