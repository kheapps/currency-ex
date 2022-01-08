<template>
  <div class="currency-select">
    <input
      class="currency-filter-input"
      type="text"
      @focus="onEnterInput"
      @blur="onExitInput"
      @keyup="updateList"
      v-model="searchedText"
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
    onEnterInput() {
      this.isFocused = true;
      this.searchedText = "";
    },
    onExitInput() {
      this.isFocused = false;
    },
    selectCurrency(currency) {
      this.isFocused = false;
      this.searchedText = currency.code.toUpperCase();
    },
    updateList() {},
  },
  computed: {
    filteredCurrencies() {
      // reset the list position to top
      console.log("filterd currencie computed property");
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
  },
};
</script>

<style scoped>
.currency-select {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 15px auto;
  padding: 0;
  align-items: center;
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

.currency-filter-input {
  width: 150px;
  height: 50px;
  box-sizing: border-box;
  text-align: center;
  font-size: 1.3em;
  padding: 5px 0;
  border-radius: 10px;
  border: 1px solid rgb(235, 235, 235);
  box-shadow: 1px 1px 3px rgb(225, 225, 225), -1px -1px 3px rgb(225, 225, 225);
}

p {
  font-size: 0.7em;
  color: grey;
}
</style>
