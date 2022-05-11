<template>
  <h1>Currency Converter</h1>
  <CurrencyConverter />
  <h1>Exchange rates</h1>
  <CurrencyRates />
  <footer>
    <h3>
      Developped by
      <a href="https://kheapps.com" target="_blank">kheapps</a>
    </h3>
    <p>
      Currencies rates data come from
      <a
        href="https://github.com/fawazahmed0/currency-api#readme"
        target="_blank"
        >this API.</a
      >
      Currencies flags from
      <a href="https://github.com/transferwise/currency-flags" target="_blank"
        >there.</a
      >
    </p>
    <div class="go-to-source" @click="goToGithub">
      Checkout application sources on Github
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-github"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"
        />
      </svg>
    </div>
  </footer>
</template>

<script>
// import axios from "axios";
import { defineComponent } from "vue";

import CurrencyConverter from "./components/CurrencyConverter.vue";
import CurrencyRates from "./components/CurrencyRates.vue";

export default defineComponent({
  name: "App",
  components: {
    CurrencyConverter,
    CurrencyRates,
  },
  methods: {
    goToGithub() {
      window.open("https://github.com/kheapps/currency-ex");
    },
  },
  created() {
    this.$store.dispatch("initCurrencies");
  },
});
</script>

<style>
@import "./assets/currency-flags.min.css";

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  padding: 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  color: rgb(55, 105, 105);
}

footer {
  width: 100%;
  margin: 0;
  margin-top: 150px;
  padding: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 3px 3px 30px rgb(225, 225, 225);
  border-radius: 13px;
}

a {
  text-decoration: none;
  font-weight: bold;
  color: #009688;
}

.go-to-source {
  height: 50px;
  margin: 10px;
  padding: 25px;
  background: rgb(55, 105, 105);
  color: white;
  font-weight: bold;
  box-sizing: border-box;
  border-radius: 50px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.go-to-source:hover {
  cursor: pointer;
}

.go-to-source svg {
  margin-left: 10px;
}
</style>
