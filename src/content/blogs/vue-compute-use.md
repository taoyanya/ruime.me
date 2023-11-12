---
title: Vue computed函数的使用
date: 2022-12-21
---

### 简单使用 - 返回一个函数

```vue
<script setup>
import { computed, ref } from "vue";

const count = ref(0);
const mutCount = computed(() => {
  return count.value * 2;
});
</script>
```

### 定义一个对象类型，包含 set 和 get 方法

```vue
<script setup>
import { computed, ref } from "vue";

const count = ref(0);
const mutCount = computed({
  get() {
    return count.value * 2;
  },
  set(val) {
    count.value = val;
  },
});
</script>
```
