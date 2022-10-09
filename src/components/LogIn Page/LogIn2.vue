<template>
  <v-card class="verify">
    <v-tabs v-model="tab" color="secondary">
      <v-tabs-slider color="secondary"></v-tabs-slider>
      <v-tab class="section"> Log In </v-tab>
      <v-tab-item>
        <div class="details">
          <v-form>
            <v-container>
              <v-col align="center">
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="Email"
                  outlined
                  color="secondary"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="input-10-1"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                  label="Password"
                  outlined
                  color="secondary"
                ></v-text-field>
                <v-btn class="button" color="secondary"> Continuar </v-btn>
              </v-col>
            </v-container>
          </v-form>
        </div>
      </v-tab-item>
      <v-tab class="section">Sign Up</v-tab>
      <v-tab-item>
        <div class="details">
          <v-form>
            <v-container>
              <v-col align="center">
                <v-text-field
                  v-model="email"
                  :rules="[rules.required, rules.email]"
                  label="Email"
                  outlined
                  color="secondary"
                ></v-text-field>

                <v-text-field
                  v-model="first"
                  label="Username"
                  outlined
                  color="secondary"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  label="Password"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="password"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                  outlined
                  color="secondary"
                ></v-text-field>

                <v-text-field
                  v-model="ConfirmPassword"
                  name="confirmpassword"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[
                    rules.required,
                    !!ConfirmPassword || 'type confirm password',
                    password === ConfirmPassword ||
                      'The password confirmation does not match.',
                  ]"
                  :type="show1 ? 'text' : 'password'"
                  hint="Same password"
                  counter
                  @click:append="show1 = !show1"
                  label="Re Enter Password"
                  outlined
                  color="secondary"
                ></v-text-field>
                <v-btn class="button" color="secondary">
                  Continuar
                </v-btn>
              </v-col>
            </v-container>
          </v-form>
        </div>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
export default {
  name: "LogIn2",
  created() {
    if(this.path==='/login'){
      this.tab= 0
    }
    else{
      this.tab = 1
    }
  },
  data() {
    return {
      show1: false,
      tab: '',
      title: "Preliminary report",
      email: "",
      password: "",
      ConfirmPassword: "",
      path: this.$route.path,
      rules: {
        required: (value) => !!value || "Required.",
        confirmPasswordRules: [
          (value) => !!value || "type confirm password",
          (value) =>
            value === this.password ||
            "The password confirmation does not match.",
        ],
        min: (v) => v.length >= 8 || "Min 8 characters",
        email: (value) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Invalid e-mail.";
        },
      },
    };
  },
};
</script>

<style>
.verify {
  width: 50%;
}

.section {
  width: 50%;
  color: rebeccapurple;
}

.details {
  height: 75vh;
}
</style>
