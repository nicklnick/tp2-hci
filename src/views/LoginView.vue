<template>
  <div class="screen">
    <v-card class="login">
      <v-tabs v-model="tab" color="secondary">
        <v-tabs-slider color="secondary"></v-tabs-slider>

        <!-- Login -->
        <v-tab class="section"> Log In </v-tab>
        <v-tab-item>
          <div class="details">
            <v-form>
              <v-container>
                <v-col align="center">
                  <v-form v-model="validUsername">
                  <v-text-field
                      v-model="username"
                      label="Username"
                      :rules="[rules.required]"
                      outlined
                      color="secondary"
                    ></v-text-field>
                  </v-form>

                  <v-form v-model="validPassword">
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
                  </v-form>

                  <v-btn @click="login" class="button" color="secondary"> Continuar </v-btn>

                  <p class="error-msg">{{errorMessage}}</p>
                </v-col>
              </v-container>
            </v-form>
          </div>
        </v-tab-item>

        <!-- Signup -->
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
                    v-model="username"
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
  </div>
</template>

<script>


import { mapState, mapActions } from "pinia"
import { useSecurityStore } from "@/stores/SecurityStore";
import { Credentials } from "@/api/user";

export default {
  name: 'LoginView',
  components: {  },
  data() {
    return {
      show1: false,
      tab: '',
      title: "Preliminary report",

      // login details
      email: "",
      validEmail: "",
      password: "",
      validPassword: "",
      ConfirmPassword: "",
      username: "",
      validUsername: "",

      path: this.$route.path,
      errorMessage: "",
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
  computed: {
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
  },
  watch: {
    $isLoggedIn(newValue){
      if(newValue === true)
        this.$router.push("/home")
    }
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $login: 'login',
    }),
  setResult(result){
    this.errorMessage = result.details[0]
  },
  clearResult() {
    this.errorMessage = null
  },
  async login() {
    try {
      if(!this.validUsername || !this.validPassword){
        this.errorMessage = "Invalid username or password"
        return;
      }
      this.errorMessage = "";
      const credentials = new Credentials(this.username, this.password)
      await this.$login(credentials, true)
      this.clearResult()
    } catch (e) {
      this.setResult(e)
    }
    },
    abort() {
        this.controller.abort()
      }
    },
    async created() {
      if(this.path==='/login'){
        this.tab= 0
      }
      else{
        this.tab = 1
      }
      const securityStore = useSecurityStore();
      await securityStore.initialize();
    }
}
</script>

<style scoped>
.screen {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  padding-top: 50px;
}
.login {
  width: 50%;
}

.section {
  width: 50%;
  color: rebeccapurple;
}

.details {
  height: 60vh;
}

.error-msg{
  color: red;
}
</style>