import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home"),
  },
  {
    path: "/suggestions",
    name: "suggestions",
    component: () => import("../views/Suggestions"),
  },
  {
    path: "/photo/:photoId",
    name: "photo",
    component: () => import("../views/Photo.vue"),
    props: true,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/About.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
