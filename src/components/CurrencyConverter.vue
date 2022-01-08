<template>
  <div class="converter-card">
    <CurrencySelector
      label="From"
      :selected-currency="selectedCurrencies.from"
      @select-currency="onSelectCurrency"
    />
    <div class="reverse-btn" @click="reverseCurrencies">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-left-right"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"
        />
      </svg>
    </div>
    <CurrencySelector
      label="To"
      :selected-currency="selectedCurrencies.to"
      @select-currency="onSelectCurrency"
    />
  </div>
</template>

<script>
import CurrencySelector from "./CurrencySelector.vue";

export default {
  components: {
    CurrencySelector,
  },
  data() {
    return {
      selectedCurrencies: {
        from: { code: "eur", name: "Euro" },
        to: { code: "usd", name: "United States dollar" },
      },
    };
  },
  methods: {
    onSelectCurrency(key, currency) {
      this.selectedCurrencies[key] = currency;
    },
    reverseCurrencies() {
      const tmp = this.selectedCurrencies.from;
      this.selectedCurrencies.from = this.selectedCurrencies.to;
      this.selectedCurrencies.to = tmp;
    },
  },
};
</script>

<style scoped>
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

.reverse-btn {
  margin: 15px;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  border: 1px solid rgb(225, 225, 225);
}

.reverse-btn:hover {
  cursor: pointer;
}

.reverse-btn svg {
  height: 100%;
  /* background: coral; */
}
</style>
