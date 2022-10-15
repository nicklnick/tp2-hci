<template>
  <div  class="total-height">
    <div class="top-height">
      <TopBar></TopBar>
    </div>

    <div class="bottom-height d-flex  width">
      <div class="w2" >
        <SideMenu></SideMenu>
      </div>
      <div class="general-area width">
        <div class="flex-container">
          <div>
            <IconUser></IconUser>
          </div>
          <div class="mt-3">
            <p class="font-weight-bold" v-if="this.$user">{{this.$user.username}}</p>
            <p class="font-weight-bold" v-else>Username</p>
          </div>
          <div class="info-fields">
            <div class="d-flex flex-column align-center justify-center mb-2">
              <v-container class="ma-2">
                <v-form v-model="areFieldsValid">
                <div class="flex-horizontal-container">
                  <v-text-field
                      dense
                      solo
                      rounded
                      outlined
                      background-color="tertiary"
                      color="secondary"
                      append-icon="edit"
                      label="First Name"
                      :rules="[rules.max(currFirstName), rules.invalidChar(currFirstName)]"
                      :value="currFirstName"
                      v-model="currFirstName"
                  ></v-text-field>
                  <v-spacer></v-spacer>
                  <v-text-field
                      dense
                      solo
                      rounded
                      outlined
                      background-color="tertiary"
                      color="secondary"
                      append-icon="edit"
                      label="Last Name"
                      :rules="[rules.max(currLastName), rules.invalidChar(currLastName)]"
                      :value="currLastName"
                      v-model="currLastName"
                  ></v-text-field>
                </div>

                <!-- Calendar -->
                <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                        dense
                        solo
                        rounded
                        hide-details
                        outlined
                        class="mb-3"
                        background-color="tertiary"
                        color="secondary"
                        v-model="date"
                        label="Birthday Date"
                        append-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="date"
                      :active-picker.sync="activePicker"
                      :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                      min="1950-01-01"
                      @change="this.save"
                  ></v-date-picker>
                </v-menu>
                </v-form>
                <!-- -->
                <v-text-field
                      dense
                      solo
                      rounded
                      hide-details
                      outlined
                      readonly
                      background-color="tertiary"
                      color="secondary"
                      label="Email"
                      :value="this.$user?.email"
                  ></v-text-field>
                <div>
                  <v-btn v-if="areFieldsValid" @click="modifyUser" class="button mt-3" color="secondary">
                    Save Changes
                  </v-btn>
                  <v-btn v-else disabled @click="modifyUser" outlined class="button mt-3" color="secondary">
                    Save Changes
                  </v-btn>
                </div>
              </v-container>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TopBar from "@/components/Navigation/TopBar";
import SideMenu from "@/components/Navigation/SideMenu";
import IconUser from "@/components/UserProfile/IconUser";
import {mapActions, mapState} from "pinia";
import {useSecurityStore} from "@/stores/SecurityStore";

export default {
  name: "UserProfileView",
  components: {
    TopBar,
    SideMenu,
    IconUser
  },
  data() {
    return {
      areFieldsValid: true,
      errorMsg: null,
      // fields
      currFirstName: null,
      currLastName: null,
      currBirthdate: null,

      // calendar
      activePicker: null,
      date: null,
      menu: false,
      rules: {
        max: (value) => value?.length < 32 || "Max 32 characters",
        invalidChar: (value) => {
          // checks that given string only contains characters
          const pattern = /^(?!.*(\W|\d)).*$/
          return pattern.test(value) || "Invalid characters"
        }
      }
    }
  },
  computed: {
    ...mapState(useSecurityStore, {
      $user: 'user'
    }),
  },
  watch: {
    menu (val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  methods: {
    ...mapActions(useSecurityStore, {
      $getCurrentUser: 'getCurrentUser',
      $modifyUser: 'modify'
    }),
    setLocalFields() {
      this.currFirstName = this.$user.firstName
      this.currLastName = this.$user.lastName

      if(this.$user.birthdate < 19500101)
        this.$user.birthdate = 19500101
      this.currBirthdate = this.$user.birthdate

      this.date = this.parseDate(this.$user.birthdate)
    },
    async modifyUser() {
      try {
        await this.$modifyUser({"firstName": this.currFirstName, "lastName": this.currLastName, "birthdate": parseInt(this.currBirthdate)})

        await this.$getCurrentUser()
        this.setLocalFields()
      } catch(e) {
        this.setError(e)
      }
    },
    // calendar
    save(date) {
      this.$refs.menu.save(date)
      this.currBirthdate = date.replace(/-/g, '')
    },
    parseDate(date) {
      let day = date % 100
      date /= 100
      let month = date % 100
      date /= 100

      return `${~~date}-${(~~month < 10? "0": "") + ~~month}-${(~~day < 10? "0": "") + ~~day}`
    },
    // error handling
    setError(error) {
      console.log(error.code)
      switch (error.code) {
        case 1: // invalid data
          this.errorMsg = "";
          break;
      }
    }
  },
  async created() {
    // Siempre inicializarlo!!!!!
    const securityStore = useSecurityStore();
    await securityStore.initialize();
    await securityStore.checkApiOnline();


    if(securityStore.online === false){
      await this.$router.push({ name: "Error" });
    }
    if(securityStore.isLoggedIn === false){   // TODO: !!!! check !!!!
      await this.$router.push({ name: "Login" });
    }
    else {
      this.setLocalFields()
    }
  },
}
</script>

<style scoped>

.total-height {
  height: 100%;
}

.top-height {
  height: 10%;
}

.bottom-height {
  height: 90%;
}

.width {
  width: 100%;
}

.w2 {
  width: 15%;
}

.general-area{               /* !!!! COMMON !!!! */
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-fields {
  width: 100%;
}

.flex-container {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.flex-horizontal-container {
  display: flex;
  flex-flow: row;
  justify-content: center;
}
</style>