import { createWebHistory, createRouter } from "vue-router";
import { RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    alias: "/movies",
    name: "movies",
    component: () => import("./components/MoviesList.vue"),
  },
  {
    path: "/movies/:id",
    name: "movie-detail",
    component: () => import("./components/MovieDetail.vue"),
  },
  {
    path: "/movies/edit/:id",
    name: "movie-edit",
    component: () => import("./components/MovieEdit.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
