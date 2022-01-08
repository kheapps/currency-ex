<template>
  <h1>Currency Converter</h1>
  <CurrencyConverter />
</template>

<script>
import axios from "axios";

import CurrencyConverter from "./components/CurrencyConverter.vue";

export default {
  name: "App",
  data() {
    return {
      currencies: [],
    };
  },
  components: {
    CurrencyConverter,
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
  },
  provide() {
    return {
      currencies: this.currencies,
    };
  },
  created() {
    axios({
      method: "get",
      url: "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json",
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
