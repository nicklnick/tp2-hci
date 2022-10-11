<template>
  <div  class="total-height">
    <div class="top-height">
      <TopBar></TopBar>
    </div>

    <div class="bottom-height d-flex  width">
      <div class="w2" >
        <SideMenu></SideMenu>
      </div>
      <div class="general-area width ">

        <!-- CONTENT GOES HERE -->
        <CustomCard card-title="Your Exercises" card-height="600" card-width="1000" >
          <div class="cheight cwidth row-center ">
            <div  class="cheight general-area-width overflow-auto">


              <!-- Create new exercise -->
              <v-card elevation="20" class="general-area new-activity" v-if="mode !== 0" color="quaternary" >
                <div class="space-between-col general-area-width general-area-height">

                  <h2>New exercise</h2>
                  <v-spacer></v-spacer>
                  <v-divider></v-divider>

                  <v-text-field rounded outlined color="secondary"
                                background-color="tertiary" label="Exercise name"
                                class="py-2" :rules="titleRules" v-model="newActivityTitle"
                  ></v-text-field>
                  <div class="row-center">
                    <v-text-field rounded outlined color="secondary"
                                  background-color="tertiary" label="Exercise length (s)"
                                  class="py-2" :rules="numberRules" v-model="newActivityTime"
                    ></v-text-field>
                    <v-spacer></v-spacer>
                    <v-text-field rounded outlined color="secondary"
                                  background-color="tertiary" label="Number of series"
                                  class="py-2" :rules="numberRules" v-model="newActivitySeries"
                    ></v-text-field>
                  </div>

                  <div class="row-end">
                    <span class="error-msg">{{errorMessage}}</span>
                    <v-spacer></v-spacer>
                    <v-btn class="mb-2 mr-3"  color="secondary"
                           @click="checkAndDismiss">
                      <v-icon>check</v-icon>
                    </v-btn>
                    <v-btn class="mb-2"  color="secondary"
                           @click="stopCreationMode">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </div>
                </div>

              </v-card>

              <!-- View existing exercises -->
              <v-card class="d-flex justify-space-between my-2 quaternary" v-for="(sport, index) in $items"
                      :key="index">

                <div class="col-start pl-3 pt-1">
                  <p class="pa-0 ma-0">Name: {{sport.name}}</p>
                  <p class="pa-0 ma-0">Details: {{sport.detail}}</p>
                </div>

                <div class="space-evenly-col">
                  <v-btn text fab x-small color="dark-grey"
                         @click="removeSport(sport)"
                  ><v-icon>mdi-close</v-icon></v-btn>
                  <v-btn text fab x-small color="dark-grey"
                  @click="setEditingMode(sport)"
                  ><v-icon>mdi-pencil</v-icon></v-btn>
                </div>

              </v-card>

            </div>
          </div>


          <v-btn class="mb-10" fab absolute right bottom color="secondary"
                 @click="setCreationMode">
            <v-icon>mdi-plus</v-icon>
          </v-btn>

        </CustomCard>

      </div>
    </div>

  </div>
</template>

<script>


import TopBar from "@/components/Navigation/TopBar";
import SideMenu from "@/components/Navigation/SideMenu";
import CustomCard from "@/components/CommonComponents/CustomCard";
import { useSportStore } from "@/stores/SportStore";
import { Sport } from "@/api/sport";
import { mapActions, mapState } from "pinia";

import { useSecurityStore } from "@/stores/SecurityStore";



export default {
  name: "ManageExercisesView",
  components: {
    CustomCard,

    SideMenu,
    TopBar
  },
  data: () => ({
    mode: 0,        // 0: normal mode, 1: creation mode, 2: editing mode
    activities: [ ],
    newActivityTitle: "",
    newActivityTime: "0",
    newActivitySeries: "0",
    errorMessage: null,

    editingId: null,

    sportStore: null,



    numberRules: [
      value => !(/[^0-9]/.test(value)) || 'Only numbers',
      value => (/^[1-9][0-9]*/.test(value)) || 'Only numbers > 0'
    ],
    titleRules: [
      value => !!value || 'Required',
    ],
  }),
  computed: {
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn',
      $online: 'online'
    }),
    ...mapActions(useSecurityStore, {
      $checkApiOnline: 'checkApiOnline',
    }),
    ...mapState(useSportStore,{
      $items: 'items',
    }),
  },
  async created() {
    const securityStore = useSecurityStore();
    await securityStore.initialize();

    await this.$checkApiOnline;

    if(!this.$online){
      console.log("redirecting")
      await this.$router.push({ name: "Error" });
    }
    if(this.$isLoggedIn === false){   // TODO: !!!! check !!!!
      await this.$router.push({name: "Login"});
    }

    this.sportStore = useSportStore();
    await this.sportStore.updateCache();
  },
  methods: {
    ...mapActions(useSportStore, {
      $createSport: 'create',
      $modifySport: 'modify',
      $deleteSport: 'delete',
      $getSport: 'get',
      $getAllSports: 'getAll',
      $updateCache: 'updateCache',
    }),
    setEditingMode(sport){
      this.mode =  2;
      this.editingId = sport.id;
      this.newActivityTitle = sport.name;
      this.newActivityTime = sport.detail.split(" ")[2]
      this.newActivitySeries = sport.detail.split(" ")[5]
    },
    removeSport(sport){
      this.$deleteSport(sport)
    },
    setCreationMode() {
      this.mode =  1;
    },
    stopCreationMode(){
      this.resetNewActivity();
      this.mode = 0;
    },
    resetNewActivity(){
      this.newActivityTitle  = "";
      this.newActivityTime = this.newActivitySeries = 0;
    },
    checkNewActivity(){
      if(this.newActivityTitle === "")
        return false;
      if ( (/[^0-9]/.test(this.newActivitySeries)) || (/[^0-9]/.test(this.newActivityTime)) )
        return false;
      if (!(/^[1-9][0-9]*/.test(this.newActivitySeries)) && !(/^[1-9][0-9]*/.test(this.newActivityTime)) )
        return false;

      return true;
    },
    errorHandling(result){
      switch(result.code ){
        case 4:
          this.errorMessage = result.description
          break;
        case 2:
          if(result.details[0].localeCompare("\"UNIQUE constraint failed: Sport.name\""))
            this.errorMessage = "Sport name already exists"
        }
      },
    async checkAndDismiss(){
      if(this.checkNewActivity()){
        try{
          if(this.mode ===1){
            await this.$createSport(new Sport(null, this.newActivityTitle, `Time (s): ${this.newActivityTime} | Series: ${this.newActivitySeries}`))
          }
          else{
            await this.$modifySport(new Sport(this.editingId, this.newActivityTitle, `Time (s): ${this.newActivityTime} | Series: ${this.newActivitySeries}`));
          }
        }
        catch (e) {
            this.errorHandling(e)
            return;
        }
        this.errorMessage = null;
        this.stopCreationMode();
      }
    }
  },
};
</script>

<style scoped>
.total-height{
  height: 100%;
}
.top-height{
  height: 10%;
}
.bottom-height{
  height: 90%;
}
.width{
  width: 100%;
}
.w2{
  width: 15%;
}
.general-area{               /* !!!! COMMON !!!! */
  display: flex;
  justify-content: center;
  align-items: center;
  zoom:90%;
}
.cwidth {
  width: 1000px;
}
.cheight {
  height: 540px;
}
.general-area-height {                /* !!!! COMMON !!!! */
  height: 90%;
}
.new-activity{
  margin-bottom: 20px;
  margin-top: 20px;
}
.general-area-width {                /* !!!! COMMON !!!! */
  width: 90%;
}



</style>