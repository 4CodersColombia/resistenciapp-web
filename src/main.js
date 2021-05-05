import "./heightViewPort.js";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { auth } from "./firebaseConfig";
import "./index.css";

Vue.config.productionTip = false;

// handle page reloads
let app;

auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
