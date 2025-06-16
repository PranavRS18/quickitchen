<template>
  <div id = "recipe-card" @click = "onRecipeClick">
    <img v-bind:src = 'mealImage' v-bind:alt = "mealImage">
    <h2>{{recipe.strMeal}}</h2>
  </div>
</template>

<script>
import {searchBus} from '../main.js';

export default {
  name: 'RecipeCard',
  props: {
    recipe : {}
  },
  data() {
    return {
      mealImage : "",
      ingredients: []
    }
  },
  methods: {
    onRecipeClick() {
      searchBus.$emit("on-recipe-click", this.recipe.idMeal);
    }
  },
  watch: {
    recipe: {
      immediate: true,
      handler() {
        this.mealImage = `${this.recipe.strMealThumb}/medium`;
        this.ingredients = Array.from({length: "20"}, (_, ingredient) => [this.recipe[`strIngredient${ingredient + 1}`], this.recipe[`strMeasure${ingredient + 1}`]])
          .filter(ingredient => ingredient[0] !== "" && ingredient[0] !== null);
      }
    }
  }
}

</script>

<style scoped>

#recipe-card {
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  width: 23.5%;
  min-height: 40vh;
  max-height: 40vh;
  border: 0.15rem solid black;
  cursor: pointer;
  background-color: #E0E5B6;
}

h2 {
  margin: 0;
  text-align: center;
}

img {
  margin: 0 0 1rem 0;
  border-radius: 1.2rem;
  border: 0.15rem solid black;
}

@media only screen and (max-width: 768px) {
  #recipe-card {
    width: 100%;
  }
  img {
    width: 80%;
    height: 80%;
  }
}

</style>
