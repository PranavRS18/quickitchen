<template>
  <div>
    <select v-model = "selectedFilter">
      <option v-for = "filter in filters">{{ filter }}</option>
    </select>
    <input type = "text" v-model = "searchedText" @keydown.enter = "search" placeholder = "QuicKitchen - Your Ultimate Recipe Finder">
    <button @click.stop = "search">GET RECIPES</button>
  </div>
</template>

<script>
import {searchBus} from "../main.js";

export default {
  name: 'SearchBar',
  data() {
    return {
      searchedText: '',
      filters: ['Name', 'Category', 'Ingredient', 'Area'],
      selectedFilter: 'Name'
    }
  },
  created() {
    searchBus.$on('on-area-click', (area) => {
      this.selectedFilter = "Area";
      this.searchedText = area;
    });
    searchBus.$on('on-category-click', (category) => {
      this.selectedFilter = "Category";
      this.searchedText = category;
    });
    searchBus.$on('on-ingredient-click', (ingredient) => {
      this.selectedFilter = "Ingredient";
      this.searchedText = ingredient;
    });
  },
  methods: {
    search() {
      searchBus.$emit('search', this.searchedText.toLowerCase().replace(/ /g, "_"));
      searchBus.$emit('filter', this.selectedFilter);
    }
  }
}
</script>

<style scoped>

div {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  column-gap: 0.3rem;
  width: 100%;
  height: 80%;
}

select {
  margin-bottom: 0.9rem;
  width: 10%;
  height: 42%;
  border-radius: 1rem;
  font-size: 1.1rem;
  font-family: 'Lora', serif;
  background-color: #FAEDCE;
}

input {
  border-radius: 5rem;
  margin-bottom: 0.8rem;
  width: 60%;
  height: 40%;
  padding: 0 1rem;
  font-size: 1.2rem;
  font-family: 'Lora', serif;
  background-color: #FAEDCE;
}

button {
  margin-bottom: 0.9rem;
  margin-right: 0.5rem;
  width: 10%;
  height: 42%;
  border-radius: 1rem;
  font-size: 1rem;
  cursor: pointer;
  font-family: 'Lora', serif;
  background-color: #F2E2B1;
}

</style>
