import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

import { colors } from "@/style/colors";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: colors.primary,
        secondary: colors.secondary,
        tertiary: colors.tertiary,
        quaternary: colors.quaternary,
      },
      // dark would be here
    },
  },
});
