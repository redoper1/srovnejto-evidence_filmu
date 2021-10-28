import { Response, Server } from "miragejs";
import { Movie } from "./types";

import moviesData from "./assets/movies.json";
const moviesListData = moviesData.Movies;
let _moviesList = [] as Movie[];
moviesListData.forEach((movie, index) => {
  let _movie = movie as Movie;
  _movie.id = index;
  _moviesList.push(_movie);
});

if (process.env.NODE_ENV === "development") {
  const server = new Server({
    urlPrefix: "http://localhost:8000/",
    namespace: "",
    routes() {
      this.get("/movies", (_schema, request) => {
        let moviesList = _moviesList;
        let categories: string[] = [];
        if (request.queryParams.category) {
          if (Array.isArray(request.queryParams.category)) {
            categories = request.queryParams.category;
          } else {
            categories = [request.queryParams.category];
          }
        }

        if (categories.length > 0) {
          moviesList = moviesList.filter((movie) =>
            categories.every((category) => movie.categories.includes(category))
          );
        }

        return new Response(
          200,
          { "Content-Type": "application/json" },
          { movies: moviesList }
        );
      });
      this.get("/movies/:id", (_schema, request) => {
        let moviesList = _moviesList;
        let id: number = parseInt(request.params.id);

        let movie = moviesList.find((movie) => movie.id === id);

        if (movie === undefined) {
          return new Response(
            404,
            { "Content-Type": "application/json" },
            { error: "Film nebyl nalezen" }
          );
        }

        return new Response(
          200,
          { "Content-Type": "application/json" },
          { movie: movie }
        );
      });
      this.put("/movies/:id", (_schema, request) => {
        const requestData = JSON.parse(request.requestBody);
        let moviesList = _moviesList;
        let id: number = parseInt(request.params.id);

        let movie = moviesList.find((movie) => movie.id === id);

        if (movie === undefined) {
          return new Response(
            404,
            { "Content-Type": "application/json" },
            { error: "Film nebyl nalezen" }
          );
        }

        return new Response(
          200,
          { "Content-Type": "application/json" },
          { message: "Film byl upraven", movie: requestData }
        );
      });
    },
  });
  server.passthrough();
}
