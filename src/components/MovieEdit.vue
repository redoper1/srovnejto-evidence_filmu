<script lang="ts">
import { AxiosResponse } from "axios";
import MovieDataService from "../services/MovieDataService";
import { defineComponent, reactive } from "vue";

export default defineComponent({
  name: "MovieEdit",
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
      sending: false,
      message: "",
    });
    const movieId =
      props.id !== undefined ? props.id : location.href.split("/").pop();
    const getMovie = () => {
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
    };
    getMovie();

    const updateMovie = () => {
      state.sending = true;
      MovieDataService.update(movieId, state.movie)
        .then((response: AxiosResponse) => {
          if (response.data.message) {
            state.message = response.data.message;
          } else {
            state.message = response.data;
          }
          if (response.data.movie) {
            state.movie = response.data.movie;
          }
          state.sending = false;
        })
        .catch((error) => {
          state.error = error.response.data.error
            ? error.response.data.error
            : error.message;
          state.sending = false;
        });
    };
    return { state, updateMovie };
  },
});
</script>

<template>
  <div class="px-10" v-if="state.loading">Načítání...</div>
  <div class="px-10 text-red-500" v-if="!state.loading && state.error">
    {{ state.error }}
  </div>
  <form class="px-10" v-if="!state.loading && !state.error" method="post">
    <router-link
      :to="{ name: 'movie-detail', params: { id: state.movie.id } }"
      class="text-green-600 float-right"
    >
      Zpět na podrobnosti o filmu
    </router-link>
    <h2 class="text-lg mb-5">
      Úpravy filmu: <span class="font-bold">{{ state.movie.name }}</span>
    </h2>
    <table class="alternating-bg">
      <tr>
        <th>
          <label for="name">
            <span class="font-bold">Název:</span>
          </label>
        </th>
        <td class="pl-2">
          <input
            type="text"
            placeholder="Název"
            required
            id="name"
            v-model="state.movie.name"
          />
        </td>
      </tr>

      <tr>
        <th>
          <label for="year">
            <span class="font-bold">Rok:</span>
          </label>
        </th>
        <td class="pl-2 py-1">
          <input
            type="number"
            placeholder="Rok"
            required
            id="year"
            v-model="state.movie.year"
          />
        </td>
      </tr>

      <tr>
        <th>
          <label for="release-date">
            <span class="font-bold">Datum vydání:</span>
          </label>
        </th>
        <td class="pl-2 py-1">
          <input
            type="date"
            placeholder="Datum vydání"
            id="release-date"
            v-model="state.movie['release-date']"
          />
        </td>
      </tr>

      <tr>
        <th>
          <label for="runtime">
            <span class="font-bold">Délka stopáže (minuty):</span>
          </label>
        </th>
        <td class="pl-2 py-1">
          <input
            type="number"
            placeholder="Délka stopáže"
            id="runtime"
            v-model="state.movie.runtime"
          />
        </td>
      </tr>

      <tr>
        <th>
          <span class="font-bold">Kategorie:</span>
        </th>
        <td class="py-1">
          <span
            v-for="category in state.movie.categories"
            :key="category"
            class="px-2"
          >
            <input type="checkbox" value="true" :id="category" checked />
            <label class="pl-1" :for="category">{{ category }}</label>
          </span>
        </td>
      </tr>

      <tr>
        <th>
          <label for="release-date">
            <span class="font-bold">Režie:</span>
          </label>
        </th>
        <td class="pl-2 py-1">
          <input
            type="text"
            placeholder="Datum vydání"
            id="release-date"
            v-model="state.movie.director"
          />
        </td>
      </tr>

      <tr>
        <th>
          <span class="font-bold">Scénář:</span>
        </th>
        <td>
          <span
            class="inline-flex px-2 py-1"
            v-for="(writer, index) in state.movie.writer"
            :key="index"
          >
            <input
              type="text"
              placeholder="Scénář"
              v-model="state.movie.writer[index]"
            />
          </span>
        </td>
      </tr>

      <tr>
        <th>
          <span class="font-bold">Hrají:</span>
        </th>
        <td>
          <span
            class="inline-flex px-2 py-1"
            v-for="(actor, index) in state.movie.actors"
            :key="index"
          >
            <input
              type="text"
              placeholder="Hrají"
              v-model="state.movie.actors[index]"
            />
          </span>
        </td>
      </tr>

      <tr>
        <th>
          <label for="storyline">
            <span class="font-bold">Děj:</span>
          </label>
        </th>
        <td class="pl-2">
          <textarea
            id="storyline"
            v-model="state.movie.storyline"
            class="w-full"
            rows="5"
          />
        </td>
      </tr>
    </table>

    <div class="mt-10">
      <div class="text-green-700 mb-2" v-if="!state.sending && state.message">
        {{ state.message }}
      </div>
      <button
        class="
          bg-green-500
          hover:bg-green-700
          text-white
          font-bold
          py-2
          px-4
          rounded
        "
        type="button"
        @click="updateMovie"
      >
        Uložit
      </button>
    </div>
  </form>
</template>
