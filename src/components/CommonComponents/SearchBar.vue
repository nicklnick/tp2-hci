<template>
  <!-- hacer variable de si se esta descargando datos de la api-->
  <!-- loading arranca en true, y una vez que carguen todos se desactiva -->
  <!-- lo que puede pasar es que cargue el componente del front pero no la conexion con la api
  entonces hay un null pointer y se puede romper -->
  <v-text-field
    v-model="InputText" @keyup.enter="search"
    class="search-bar mt-6"
    label="Search"
    background-color="quaternary"
    color="black"
    append-icon="mdi-magnify"
    hide-no-data
    hide-details
    dense
    rounded
    filled
    solo-inverted
  ></v-text-field>
</template>

<script>
export default {
  name: "SearchBar",
  data() {
    return{
      InputText: ''
    }
  },
  methods: {
    search(){
      this.$router.push({name: 'SearchView', params:{input: this.InputText}})
    }
  }
};
</script>

<style scoped>
.search-bar {
  width: 35%;
  align-self: center;
}
</style>
