---
title: Vue 简单使用
date: 2022-11-08
---

# Vue base use

```vue
<template>
  <div>app</div>
  <p>count: {{ count }}</p>
  <button @click="count++">add</button>
</template>

<script setup>
import { ref } from "vue";
const count = ref(0);
</script>
```
