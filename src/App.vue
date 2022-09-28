<template>
  <v-app>
    <v-main class="pa-5">
      <v-row>
        <BigButton button_text="Create New Routine"></BigButton>
        <ButtonWithIcon button_text="Arms"
                        button_icon="muscles/muscle.png"></ButtonWithIcon>
        <RoutineButton routine_author="Saul" routine_name="Core Strength"
        routine_stars="4.75"></RoutineButton>
      </v-row>
    </v-main>
  </v-app>
</template>
<script>

import BigButton from "@/components/BigButton";
import ButtonWithIcon from "@/components/ButtonWithIcon";
import RoutineButton from "@/components/RoutineButton";

export default {
  name: "App",

  components: {
    BigButton,
    ButtonWithIcon,
    RoutineButton,
  },
  data: () => ({
    //
  }),
};
</script>
