<template>
  <div class="currency-option-item">
    {{ currency.code }} - {{ currency.name }}
  </div>
</template>

<script>
export default {
  props: {
    currency: null,
  },
};
</script>

<style>
.currency-option-item {
  height: 50px;
  background: white;
  border-radius: 9px;
  margin: 5px;
  transition: all 250ms ease;
}

.currency-option-item:hover {
  background: rgb(230, 230, 230);
  cursor: pointer;
}
</style>
