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
import CurrencyEntry from "./CurrencyEntry/CurrencyEntry.vue";
import ExchangeRateItem from "./ExchangeRates/ExchangeRateItem.vue";

export default {
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
  inject: ["getFromBase"],
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
    async updateExhangeRates() {
      const data = await this.getFromBase(this.selectedCurrency.code);
      this.ratesFetchedDate = data.date;
      this.exchangeRates = data.rates;
    },
  },
  created() {
    this.updateExhangeRates();
  },
};
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
