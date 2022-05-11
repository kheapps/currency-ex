<template>
  <div class="exchange-rates">
    <CurrencyEntry
      class="currency-selector"
      label="Base"
      :selectedCurrency="selectedCurrency"
      :disabled="true"
    />
    <div class="rates-list">
      <ExchangeRateItem v-for="(c, i) in exchangeRates" :key="i" :rate="c" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import CurrencyEntry from "./CurrencyEntry/CurrencyEntry.vue";
import ExchangeRateItem from "./ExchangeRates/ExchangeRateItem.vue";

export default defineComponent({
  components: {
    CurrencyEntry,
    ExchangeRateItem,
  },
  data() {
    return {
      selectedCurrency: { code: "eur", name: "Euro" },
      exchangeRates: [],
      ratesFetchedDate: null,
    };
  },
  provide() {
    return {
      onSelectCurrency: this.onSelectCurrency,
    };
  },
  methods: {
    onSelectCurrency(_, currency) {
      this.selectedCurrency = currency;
      this.updateExhangeRates();
    },
    getAllCurrenciesFromBaseUrl(base, date = "latest") {
      return (
        this.$store.getters.baseUrlApi + date + "/currencies/" + base + ".json"
      );
    },
    async updateExhangeRates() {
      const data = await this.getAllCurrenciesFromBase(
        this.selectedCurrency.code
      );
      this.ratesFetchedDate = data.date;
      this.exchangeRates = data.rates;
    },
    async getAllCurrenciesFromBase(base, date = "latest") {
      const resp = await axios({
        method: "get",
        url: this.getAllCurrenciesFromBaseUrl(base, date),
        responseType: "json",
      });
      const data = resp.data;
      const rates = [];
      for (const e in data[base]) {
        if (e != base) rates.push({ currency: e, value: data[base][e] });
      }
      const d = new Date(Date.now());
      return {
        rates: rates,
        date: d.toUTCString(),
      };
    },
  },
  created() {
    this.updateExhangeRates();
  },
});
</script>

<style scoped>
.currency-selector {
  margin: 50px 0;
}

.rates-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
