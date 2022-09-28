<template>
  <v-app>
    <v-main class="pa-5">
      <v-row>
        <BigButton button_text="Create New Routine"></BigButton>
        <ButtonWithIcon button_text="Arms"
                        button_icon="muscles/muscle.png"></ButtonWithIcon>
        <RoutineButton routine_author="Saul" routine_name="Core Strength"
        routine_stars="4.75"></RoutineButton>
        <RoutineButton2 routine_author="Saul" routine_name="Core Strength"
                       routine_stars="4.75"></RoutineButton2>

      </v-row>

    </v-main>
  </v-app>
</template>
<script>

import BigButton from "@/components/BigButton";
import ButtonWithIcon from "@/components/ButtonWithIcon";
import RoutineButton from "@/components/RoutineButton";
import RoutineButton2 from "@/components/RoutineButton2";

export default {
  name: "App",

  components: {
    BigButton,
    ButtonWithIcon,
    RoutineButton,
    RoutineButton2
  },
  data: () => ({
    //
  }),
};
</script>
