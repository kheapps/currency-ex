<template>
  <div class="converter-card">
    <CurrencySelector :currencies="currencies" :defaultCurrency="default1" />
  </div>
</template>

<script>
import axios from "axios";

import CurrencySelector from "./CurrencySelector.vue";

export default {
  components: {
    CurrencySelector,
  },
  data() {
    return {
      currencies: [],
      select: null,
      default1: { code: "eur", name: "Euro" },
    };
  },
  created() {
    axios({
      method: "get",
      url: "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies.min.json",
      responseType: "json",
    }).then((response) => this.initCurrencies(response.data));
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
};
</script>

<style>
.converter-card {
  width: 60%;
  height: 250px;
  background: white;
  box-shadow: 3px 5px 7px rgb(225, 225, 225), -3px -3px 5px rgb(225, 225, 225);
  border-radius: 25px;
  margin: 100px auto;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
