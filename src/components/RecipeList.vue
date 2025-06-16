<template>
  <div id = "list">
    <RecipeCard v-for= "(mealIndex, i) in json.length" :key = "i" v-bind:recipe = "json[mealIndex - 1]"></RecipeCard>
  </div>
</template>

<script>
import axios from "axios";
import {searchBus} from "../main.js";
import RecipeCard from '../components/RecipeCard.vue'

export default {
  name: 'RecipeList',
  components: {
    'RecipeCard' : RecipeCard
  },
  data() {
    return {
      search: "",
      json: "",
      filter: ""
    }
  },
  created() {
    searchBus.$on('search', (text) => {
      this.search = text;
    });
    searchBus.$on('filter', (selectedFilter) => {
      this.filter = selectedFilter;
    });
    searchBus.$on('on-area-click', (area) => {
      this.filter = "Area";
      this.search = area;
    });
    searchBus.$on('on-category-click', (category) => {
      this.filter = "Category";
      this.search = category;
    });
    searchBus.$on('on-ingredient-click', (ingredient) => {
      this.filter = "Ingredient";
      this.search = ingredient;
    });
  },
  computed: {
    searchMeal() {
      if (this.filter === "Name") {
        return `https://www.themealdb.com/api/json/v1/1/search.php?s=${this.search}`;
      } else if (this.filter === "Category") {
        return `https://www.themealdb.com/api/json/v1/1/filter.php?c=${this.search}`;
      } else if (this.filter === "Ingredient") {
        return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.search}`;
      } else if (this.filter === "Area") {
        return `https://www.themealdb.com/api/json/v1/1/filter.php?a=${this.search}`;
      }
    }
  },
  watch: {
    searchMeal() {
      axios.get(this.searchMeal)
        .then(response => {
          this.json = response.data.meals;
        })
        .catch(err => {console.log(err)})
    }
  }
}
</script>

<style scoped>

#list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.8rem;
  padding: 1rem 1rem;
  flex-basis: 23.5%;
  width: 98.25%;
  max-width: 98.25%;
  min-height: 75vh;
  height: auto;
  border: 0.15rem solid black;
  margin-top: 0.5rem;
  background-color: #FAEDCE;
}

</style>
