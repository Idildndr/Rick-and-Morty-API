<script setup>
import Card from "../components/Cards.vue";
import Hero from "../components/Hero.vue";
</script>

<template>
  <Hero />
  <Suspense>
    <template #default>
      <Card />
    </template>

    <template #fallback>
      <div class="cards spinner">
        <NSpin size="large"></NSpin>
      </div>
    </template>
  </Suspense>
</template>
