<template>
  <div class="header-nav-item ~cp" @click="handleCheck">
    <i v-if="lightVal" class="i-iconoir-sun-light"></i>
    <i v-else class="i-iconoir-half-moon"></i>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const THEME_MODE = {
  LIGHT_MODE: "light-theme",
  DARK_MODE: "dark-theme",
};

let darkMode = localStorage.getItem("theme-mode") === THEME_MODE.DARK_MODE;
const lightVal = ref(!darkMode);
const body = document.querySelector("body");

if (darkMode) {
  enableDarkMode();
}

function enableDarkMode() {
  body?.classList.remove(THEME_MODE.LIGHT_MODE);
  body?.classList.add(THEME_MODE.DARK_MODE);
}

function disableDarkMode() {
  body?.classList.remove(THEME_MODE.DARK_MODE);
  body?.classList.add(THEME_MODE.LIGHT_MODE);
}

const handleCheck = () => {
  lightVal.value = !lightVal.value;

  if (lightVal.value) {
    disableDarkMode();
    localStorage.setItem("theme-mode", THEME_MODE.LIGHT_MODE);
    return;
  }
  enableDarkMode();
  localStorage.setItem("theme-mode", THEME_MODE.DARK_MODE);
};
</script>
