<template>
  <div class="exchange-rates">
    <h1>Exchange rates</h1>
    <CurrencyEntry
      class="currency-selector"
      label="Base"
      :selectedCurrency="selectedCurrency"
      :disabled="true"
    />
  </div>
</template>

<script>
import CurrencyEntry from "./CurrencyEntry/CurrencyEntry.vue";

export default {
  components: {
    CurrencyEntry,
  },
  data() {
    return {
      selectedCurrency: { code: "eur", name: "Euro" },
      exchangeRates: [],
    };
  },
  methods: {
    async onSelectCurrency(_, currency) {
      console.log("Currency rates ");
      console.log(currency);
      this.selectedCurrency = currency;
      const code = this.selectedCurrency.code;
      const rates = await this.getFromBase(code);
      for (const e in rates[code]) {
        if (e != code) this.exchangeRates.push({ [e]: rates[code][e] });
      }
      console.log(this.exchangeRates);
    },
  },
  provide() {
    return {
      onSelectCurrency: this.onSelectCurrency,
    };
  },
  inject: ["getFromBase"],
};
</script>

<style scoped>
.currency-selector {
  margin: 100px 0;
}
</style>
