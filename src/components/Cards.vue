<script setup>
import axios from "axios";
import { ref, watch } from "vue";
import Card from "../components/Card.vue";

import { useRouter } from "vue-router";
const characters = ref(null);
const originalCharacters = ref(null);
const page = ref(1);
const search = ref("");
const selectedStatus = ref("all"); // Initialize selectedStatus to "all"
const statusOptions = ref([]); // Array to hold status options



// Fetch all characters data from the API
const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching characters data:", error);
    return null;
  }
};

// Function to fetch characters recursively until all pages are fetched
const fetchAllCharacters = async (url) => {
  let allCharacters = [];
  while (url) {
    const data = await fetchData(url);
    if (!data) break;
    allCharacters = [...allCharacters, ...data.results];
    url = data.info.next; // Update URL to fetch the next page
  }
  return allCharacters;
};

(async () => {
  originalCharacters.value = await fetchAllCharacters("https://rickandmortyapi.com/api/character");
  characters.value = originalCharacters.value.slice(0, 20); 
})();



// Watch for changes in the search query
watch(search, () => {
  filterCharacters();
});

// Watch for changes in the selected status
watch(selectedStatus, () => {
  filterCharacters();
});

// Function to filter characters based on search query and selected status
const filterCharacters = () => {
  // Apply search filter to all characters
  let filteredCharacters = originalCharacters.value.filter((character) =>
    character.name.toLowerCase().includes(search.value.toLowerCase())
  );

  // Apply status filter to all characters
  if (selectedStatus.value !== "all") {
    filteredCharacters = filteredCharacters.filter((character) =>
      character.status.toLowerCase() === selectedStatus.value.toLowerCase()
    );
  }

  characters.value = filteredCharacters.slice(0, 20); // Update the displayed characters based on the search and status filters, but only show characters from the first page
};


watch(page, async () => {
  const res = await axios.get(
    `https://rickandmortyapi.com/api/character/?page=${page.value}`
  );
  characters.value = res.data.results;
});

</script>

<template>
  <div class="container">
    <input class="searchBox" v-model.trim="search" type="text" placeholder="search..."  round clearable style="margin-top: 50px !important;"/>



 <select  class="dropdown" v-model="selectedStatus">
      <option value="all">All</option>
      <option value="alive">Alive</option>
      <option value="dead">Dead</option>
      <option value="unknown">Unknown</option>
    </select>

    <div class="cards">
      <Card
        v-for="character in characters"
        :key="character.id"
        :image="character.image"
        :name="character.name"
        :location="character.location.name"
        :characterId="character.id"
      >
        <div></div>
      </Card>
    </div>
   
  </div>

  <div class="button-container">
      <button @click="page--">&lt</button>
      <button @click="page++">></button>
    </div>
</template>

<style scoped>
.container {
  background-color: black;
  color: #2c3e50;
  margin: 0px 10px;
}
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  justify-content:center; /* or justify-content: space-between; */
  cursor: pointer;
 
}
.cards h3 {
  font-weight: bold;
}
.cards p {
  font-size: 10px;
}
.jobs {
  display: flex;
  flex-wrap: wrap;
}
.button-container {
  display: flex;
  justify-content: center;
 margin-top: 20px;
}
.button-container button {
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin: 0 5px;
  cursor: pointer;
}
.spinner {
  display: flex;
  align-items: center;
  justify-content: center;
}


.searchBox {
  display: block;
  max-width: 50%;
  margin: 10px auto 10px; /* Adjust the margin-top value */
  background-color: #2c3e50;
  border-color: #2c3e50;
  padding: 5px;
  text-align: center;
  font-weight: bold;
  border-radius: 10px ;
  border:0 none;
  padding:10px 20px;
  background: #eee;

}

.dropdown{
  display: block;
  max-width: 50%;
  margin: 10px auto 10px; /* Adjust the margin-top value */
  background-color: #2c3e50;
  border-color: #2c3e50;
  padding: 5px;
  text-align: center;
  font-weight: bold;
  border-radius: 10px ;
  border:0 none;
  padding:10px 20px;
  background: #eee;
}

</style>
