import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

import SigninView from "@/views/signin-view.vue";

import { ROUTES_TO, FIRST_PAGE } from "@/constants";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: ROUTES_TO.signin,
    name: "SigninView",
    component: SigninView,
  },
  {
    path: ROUTES_TO.signup,
    name: "SignupView",
    component: () => import("@/views/signup-view.vue"),
  },
  {
    path: `${ROUTES_TO.chats}/:pageNumber`,
    name: "ChatsView",
    component: () => import("@/views/chats-view.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: ROUTES_TO.createChat,
    name: "ChatCreateView",
    component: () => import("@/views/chat-create-view.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "*",
    redirect: ROUTES_TO.signin,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta?.requiresAuth) {
    if (!localStorage.getItem("isAuthenticated")) {
      router.push({ name: "SigninView" });
    } else {
      next();
    }
  } else {
    if (localStorage.getItem("isAuthenticated")) {
      router.push(`${ROUTES_TO.chats}/${FIRST_PAGE}`);
    } else {
      next();
    }
  }
});

export default router;
