<template>
  <h1>Currency Converter</h1>
  <CurrencyConverter />
  <CurrencyRates />
</template>

<script>
import axios from "axios";

import CurrencyConverter from "./components/CurrencyConverter.vue";
import CurrencyRates from "./components/CurrencyRates.vue";

const BASE_URL_API = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/";

export default {
  name: "App",
  data() {
    return {
      currencies: [],
    };
  },
  components: {
    CurrencyConverter,
    CurrencyRates,
  },
  methods: {
    initCurrencies(data) {
      for (var e in data) {
        this.currencies.push({
          code: e,
          name: data[e],
        });
      }
    },
    getAllCurrenciesUrl(date = "latest") {
      return BASE_URL_API + date + "/currencies.min.json";
    },
    getAllCurrenciesFromBaseUrl(base, date = "latest") {
      return BASE_URL_API + date + "/currencies/" + base + ".json";
    },
    getCurrencyFromToUrl(from, to, date = "latest") {
      return BASE_URL_API + date + "/currencies/" + from + "/" + to + ".json";
    },
    async getCurrencyFromTo(from, to, date) {
      const resp = await axios({
        method: "get",
        url: this.getCurrencyFromToUrl(from, to, date),
        responseType: "json",
      });
      return resp.data;
    },
    async getAllCurrenciesFromBase(base, date) {
      const resp = await axios({
        method: "get",
        url: this.getAllCurrenciesFromBaseUrl(base, date),
        responseType: "json",
      });
      return resp.data;
    },
  },
  provide() {
    return {
      currencies: this.currencies,
      getFromBase: this.getAllCurrenciesFromBase,
      getFromTo: this.getCurrencyFromTo,
    };
  },
  created() {
    axios({
      method: "get",
      url: this.getAllCurrenciesUrl(),
      responseType: "json",
    }).then((response) => this.initCurrencies(response.data));
  },
};
</script>

<style>
@import "./assets/currency-flags.min.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
