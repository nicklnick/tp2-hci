<template>

  <v-btn
  color="primary"
  height="150px"
  width="200px"
  ><h4>{{ button_text }}</h4></v-btn>
  <!-- por alguna razon tengo que setear el height -->

</template>


<!-- por alguna razon tienen que ser 2 palabras-->
<script>
export default {
  name: "BigButton",
  props: {
    button_text:{
      type: String,
      required: true
    }
  },
  computed: {
    // eslint-disable-next-line vue/no-dupe-keys
    text() {
      return this.button_text;
    }
  }
};
</script>

<style scoped>
.v-btn {
}

</style>