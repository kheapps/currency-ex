<template>
  <div class="currency-entry">
    <input type="number" />
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
    selectedCurrency: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped></style>
