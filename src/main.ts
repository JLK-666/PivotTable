import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import ElementPlus from "element-plus";

import "./style.css";
import "element-plus/dist/index.css";
import "tailwindcss/tailwind.css";
const app = createApp(App);

app.use(router).use(ElementPlus).mount("#app");
