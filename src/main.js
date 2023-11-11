import "./assets/main.css";
import "primevue/resources/themes/nano/theme.css";
import "primeicons/primeicons.css";
import "/node_modules/primeflex/primeflex.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import { useSupabase } from "@/stores/useSupabase.js";
import PrimeVueConfigurator from "./utils/PrimeVueConfigurator";

import App from "./App.vue";
import router from "./router";

const pinia = createPinia();

const app = createApp(App);

PrimeVueConfigurator.init(app);

app.use(pinia);
app.use(router);
useSupabase();
app.mount("#app");
