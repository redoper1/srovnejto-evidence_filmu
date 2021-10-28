<script setup lang="ts">
// Movies data mock
import movies_json from "./assets/movies.json";
const movies = movies_json.Movies;
</script>

<template>
  <h1 class="py-10 text-center">App</h1>
  <div class="movies-list px-10">
    <div class="movie-listing" v-for="movie in movies" :key="movie.name">
      {{ movie.name + " - " + movie.year + " - " + movie.director }}
    </div>
  </div>
</template>

<style>
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
