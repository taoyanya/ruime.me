<template>
  <div
    class="border w-fit h-35px flex items-center justify-center p-x-10px p-y-5px box-border"
  >
    <div class="b-r p-r-10px">生产日期</div>
    <input
      class="outline-none p-l-10px select-none"
      type="date"
      ref="dateInputRef"
      v-model="datePickerValue"
    />
  </div>
  <div class="w-fit h-35px flex items-center justify-center mt-10px">
    <div class="b-r p-r-10px border p-x-10px p-y-5px">效期单位</div>
    <select>
      <option value="">日</option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

const datePickerValue = ref("");

watchEffect(() => console.log(typeof datePickerValue.value));
</script>

<style scoped></style>
