<script setup>
import axios from "axios";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";

const route = useRoute();
const router = useRouter();
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

const characterNames = ref([]);

console.log("episode is here: " + episodeId);

onMounted(async () => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/episode/${episodeId}`
    );
    episode.value.name = response.data.name;
    episode.value.air_date = response.data.air_date;
    episode.value.episode = response.data.episode;
    episode.value.characters = response.data.characters;
    console.log("episode is: ", episode);
    console.log("episode name: " + episode.value.name);

    // Fetch character names asynchronously
    await fetchCharacterNames();
  } catch (error) {
    console.error("Error fetching episode:", error);
  }
});

const fetchCharacterNames = async () => {
  try {
    const promises = episode.value.characters.map(characterUrl =>
      fetchCharacterDetails(extractCharacterIdFromUrl(characterUrl))
    );
    characterNames.value = await Promise.all(promises);
  } catch (error) {
    console.error("Error fetching character names:", error);
  }
};

const handleRowClick = async (characterUrl) => {
  try {
    const characterId = extractCharacterIdFromUrl(characterUrl);
    if (characterId) {
      const characterDetails = await fetchCharacterDetails(characterId);
      if (characterDetails) {
        router.push({
          name: "CharacterDetails",
          params: { id: characterId },
        });
      } else {
        console.error("Error: Unable to fetch character details");
      }
    } else {
      console.error("Error: Unable to extract character ID");
    }
  } catch (error) {
    console.error("Error navigating to character details:", error);
  }
};

function extractCharacterIdFromUrl(url) {
  const lastSlashIndex = url.lastIndexOf("/");
  if (lastSlashIndex !== -1) {
    const characterId = url.substring(lastSlashIndex + 1);
    return characterId;
  }
  return null;
}

async function fetchCharacterDetails(characterId) {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/${characterId}`
    );
    return response.data.name;
  } catch (error) {
    console.error("Error fetching character details:", error);
    return null;
  }
}
</script>

<template>
    <div class="grid-container">
      <div class="grid-item item-1">{{ episode.name }}</div>
      <div class="grid-item item-2">{{ episode.air_date }}</div>
      <div class="grid-item item-3">{{ episode.episode }}</div>
      <div class="grid-item item-4">
        <table class="data-table">
          <thead>
            <tr>
              <th>Characters in The Episode</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="table-item"
              v-for="(character, index) in episode.characters"
              :key="index"
              @click="handleRowClick(character)"
            >
              <td>{{ characterNames[index] }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
<style scoped>
.grid-container {
  gap: 30px 30px;
  width: 80%;
  margin: 0 auto;
  color: #2c3e50;
  margin-top: 50px;
  display: grid;
  align-content: center;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 10px;
  gap: 30px;
}
.grid-item {
  background: #8b8b8b;
  padding: 20px;
  font-size: 30px;
  text-align: center;
  border-radius: 0.4rem;
  
}


.item-1{
    font-size: 40px;
    grid-row: 1 / span 2;
    background: #00ff97;
}
.item-4 {
  grid-column: 2 / span 2;
  font-size: 20px;
  background-color: white;
  max-height: 400px; /* Adjust the maximum height of the scrollable container */
  overflow-y: auto; /* Enable vertical scrolling */
  cursor: pointer;


  border-collapse: collapse;
  tr:hover {
    background-color: #00ff97;
  }
  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
}


.item-3, .item-2{
    color: #fff;

}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}


</style>
