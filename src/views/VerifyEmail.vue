<template>
  <div class="screen">
    <v-card class="verify">
      <h1 class="pt-3">Verify Email</h1>
      <div class="px-10 space-evenly-col">
        <v-form v-model="validEmail">

          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="Email"
            outlined
            color="secondary"
          ></v-text-field>

        </v-form>
        <v-form v-model="validCode">
        <v-text-field v-model="code" :rules="[rules.required]" label="Code"
                      outlined color="secondary">

        </v-text-field>
        </v-form>

        <v-btn @click="verify()" class="button" color="secondary"> Continuar </v-btn>
        <p class="error-msg">{{errorMessage}}</p>
      </div>
    </v-card>
  </div>
</template>

<script>

import { UserApi } from "@/api/user"

export default {
  name: "VerifyEmail",
  data() {
    return {
      email: "",
      validEmail: "",
      code: "",
      validCode: "",
      errorMessage: "",

      rules: {
        required: (value) => !!value || "Required.",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    }
  },
  methods: {
    setResult(result){
      this.errorMessage = result.details[0]
    },
    async verify() {
      try{
        if(!this.validCode || !this.validEmail){
          this.errorMessage = "Invalid code or email"
          return;
        }
        this.errorMessage = "";
        await UserApi.verifyEmail(this.email,this.code);

        this.$router.push("/login")

      } catch (e) {
          this.setResult(e);
        }
      }
    },
};
</script>

<style scoped>
.screen {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 50px;
}

.verify {
  width: 50%;
  height: 300px;
}
</style>