<template>
  <div class="currency-select">
    <input
      type="text"
      @focus="onFocusedInput"
      @blur="unFocusInput"
      v-model="searchedText"
    />
    <div class="list-filtered" v-show="isFocused">
      <CurrencyOption
        v-for="(c, i) in filteredCurrencies"
        :key="i"
        :currency="c"
        @mousedown="selectCurrency(c)"
      />
    </div>
  </div>
</template>

<script>
import CurrencyOption from "./CurrencyOption.vue";

export default {
  components: {
    CurrencyOption,
  },
  props: {
    currencies: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isFocused: false,
      searchedText: "",
    };
  },
  methods: {
    onFocusedInput() {
      this.isFocused = true;
      this.searchedText = "";
    },
    unFocusInput() {
      this.isFocused = false;
    },
    selectCurrency(currency) {
      this.unFocusInput();
      this.searchedText = currency.code.toUpperCase();
      console.log(currency);
    },
  },
  computed: {
    filteredCurrencies() {
      return this.currencies.filter(
        (currency) =>
          currency.code
            .toLowerCase()
            .includes(this.searchedText.toLowerCase()) ||
          currency.name.toLowerCase().includes(this.searchedText.toLowerCase())
      );
    },
  },
};
</script>

<style>
.currency-select {
  display: flex;
  flex-direction: column;
  width: 200px;
  margin: auto;
}

.list-filtered {
  overflow-y: scroll;
  height: 150px;
  background: indianred;
  margin-top: 3px;
  border-radius: 10px;
  box-shadow: 2px 2px 3px rgb(225, 225, 225), -1px -2px 3px rgb(225, 225, 225);

  -ms-overflow-style: none; /* Hide scrollbar for IE and Edge */
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}

/* Hide scrollbar for Chrome, Safari and Opera */
.list-filtered::-webkit-scrollbar {
  display: none;
}
</style>
