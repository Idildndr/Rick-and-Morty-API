<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

import { ref, onMounted } from "vue";

const route = useRoute();
const episodeId = parseInt(route.params.id);
const episode = ref({
  id: null,
  name: null,
  air_date: null,
  episode: null,
  characters: [],
  url: null,
  created: null,
});

console.log("episode is here: " + episodeId);

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/episode/${episodeId}`
    );
    episode.value.name = response.data.name;
    console.log("episode is: ", episode);
    console.log("episode name: " + episode.value.name);
  } catch (error) {
    console.error("Error fetching episode:", error);
  }
});
</script>

<template>
  <div class="grid-container">
    <div class="grid-item">{{ episode.name }}</div>
    <div class="grid-item">2</div>
    <div class="grid-item">3</div>
    <div class="grid-item">4</div>
    <div class="grid-item">5</div>
    <div class="grid-item">6</div>
    <div class="grid-item">7</div>
    <div class="grid-item">8</div>
    <div class="grid-item">9</div>
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  background-color: #2196f3;
  padding: 10px;
}
.grid-item {
  background-color: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(0, 0, 0, 0.8);
  padding: 20px;
  font-size: 30px;
  text-align: center;
}
</style>
