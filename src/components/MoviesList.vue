<script lang="ts">
import { AxiosResponse } from "axios";
import MovieDataService from "../services/MovieDataService";
import { defineComponent, reactive } from "vue";

interface MoviesParams {
  category?: string[];
}

export default defineComponent({
  name: "MoviesList",

  setup() {
    const categories_list = {
      action: "Akční",
      adventure: "Dobrodružné",
      horror: "Horory",
      "sci-fi": "Sci-fi",
      thriller: "Thrillery",
      comedy: "Komedie",
      drama: "Drama",
      animation: "Animované",
      cartoon: "Kreslené",
      romantic: "Romantické",
      dystopian: "Dystopické",
    };

    const state = reactive({
      categories: [] as string[],
      movies: [] as object[],
      loading: true,
      error: "",
    });

    const getMovies = () => {
      state.loading = true;

      const moviesParams = {} as MoviesParams;
      if (state.categories.length > 0) {
        moviesParams.category = state.categories;
      }
      MovieDataService.getAll(moviesParams)
        .then((response: AxiosResponse) => {
          state.movies = response.data.movies;
          state.loading = false;
        })
        .catch((error) => {
          state.error = error.response.data.error
            ? error.response.data.error
            : error.message;
          state.loading = false;
        });
    };
    getMovies();

    const toggleCategory = (category: string) => {
      if (!state.categories.includes(category)) {
        state.categories.push(category);
      } else {
        state.categories.splice(state.categories.indexOf(category), 1);
      }
      getMovies();
    };

    return { state, toggleCategory, categories_list };
  },
});
</script>

<template>
  <div class="categories px-10 pl-8">
    <button
      v-for="(value, key) in categories_list"
      v-on:click="toggleCategory(key)"
      :class="[{ 'text-green-600': state.categories.includes(key) }, 'px-2']"
      :key="key"
    >
      {{ value }}
    </button>
  </div>
  <div class="px-10" v-if="state.loading">Načítání...</div>
  <div class="px-10 text-red-500" v-if="!state.loading && state.error">
    {{ state.error }}
  </div>
  <div class="movies-list px-10" v-if="!state.loading && !state.error">
    <div
      class="flex flex-row justify-between mb-2"
      v-for="movie in state.movies"
      :key="movie.id"
    >
      <div>
        <div class="font-bold">{{ movie.name }}</div>
        <div>{{ movie.year }}</div>
        <div>{{ movie.director }}</div>
      </div>
      <router-link
        :to="{ name: 'movie-detail', params: { id: movie.id } }"
        class="text-green-500"
      >
        Podrobnosti
      </router-link>
    </div>
  </div>
</template>
