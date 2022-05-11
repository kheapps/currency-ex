<template>
  <div class="converter-card">
    <CurrencyEntry
      label="From"
      :selected-currency="selectedCurrencies.from"
      :disabled="false"
      @set-amount="setAmount"
    />
    <div v-if="!isSmallScreen" class="reverse-btn" @click="reverseCurrencies">
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
    <div v-else class="reverse-btn" @click="reverseCurrencies">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-down-up"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M11.5 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L11 2.707V14.5a.5.5 0 0 0 .5.5zm-7-14a.5.5 0 0 1 .5.5v11.793l3.146-3.147a.5.5 0 0 1 .708.708l-4 4a.5.5 0 0 1-.708 0l-4-4a.5.5 0 0 1 .708-.708L4 13.293V1.5a.5.5 0 0 1 .5-.5z"
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
import axios from "axios";
import { defineComponent } from "vue";
import CurrencyEntry from "./CurrencyEntry/CurrencyEntry.vue";

export default defineComponent({
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
      isSmallScreen: false,
    };
  },
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
    getCurrencyFromToUrl(from, to, date = "latest") {
      return (
        this.$store.getters.baseUrlApi +
        date +
        "/currencies/" +
        from +
        "/" +
        to +
        ".json"
      );
    },
    async getCurrencyFromTo(from, to, date) {
      const resp = await axios({
        method: "get",
        url: this.getCurrencyFromToUrl(from, to, date),
        responseType: "json",
      });
      const d = new Date(Date.now());
      return {
        factor: resp.data[to],
        date: d.toUTCString(),
      };
    },
    onSelectCurrency(key, currency) {
      if (
        (key == "from" && this.selectedCurrencies.to.code == currency.code) ||
        (key == "to" && this.selectedCurrencies.from.code == currency.code)
      ) {
        this.reverseCurrencies();
      }
      this.selectedCurrencies[key] = currency;
      this.getCurrencyFactor();
    },
    reverseCurrencies() {
      const from = this.selectedCurrencies.from;
      this.selectedCurrencies.from = this.selectedCurrencies.to;
      this.selectedCurrencies.to = from;
      this.getCurrencyFactor();
    },
    async getCurrencyFactor() {
      const data = await this.getCurrencyFromTo(
        this.selectedCurrencies.from.code,
        this.selectedCurrencies.to.code
      );
      this.currencyFactor = data.factor;
      this.currencyFactorFetchedDate = data.date;
    },
    setAmount(amount) {
      this.amountEntered = amount;
    },
    sizeChanged(e) {
      this.isSmallScreen = e.target.innerWidth <= 1050;
    },
  },
  created() {
    this.getCurrencyFactor();
    window.addEventListener("resize", this.sizeChanged);
  },
  unmounted() {
    window.removeEventListener("resize", this.sizeChanged);
  },
});
</script>

<style scoped>
.converter-card {
  position: relative;
  width: 850px;
  min-width: 350px;
  height: 250px;
  background: white;
  box-shadow: 3px 5px 7px rgb(225, 225, 225), -3px -3px 5px rgb(225, 225, 225);
  border-radius: 25px;
  margin: 100px;
  box-sizing: border-box;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

@media screen and (max-width: 1050px) {
  .converter-card {
    height: 350px;
    width: 350px;
    flex-direction: column;
  }
}

.reverse-btn {
  margin: 25px 30px;
  width: 35px;
  height: 35px;
  border-radius: 35px;
  border: 1px solid rgb(225, 225, 225);
  background: rgb(55, 105, 105);
  color: white;
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
