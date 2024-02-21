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

const characterId = parseInt(route.params.id);

console.log(characterId);
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

let episodeUrl = ref(0);

onMounted(async () => {
  const response = await axios.get(
    `https://rickandmortyapi.com/api/character/${characterId}`
  );

  char.value.name = response.data.name;
  char.value.image = response.data.image;
  char.value.origin.name = response.data.origin.name;
  char.value.status = response.data.status;

  char.value.episode = response.data.episode;

  const episodes = response.data.episode;

  data.value = episodes.map((episode) => extractEpisodeIdFromUrl(episode));
});

document.body.style.backgroundColor = "rgb(0,0,0)";


const handleRowClick = async (episodeId) => {
  try {
    console.log("Episode ID:", episodeId);
  
    router.push({ name: "EpisodeDetails", params: { id: episodeId } });
  } catch (error) {
    console.error("Error navigating to episode:", error);
  }
};


function extractEpisodeIdFromUrl(url) {
  // Find the last occurrence of "/"
  const lastSlashIndex = url.lastIndexOf("/");
  if (lastSlashIndex !== -1) {
    // Extract substring after the last "/"
    const digitsSubstring = url.substring(lastSlashIndex + 1);
    // Use regular expression to extract digits (one or two)
    const digits = digitsSubstring.match(/\d{1,2}$/);
    if (digits) {
      return digits[0];
    } else {
      return null; // No digits found
    }
  } else {
    return null; // No "/" found in the URL
  }
}
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
        <h4>{{ char.origin.name }}</h4>
      </div>
    </div>
  </div>

  <div class="scroll-container">
    <table class="data-table">
      <thead>
        <tr>
          <th>Episodes</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="table-item"
          v-for="(episodeId, index) in data"
          :key="index"
          @click="handleRowClick(episodeId)"
        >
          <td>Episode: {{ episodeId }}</td>
        </tr>
      </tbody>
    </table>
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
  padding: 20px;
  color: #fff;
  margin: 16px;
  font-weight: 700;
  white-space: nowrap; /* Prevent text from wrapping */
  overflow: hidden; /* Hide overflow text */
  text-overflow: ellipsis; /* Show ellipsis (...) for overflow text */
}

.status::before {
  content: "\2022"; /* Add a dot (•) */
  font-size: 1em; /* Keep the font size normal */
  color: #000; /* Color of the dot */
  margin-right: 10px; /* Add some space between the dot and the text */
  transform: scale(2.5); /* Scale the dot */
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
  color: green; /* Color of the dot when status is 'Alive' */
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
  background-color: white;
  width: 50%;
  max-height: 400px; /* Adjust the maximum height of the scrollable container */
  overflow-y: auto; /* Enable vertical scrolling */
  cursor: pointer;
}


th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}



th, td {
  border-bottom: 1px solid #ddd;
}

table{
  width: 100%;
  border-collapse: collapse;
  tr:hover {background-color: #00ff97;}
  tr:nth-child(even) {background-color: #f2f2f2;}
}


</style>


