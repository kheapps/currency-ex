<template>
  <div class="currency-entry">
    <p class="invalid-entry-hint" v-show="isInvalidEntry">
      Please enter a valid amount
    </p>
    <input
      :class="{ invalid: isInvalidEntry }"
      type="text"
      placeholder="Amount"
      :disabled="disabled"
      v-model="amountModel"
      @keyup="validEntry"
    />
    <CurrencySelector :label="label" :selectedCurrency="selectedCurrency" />
  </div>
</template>

<script>
import CurrencySelector from "./CurrencySelector.vue";

export default {
  components: {
    CurrencySelector,
  },
  props: {
    label: {
      type: String,
      default: "Label",
    },
    disabled: {
      type: Boolean,
      default: true,
    },
    selectedCurrency: {
      type: Object,
      required: true,
    },
    amount: {
      type: Number,
      default: 1.0,
    },
  },
  data() {
    return {
      amountModel: "",
      isInvalidEntry: false,
    };
  },
  watch: {
    amount(amountValue) {
      this.amountModel = amountValue;
    },
  },
  methods: {
    validEntry() {
      const amountStr = this.amountModel.replace(",", ".");
      if (amountStr == "" || +amountStr) {
        this.isInvalidEntry = false;
        this.$emit("set-amount", +amountStr);
      } else {
        this.isInvalidEntry = true;
      }
    },
  },
  created() {
    this.amountModel = this.amount;
  },
};
</script>

<style scoped>
.currency-entry {
  position: relative;
  display: inline-flex;
  padding: 0;
  align-items: center;
}

input {
  height: 50px;
  width: 125px;
  margin: 0;
  margin-right: -25px;
  padding: 15px;
  padding-right: 35px;
  box-sizing: border-box;
  border-radius: 15px 0 0 15px;
  border: none;
  background: rgb(245, 245, 250);
  font-size: 1em;
  font-weight: bold;
  transition: all 150ms ease;
}

input:focus {
  outline: none;
}

input:disabled {
  background: rgb(230, 230, 235);
}

input.invalid {
  background: rgb(255, 225, 225);
}

.invalid-entry-hint {
  position: absolute;
  bottom: -25px;
  left: 10px;
  margin: 0;
  font-size: 1em;
  height: 20px;
  color: rgb(225, 75, 95);
}
</style>
