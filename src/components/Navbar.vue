<template>
  <header>
      <a id = "logo" href = "/index.html">
        <img src = "../assets/QuicKitchen.png" alt = "QuicKitchen">
      </a>
      <div>
        <ul>
          <li v-for = "item in navItems">
            <a v-if = "item.link" :href = "item.link" target = "_blank">{{ item.name }}</a>
            <span v-else>{{ item.name }}</span>
          </li>
        </ul>
      <SearchBar></SearchBar>
    </div>
  </header>
</template>

<script>
import SearchBar from "./SearchBar.vue";

export default {
  name: 'Navbar',
  components: {
    'SearchBar': SearchBar
  },
  data() {
    return {
      title : 'QuicKitchen',
      navItems : [
        {name : 'Discover', link : null},
        {name : 'Favorites', link : null},
        {name : 'Categories', link : null},
        {name : 'Area', link : null},
        {name : 'Ingredients', link : null},
        {name : 'TheMealDB API', link : 'https://www.themealdb.com/api.php'},
        {name : 'Contact Me', link : "https://github.com/PranavRS18"},
      ]
    }
  }
}
</script>

<style scoped>

header {
  display: flex;
  flex-direction: row;
  height: 15%;
  width: 100%;
  border: 0.15rem solid black;
  background-color: #CCD5AE;
}

#logo {
  display: inline-block;
  min-width: 20%;
  height: 100%;
}

img {
  margin: 1%;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

div {
  display: flex;
  flex-direction: column;
  width: 100%;
}

ul {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  list-style-type: none;
}

li {
  font-size: 1.2rem;
  margin: 0 1.3rem 0 1.2rem;
  cursor: pointer;
}

a {
  text-decoration: none;
}

a:visited {
  color: black;
}

@media only screen and (max-width: 768px) {
  header {
    width: 95vw;
    flex-direction: column;
  }
  img {
    width: 40vw;
    height: 8vh;
  }
  ul {
    display: none;
  }
}


</style>
