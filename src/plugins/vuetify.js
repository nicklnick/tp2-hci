import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import { colors } from "@/style/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#00FFAB",
        secondary: "#14C38E",
        tertiary: "#B8F1B0",
        quaternary: "#E3FCBF",
      },
      // dark would be here
      dark: {
        primary: colors.primary,
        secondary: colors.secondary,
        tertiary: colors.tertiary,
        quaternary: colors.quaternary,
      }
    },
  },
});
