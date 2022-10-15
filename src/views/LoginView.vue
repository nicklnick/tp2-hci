<template>
  <div class="screen">
    <v-card class="verify">
      <v-tabs v-model="tab" color="secondary">
        <v-tabs-slider color="secondary"></v-tabs-slider>

        <!-- Login -->
        <v-tab class="section" color="primary"> Log In </v-tab>
        <v-tab-item>
          <div class="details">
            <v-form>
              <v-container>
                <v-col>
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

                  <div>
                    <v-btn @click="login(rememberMe)" class="button" color="secondary"> Continue </v-btn>
                    <v-checkbox
                        label="Remember me"
                        color="secondary"
                        hide-details
                        @click="rememberMe = !rememberMe"
                    ></v-checkbox>
                  </div>

                  <p class="error-msg">{{errorMessage}}</p>
                  <LoadingImage v-if="loading===1"></LoadingImage>
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
                  <v-form v-model="validEmail">

                    <v-text-field
                      v-model="email"
                      :rules="[rules.required, rules.email]"
                      label="Email"
                      outlined
                      color="secondary"
                    ></v-text-field>
                  </v-form>

                  <v-form v-model="validUsername">
                  <v-text-field
                    v-model="username"
                    label="Username"
                    outlined
                    color="secondary"
                  ></v-text-field>
                  </v-form>

                  <v-form v-model="validPassword">

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
                  </v-form>

                  <v-form v-model="validPassword">
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
                  </v-form>

                  <v-btn @click="signup()" class="button" color="secondary">
                    Continue
                  </v-btn>
                  <p class="error-msg">{{errorMessage}}</p>
                  <LoadingImage v-if="loading===1"/>
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
import { UserApi } from "@/api/user"
import LoadingImage from "@/components/CommonComponents/LoadingImage";
import muscleGroups from "@/store/MuscleGroups";
import {CategoryApi} from "@/api/category";

export default {
  name: 'LoginView',
  components: { LoadingImage  },
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
      rememberMe: false,

      //messaging
      errorMessage: "",
      msg: "LOADING...",
      loading: 0 ,

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
  computed: {
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn',
      $online: 'online'
    }),
    ...mapActions(useSecurityStore, {
      $checkApiOnline: 'checkApiOnline'
    })
  },
  watch: {
    $isLoggedIn(newValue){
      if(newValue === true)
        this.$router.push({name: "Home"})
    }
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $login: 'login',
    }),
    setResult(result){
      switch(result.code ){
        case 4:
          this.errorMessage = result.description
          break;
        case 2:
          if(result.details[0].localeCompare("\"UNIQUE constraint failed: User.email\"") === 0){
            this.errorMessage = "Email already in use";
          }
          else{
            this.errorMessage = "Username already in use";
          }
          break;
      }
    },
    async LoadCategories() {
      let muscles = muscleGroups.muscles
      for (const key in muscles) {
        // let category = Category.constructor(muscles[key].id, muscles[key].name, muscles[key].name)
        await CategoryApi.add({name: muscles[key].name, detail: muscles[key].name})
      }
    },
    clearResult() {
      this.errorMessage = null
    },
    async login(rememberMe) {
      try {
        if(!this.validUsername || !this.validPassword){
          this.errorMessage = "Invalid username or password"
          return;
        }
        this.errorMessage = "";
        const credentials = new Credentials(this.username, this.password)

        this.loading = 1
        await this.$login(credentials, rememberMe? rememberMe : false)
        this.clearResult()

        let auxi = await CategoryApi.getAll()
        if( auxi.totalCount === 0) {
          await this.LoadCategories()
        }

      } catch (e) {
        this.setResult(e)
      }
      this.loading = 0;
    },
    async signup(){
      try {
        if(!this.validUsername || !this.validPassword || !this.validEmail){
          this.errorMessage = "Invalid username, password or email"
          return;
        }
        this.errorMessage = "";

        this.loading = 1;
        await UserApi.signup(this.username,this.password,this.email);
        this.$router.push({name: "Verify Email"})

      } catch (e) {
        this.setResult(e);
      }
      this.loading = 0;
    },
    abort() {
        this.controller.abort()
    },
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

      await this.$checkApiOnline;

      if(!this.$online){
        await this.$router.push({ name: "Error" });
      }
      if(this.$isLoggedIn){   // TODO: !!!! check !!!!
        await this.$router.push({ name: "Home" });
      }

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
.verify {
  width: 50%;
}

.section {
  width: 50%;
}

.details {
  height: 75vh;
}

</style>