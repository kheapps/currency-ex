<template>
  <div class="converter-card">
    <CurrencyEntry
      label="From"
      :selected-currency="selectedCurrencies.from"
      :disabled="false"
      @set-amount="setAmount"
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
    <CurrencyEntry
      label="To"
      :selected-currency="selectedCurrencies.to"
      :amount="convertedAmount"
    />
    <p class="date">{{ currencyFactorFetchedDate }}</p>
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
      selectedCurrencies: {
        from: { code: "eur", name: "Euro" },
        to: { code: "usd", name: "United States dollar" },
      },
      currencyFactor: 0,
      amountEntered: 1.0,
      currencyFactorFetchedDate: Date,
    };
  },
  inject: ["getFromTo"],
  provide() {
    return {
      onSelectCurrency: this.onSelectCurrency,
    };
  },
  computed: {
    convertedAmount() {
      return this.currencyFactor * this.amountEntered;
    },
  },
  methods: {
    onSelectCurrency(key, currency) {
      if (
        (key = "from" && this.selectedCurrencies.to.code == currency.code) ||
        (key = "to" && this.selectedCurrencies.from.code == currency.code)
      ) {
        this.reverseCurrencies();
      }
      this.selectedCurrencies[key] = currency;
      this.getCurrencyFactor();
    },
    reverseCurrencies() {
      const tmp = this.selectedCurrencies.from;
      this.selectedCurrencies.from = this.selectedCurrencies.to;
      this.selectedCurrencies.to = tmp;
      this.getCurrencyFactor();
    },
    async getCurrencyFactor() {
      const data = await this.getFromTo(
        this.selectedCurrencies.from.code,
        this.selectedCurrencies.to.code
      );
      this.currencyFactor = data.factor;
      this.currencyFactorFetchedDate = data.date;
    },
    setAmount(amount) {
      this.amountEntered = amount;
    },
  },
  created() {
    this.getCurrencyFactor();
  },
};
</script>

<style scoped>
.converter-card {
  position: relative;
  width: 60%;
  min-width: 450px;
  height: 250px;
  background: white;
  box-shadow: 3px 5px 7px rgb(225, 225, 225), -3px -3px 5px rgb(225, 225, 225);
  border-radius: 25px;
  margin: 100px auto;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 1050px) {
  .converter-card {
    height: 300px;
    flex-direction: column;
  }
}

.reverse-btn {
  margin: 25px 30px;
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

.date {
  position: absolute;
  right: 25px;
  bottom: 0;
  height: 20px;
  font-size: 0.7em;
}
</style>
