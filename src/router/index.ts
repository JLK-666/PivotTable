import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routerHistory = createWebHistory();

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/index"
  },
  {
    path: "/index",
    name: "index",
    component: () => import("@/views/PivotTable/pivotTable.vue"),
    meta: {
      title: "index",
      noCache: true
    }
  }
];

const router = createRouter({
  history: routerHistory,
  routes
});

export default router;
