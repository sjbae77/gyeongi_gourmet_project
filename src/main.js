import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store"; // Vuex Store 가져오기

const app = createApp(App)
app.use(router) // Vue Router 연결
// app.use(store); // Vuex 연결
// app.mount('#app')

store.dispatch("fetchUser").then(() => {
  app.use(store).mount("#app");
});