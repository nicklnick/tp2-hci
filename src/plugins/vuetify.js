import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#02e096",
        secondary: "#14C38E",
        tertiary: "#B8F1B0",
        quaternary: "#E3FCBF",
      },
    },
  },
});
