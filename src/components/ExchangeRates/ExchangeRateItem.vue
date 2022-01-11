<template>
  <div class="rate-item">
    <div class="flag-container">
      <div :class="'currency-flag currency-flag-' + rate.currency"></div>
    </div>
    <span>
      <input class="value" :value="rate.value" disabled />
      <div
        class="click-zone"
        :title="rate.value"
        @click.capture="copyValue"
      ></div>
    </span>
    <div class="currency" :title="rate.currency">
      {{ rate.currency.toUpperCase() }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rate: {
      type: Object,
      required: true,
    },
  },
  methods: {
    copyValue() {
      console.log("value " + this.rate.value + " copied !");
    },
  },
};
</script>

<style scoped>
.rate-item {
  display: flex;
  flex-direction: row;
  /* width: 200px; */
  height: 50px;
  margin: 15px;
}

.value,
.currency {
  height: 100%;
}

.value {
  width: 100px;
  font-size: 1em;
  background: white;
  font-weight: bold;
  border: none;
  border-radius: 13px;
  box-sizing: border-box;
  box-shadow: 2px 2px 3px rgb(225, 225, 225), -1px -2px 3px rgb(225, 225, 225);
  padding: 15px;
  text-overflow: ellipsis;
  text-align: center;
}

.currency {
  width: 85px;
  display: flex;
  align-items: center;
  justify-content: centers;
  text-align: left;
  padding-left: 25px;
  margin-left: -15px;
  border-radius: 13px;
  box-sizing: border-box;
  background: rgb(240, 240, 240);
}
span {
  position: relative;
}

.click-zone {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.click-zone:hover {
  cursor: pointer;
}

.flag-container {
  width: 50px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(225, 225, 245);
  border-radius: 25px;
  margin: 0 10px;
}
</style>
