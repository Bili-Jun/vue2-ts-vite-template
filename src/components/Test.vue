<template>
  <div class="test">
    <h1>test</h1>
    <slot name="testContent" :test="{ a, b }"></slot>
    <slot :test="{ c }"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
  setup() {
    return {
      a: 1, 
      b: 2,
      c: 3
    }
  }
})
</script>

<style lang="less" scoped>
</style>
