<template>
  <div class="currency-select">
    <div
      :class="'currency-flag currency-flag-' + selectedCurrency.code"
      v-show="!isFocused"
    ></div>
    <div class="label">{{ label }}</div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="16"
      fill="currentColor"
      class="bi bi-chevron-down"
      viewBox="0 0 16 16"
      v-show="!isFocused"
    >
      <path
        fill-rule="evenodd"
        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
      />
    </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="16"
      fill="currentColor"
      class="bi bi-x close-btn"
      viewBox="0 0 16 16"
      v-show="isFocused"
    >
      <path
        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
      />
    </svg>
    <input
      type="text"
      @focus="onEnterInput"
      @blur="onExitInput"
      @keyup="updateList"
      @keydown.enter="selectFirstResult"
      v-model="searchedText"
      placeholder="Search"
      ref="searchInput"
    />
    <div
      id="testList"
      class="list-filtered"
      v-show="isFocused"
      ref="currenciesList"
    >
      <CurrencyOption
        v-for="(c, i) in filteredCurrencies"
        :key="i"
        :currency="c"
        @mousedown="selectCurrency(c)"
      />
      <p v-if="noElementFound">No currency found.</p>
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
    label: {
      type: String,
      default: "",
    },
    selectedCurrency: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFocused: false,
      searchedText: "",
      //   selectedCurrency: this.defaultCurrency,
    };
  },
  inject: ["currencies", "onSelectCurrency"],
  computed: {
    filteredCurrencies() {
      // reset the list position to top
      const list = this.$refs.currenciesList;
      if (list) list.scrollTop = 0;

      // update list content with serched text
      return this.currencies.filter(
        (currency) =>
          currency.code
            .toLowerCase()
            .includes(this.searchedText.toLowerCase()) ||
          currency.name.toLowerCase().includes(this.searchedText.toLowerCase())
      );
    },
    noElementFound() {
      return this.filteredCurrencies.length == 0;
    },
    selectedCurrencyFlag() {
      return this.selectedCurrency ? this.selectedCurrency.code : "eur";
    },
  },
  watch: {
    selectedCurrency(currency) {
      this.searchedText = currency.code.toUpperCase();
    },
  },
  methods: {
    onEnterInput() {
      this.isFocused = true;
      this.searchedText = "";
    },
    onExitInput() {
      this.isFocused = false;
      this.searchedText = this.selectedCurrency.code.toUpperCase();
    },
    selectCurrency(currency) {
      this.isFocused = false;
      this.searchedText = currency.code.toUpperCase();
      this.onSelectCurrency(this.label.toLowerCase(), currency);
    },
    selectFirstResult() {
      if (this.filteredCurrencies.length > 0)
        this.selectCurrency(this.filteredCurrencies[0]);
      this.$refs.searchInput.blur();
    },
  },
  mounted() {
    this.searchedText = this.selectedCurrency.code.toUpperCase();
  },
};
</script>

<style scoped>
.currency-select {
  position: relative;
  display: flex;
  flex-direction: row;
  padding: 0;
  align-items: center;
  background: white;
  border-radius: 10px;
}

.list-filtered {
  position: absolute;
  top: 55px;
  z-index: 10;
  overflow-y: scroll;
  max-height: 150px;
  min-height: 50px;
  width: 150px;
  background: white;
  box-sizing: border-box;
  padding: 5px;
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

input {
  z-index: 2;
  background: transparent;
  width: 150px;
  height: 50px;
  box-sizing: border-box;
  text-align: center;
  font-size: 1.3em;
  padding: 5px 0;
  border-radius: 10px;
  border: 1px solid rgb(235, 235, 235);
  box-shadow: 1px 1px 3px rgb(225, 225, 225), -1px -1px 3px rgb(225, 225, 225);
  cursor: pointer;
}

input:focus {
  cursor: text;
  outline: none;
}

p {
  font-size: 0.7em;
  color: grey;
}

.currency-flag {
  position: absolute;
  top: calc(50% - 8px);
  left: 15px;
}

svg {
  position: absolute;
  right: 10px;
  top: 25%;
  height: 50%;
}

.close-btn {
  z-index: 3;
  cursor: pointer;
}

.label {
  position: absolute;
  top: -23px;
  right: 5px;
  font-size: 0.9em;
  font-weight: 700;
  color: rgb(55, 105, 105);
}
</style>
