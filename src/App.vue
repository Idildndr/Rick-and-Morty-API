<script setup>
import { RouterView } from "vue-router";
</script>


<template>
  <Hero />
  <Suspense>
    <template #default>
      <RouterView />
    </template>

    <template #fallback>
      <div class="cards spinner">
        <NSpin size="large"></NSpin>
      </div>
    </template>
  </Suspense>
</template>


<style scoped>
.Router{
  height: 100%;
  background-color: black;
}
</style>