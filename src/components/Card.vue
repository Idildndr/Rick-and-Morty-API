<script setup>
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const { image, name, location, characterId } = defineProps([
  "image",
  "name",
  "location",
  "characterId",
]);

const navigateToChar = () => {
  router.push(`/char/${characterId}`);
};
</script>

<template>
  <div class="container" @click="navigateToChar">
    <img :src="image" />

    <h3>{{ name }}</h3>
  </div>
</template>

<style scoped>
img {
  max-width: 100%;
  border-radius: 5%;
}

.container {
  background-color: rgb(27, 26, 26);
  padding: 30px;
  color: #2c3e50;
  max-width: 100%;
}

h3 {
  background: #00ff97;
  justify-content: center;
  align-self: center;
  font-weight: bold;
  font-size: larger;
  border-radius: 5px;
  padding: 15px;
  max-width: 100%;
  text-align: center;
}
</style>
