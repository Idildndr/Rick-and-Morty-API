from 'vue';
<script setup>
import axios from "axios";
import { defineProps } from "vue";
import {
  ref,
  watch,
  onMounted,
  onUpdated,
  onUnmounted,
  onBeforeMount,
} from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

const router = useRouter();

const route = useRoute();

const quizId = parseInt(route.params.id);

console.log(quizId);
const char = ref({
  id: null,
  name: null,
  status: null,
  species: null,
  type: null,
  gender: null,
  origin: {
    name: null,
    url: null,
  },
  location: {
    name: null,
    url: null,
  },
  image: null,
  episode: [],
  url: null,
  created: null,
});

const columns = ref([{ title: "Episodes", key: "episode", width: 200 }]);

const data = ref([]);
const dataTableRef = ref(null); // Create a ref for the n-data-table component

onMounted(async () => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character/${quizId}`
  );

  char.value.name = response.data.name;
  char.value.image = response.data.image;
  char.value.origin.name = response.data.origin.name;
  char.value.status = response.data.status;
  char.value.episode = response.data.episode;
  char.value.gender = response.data.gender;
  char.value.species = response.data.species;

  const episodes = response.data.episode;
  data.value = episodes.map(episode => ({ episode }));
});




</script>

<template>
  <div class="container">
    <div class="character">
      <img :src="char.image" />
      <div class="info-character">
        <h2>{{ char.name }}</h2>
        <h4
          class="status"
          :class="{
            'status-green': char.status === 'Alive',
            'status-red': char.status === 'Dead',
            'status-gray': char.status === 'Unknown',
          }"
        >
          {{ char.status }}
        </h4>
        <h4>
          {{ char.species }}
          <br>
          {{ char.origin.name }}
          <br>
        {{ char.gender  }}</h4>
        
      </div>
    </div>
  </div>

  <div class="scroll-container">
    <n-data-table
      ref="dataTable"
      :columns="columns"
      :data="data"
      :bordered="false"
    />
  </div>
</template>

<style scoped>
img {
  height: 2 50px;
  border-radius: 10%;
  margin: 20px;
}

.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  gap: 30px 30px;
  width: 80%;
  margin: 0 auto;
  color: #2c3e50;
}

.info-character {
  display: table-column;
  justify-content: center;
  align-items: clearInterval;
  margin: 20px auto;
}

h2 {
  font-weight: 800;
  font-size: 2.2rem;
  padding: 1rem;
  background: #00ff97;
  border-radius: 0.8rem;
  margin: 1rem;
  white-space: nowrap;
}

.character {
  margin: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}

h4 {
  background: #8b8b8b;
  border-radius: 0.4rem;
  padding: 15px;
  color: #fff;
  margin: 16px;
  font-weight: 700;
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Show ellipsis (...) for overflow text */

}

.status{
  padding-top: 15px;
}

.status::before {
  content: "\2022"; /* Add a dot (•) */
  font-size: 1em; /* Keep the font size normal */
  color: #000; /* Color of the dot */
  margin-right: 10px; /* Add some space between the dot and the text */
  transform: scale(3); /* Scale the dot */
  display: inline-block; /* Ensure proper positioning of the dot */
  animation: wink 1s infinite alternate; /* Animation for winking */
}

@keyframes wink {
  0% {
    opacity: 1; /* Start with full opacity */
  }
  100% {
    opacity: 0; /* End with no opacity */
  }
}

.status-green::before {
  color: #8df542; /* Color of the dot when status is 'Alive' */
}

.status-red::before {
  color: red; /* Color of the dot when status is 'Dead' */
}

.status-gray::before {
  color: gray; /* Color of the dot when status is 'Unknown' */
}

.scroll-container {
  width: 80%;
  margin: 0 auto;

  width: 50%;
  max-height: 400px; /* Adjust the maximum height of the scrollable container */
  overflow-y: auto; /* Enable vertical scrolling */
  cursor: pointer;
}
</style>
