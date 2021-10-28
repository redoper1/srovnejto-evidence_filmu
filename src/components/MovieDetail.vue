<script lang="ts">
import { AxiosResponse } from "axios";
import MovieDataService from "../services/MovieDataService";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "MovieDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      movie: {},
      loading: true,
      error: "",
    });
    const movieId =
      props.id !== undefined ? props.id : location.href.split("/").pop();
    MovieDataService.get(movieId)
      .then((response: AxiosResponse) => {
        if (response.data.movie) {
          state.movie = response.data.movie;
        } else {
          state.movie = response.data;
        }
        state.loading = false;
      })
      .catch((error) => {
        state.error = error.response.data.error
          ? error.response.data.error
          : error.message;
        state.loading = false;
      });
    return { state };
  },
});
</script>

<template>
  <div class="px-10" v-if="state.loading">Načítání...</div>
  <div class="px-10 text-red-500" v-if="!state.loading && state.error">
    {{ state.error }}
  </div>
  <div class="px-10" v-if="!state.loading && !state.error">
    <router-link
      :to="{ name: 'movie-edit', params: { id: state.movie.id } }"
      class="text-green-600 float-right"
    >
      Upravit
    </router-link>

    <h2 class="text-lg mb-5">
      Detail filmu: <span class="font-bold">{{ state.movie.name }}</span>
    </h2>

    <table>
      <tr>
        <th class="text-left">Název filmu:</th>
        <td class="pl-2">{{ state.movie.name }}</td>
      </tr>
      <tr>
        <th class="text-left">Rok:</th>
        <td class="pl-2">{{ state.movie.year }}</td>
      </tr>
      <tr>
        <th class="text-left">Datum vydání:</th>
        <td class="pl-2">
          {{ new Date(state.movie["release-date"]).toLocaleDateString() }}
        </td>
      </tr>
      <tr>
        <th class="text-left">Délka:</th>
        <td class="pl-2">
          {{ state.movie.runtime ? state.movie.runtime + " minut" : "" }}
        </td>
      </tr>
      <tr>
        <th class="text-left">Kategorie:</th>
        <td class="pl-2">
          {{
            Array.isArray(state.movie.categories)
              ? state.movie.categories.join(", ")
              : state.movie.categories
          }}
        </td>
      </tr>
      <tr>
        <th class="text-left">Režie:</th>
        <td class="pl-2">
          {{
            Array.isArray(state.movie.director)
              ? state.movie.director.join(", ")
              : state.movie.director
          }}
        </td>
      </tr>
      <tr>
        <th class="text-left">Scénář:</th>
        <td class="pl-2">
          {{
            Array.isArray(state.movie.writer)
              ? state.movie.writer.join(", ")
              : state.movie.writer
          }}
        </td>
      </tr>
      <tr>
        <th class="text-left">Hrají:</th>
        <td class="pl-2">
          {{
            Array.isArray(state.movie.actors)
              ? state.movie.actors.join(", ")
              : state.movie.actors
          }}
        </td>
      </tr>
      <tr>
        <th class="text-left">Děj:</th>
        <td class="pl-2">
          {{ state.movie.storyline }}
        </td>
      </tr>
    </table>
  </div>
</template>
