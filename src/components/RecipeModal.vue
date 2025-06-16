<template>
  <div id = "modal">
    <div id = "image">
      <img :src = "mealImage">
      <iframe width="500" height="281.25" :src="videoURL" allowfullscreen></iframe>
    </div>
    <div id = "details">
      <h1>{{ recipe.strMeal }}</h1>
      <div id = "tags">
        <h2>Categories : <span @click = "onClickArea">{{ recipe.strArea }}</span>, <span @click = "onClickCategory">{{ recipe.strCategory }}</span></h2>
        <h2 v-if = "recipe.strTags !== null">Tags : {{ recipe.strTags.replace(/,\s*/g, ", ") }}</h2></div>
      <h2>INGREDIENTS:</h2>
      <div id = "instructions">
        <ul>
          <li v-for = "ingredient in ingredients.slice(0, ingredients.length / 2)"><span @click = "onClickIngredient(ingredient)">{{ ingredient[0] }}</span> - {{ ingredient[1] }}</li>
        </ul>
        <ul>
          <li v-for = "ingredient in ingredients.slice(ingredients.length / 2)"><span>{{ ingredient[0] }}</span> - {{ ingredient[1] }}</li>
        </ul>
      </div>
      <h2>INSTRUCTIONS:</h2>
      <p>{{ recipe.strInstructions }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {searchBus} from "../main";

export default {
  data() {
    return {
      recipe: {},
      mealImage: "",
      ingredients: [],
      videoURL: ""
    }
  },
  created() {
    searchBus.$on('on-recipe-click', (recipeID) => {
      axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`)
        .then((response) => {
        console.log(response.data);
        this.recipe = response.data.meals[0];
      }).catch((error) => {
        console.log(error);
      })
    });
  },
  methods: {
    onClickArea() {
      searchBus.$emit('on-area-click', this.recipe.strArea);
    },
    onClickCategory() {
      searchBus.$emit('on-category-click', this.recipe.strCategory);
    },
    onClickIngredient(ingredient) {
      console.log(ingredient);
      searchBus.$emit('on-ingredient-click', ingredient[0]);
    }
  },
  watch: {
    recipe: {
      immediate: true,
      handler() {
        this.mealImage = `${this.recipe.strMealThumb}/large`;
        this.ingredients = Array.from({length: "20"}, (_, ingredient) => [this.recipe[`strIngredient${ingredient + 1}`], this.recipe[`strMeasure${ingredient + 1}`]])
          .filter(ingredient => ingredient[0] !== "" && ingredient[0] !== null);
        this.videoURL = "https://www.youtube.com/embed/" + this.recipe.strYoutube.split('v=')[1]
      }
    }
  }
}

</script>

<style scoped>

#modal {
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
}

img {
  border-radius: 1rem;
  border: 0.15rem solid black;
}

#image {
  margin: 0;
  display: flex;
  flex-direction: column;
  width: auto;
  gap: 1rem;
}

#instructions {
  margin: 0;
  display: flex;
  flex-direction: row;
}

#instructions span {
  cursor: pointer;
}

#tags {
  display: flex;
  flex-direction: row;
  margin: 0;
}

#tags span {
  cursor: pointer;
}

#details {
  width: 69.6%;
  border: 0.15rem solid black;
}

div h1 {
  margin: 0.5rem;
  text-align: center;
}

div h2 {
  margin: 0.5rem;
  width: 40%;
  padding: 1rem;
}

ul {
  width: 40%;
}

li {
  font-size: 1.2rem;
}

p {
  font-size: 1.3rem;
  padding: 0 1rem 1rem 1rem;
}

</style>
