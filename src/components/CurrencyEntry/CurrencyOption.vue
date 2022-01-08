<template>
  <div class="currency-option-item">
    <div :class="'currency-flag currency-flag-' + currency.code"></div>
    <h1>{{ currency.code.toUpperCase() }}</h1>
    <h3 :title="currency.name">{{ fullName }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    currency: null,
  },
  computed: {
    fullName() {
      const name = this.currency.name;
      return name.length > 20 ? name.substring(0, 20) + "..." : name;
    },
  },
};
</script>

<style scoped>
.currency-option-item {
  position: relative;
  height: 50px;
  padding: 5px 0;
  box-sizing: border-box;
  background: white;
  border-radius: 9px;
  transition: all 250ms ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.currency-option-item:hover {
  background: rgb(230, 230, 230);
  cursor: pointer;
}

h1,
h3 {
  height: 50%;
  align-content: center;
  /* background-color: aliceblue;
  border: 1px solid orangered; */
  margin: 0;
  display: flex;
}

.currency-option-item h1 {
  font-size: 1.3em;
  align-items: flex-start;
}
.currency-option-item h3 {
  font-size: 0.7em;
  align-items: flex-end;
  white-space: nowrap;
  overflow-x: hidden;
  text-overflow: clip;
}

.currency-flag {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
