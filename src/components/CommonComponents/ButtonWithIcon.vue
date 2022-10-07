<template>

  <v-btn
    color="quaternary"
    height="150px"
    width="200px"
  >
    <div class="flex-column">
      <v-container class="pa-4">
        <v-img
          max-height="60"
          max-width="60"
          :src="require(`@/assets/${button_icon}`)"
        ></v-img>
      </v-container>

      <span>{{ button_text }}</span>
    </div>




  </v-btn>
  <!-- por alguna razon tengo que setear el height -->

</template>


<!-- por alguna razon tienen que ser 2 palabras-->
<script>
export default {
  name: "ButtonWithIcon",
  props: {
    button_text:{
      type: String,
      required: true
    },
    button_icon:{
      type: String,
      required: true
    }
  },
  computed: {

  }
};
</script>

<style scoped>


</style>