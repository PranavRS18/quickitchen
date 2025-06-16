<template>
  <div id = "quickitchen">
    <Navbar></Navbar>
    <RecipeList v-show = "!isRecipeOpen"></RecipeList>
    <RecipeModal v-show = "isRecipeOpen"></RecipeModal>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import RecipeList from "./components/RecipeList.vue";
import RecipeModal from "./components/RecipeModal.vue";
import {searchBus} from "./main";

export default {
  name: 'App',
  components: {
    'RecipeModal' : RecipeModal,
    'Navbar': Navbar,
    'Footer': Footer,
    'RecipeList': RecipeList,
  },
  data () {
    return {
      isRecipeOpen: false,
    }
  },
  created() {
    searchBus.$on('on-recipe-click', () => {
      this.isRecipeOpen = !this.isRecipeOpen;
    });
    searchBus.$on('search', () => {
      this.isRecipeOpen = false;
    });
    searchBus.$on('on-area-click', () => {
      this.isRecipeOpen = false;
    });
    searchBus.$on('on-category-click', () => {
      this.isRecipeOpen = false;
    });
    searchBus.$on('on-ingredient-click', () => {
      this.isRecipeOpen = false;
    });
  },
}
</script>

<style>

html, body {
  background-color: #FEFAE0;
  font-family: 'Lora', serif;
}

#quickitchen {
  height: 98vh;
}

</style>
