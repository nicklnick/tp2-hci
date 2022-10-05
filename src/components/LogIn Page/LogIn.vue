<template>
  <div>
    <div class="d-flex justify-end">
      <v-btn class="button black--text" color="quaternary" rounded>LogIn</v-btn>
      <v-btn class="button black--text" color="primary" rounded>Sign Up</v-btn>
    </div>
    <div class="screen">
      <v-card
        class="flex-column justify-center rounded-lg"
        height="70%"
        width="35%"
        color="quaternary"
        rounded
      >
        <div flat>
          <v-btn
            class="flex button2 rounded-0 black--text"
            color="quaternary"
            elevation="0"
          >
            Log In
          </v-btn>
          <v-btn
            class="flex button2 rounded-0 black--text"
            color="secondary"
            elevation="0"
          >
            Register
          </v-btn>
        </div>
        <div>
          <h1>a</h1>
        </div>

        <v-form>
          <v-container class="prueba2">
            <v-col align="center">
              <v-text-field
                v-model="first"
                label="Email"
                outlined
                color="secondary"
                class="prueba"
              ></v-text-field>

              <v-text-field
                v-model="last"
                label="Password"
                outlined
                color="secondary"
              ></v-text-field>
              <v-btn class="button" color="secondary"> Continuar </v-btn>
            </v-col>
          </v-container>
        </v-form>
      </v-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "LogInPage",
};
</script>

<style>
.button {
  outline: rebeccapurple;
  width: 100px;
  margin: 10px;
  border: thick;
}

.button2 {
  width: 50%;
  padding-bottom: 1px;
  border-radius: 0px;
}

.prueba {
  margin-top: 200px;
  margin-bottom: 400px;
  display: inline;
}

.prueba2 {
  overflow: auto;
}

h1 {
  color: #e3fcbf;
}

.screen {
  height: 100vh;
}
</style>
