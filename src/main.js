import { createApp, watch} from "vue";
import { createPinia } from 'pinia';
import "./sass/app.scss"
import App from "./App.vue";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.mount("#app");

watch(
  pinia.state,
  (state) => {
    localStorage.setItem("list", JSON.stringify(state.todo.list));
  },
  { deep: true }
  );
