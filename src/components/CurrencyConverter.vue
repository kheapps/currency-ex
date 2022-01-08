<template>
  <div class="converter-card">
    <CurrencySelector :defaultCurrency="default1" />
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
      default1: { code: "eur", name: "Euro" },
    };
  },
};
</script>

<style>
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
</style>
