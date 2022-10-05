<template>
  <v-card  class="cwidth cheight rounded-xl" color="quaternary" raised>
    <div class="cwidth cheight space-start-col" >
      <div>
        <v-card class="rounded-b-0 rounded-t-xl cwidth top-bar-height row-center" color="secondary">
          <h2 >Exercises</h2>
        </v-card>
      </div>


      <div class="cwidth row-center overflow-auto">
        <div class="general-area-width">
          <v-card color="d-flex justify-space-between my-2 quaternary" v-for="(activity, index) in activities"
                  :key="index">
            <div class="pl-3 pt-1">
              <p class="pa-0 ma-0">Name: {{activity.name}}</p>
              <p class="pa-0 ma-0">Details: {{activity.details}}</p>
            </div>

            <v-btn text fab x-small color="dark-grey"
                   @click="removeActivity(index)"
            ><v-icon>mdi-close</v-icon></v-btn>

          </v-card>
        </div>
      </div>


      <v-btn class="mb-10" fab absolute right bottom color="secondary"
      @click="addActivity('New Activity')"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script>
class Activity {
  name;
  details = "";
  constructor(name) {
    this.name = name;
  }
}
export default {
  name: "ManageExercises",

  data: () => ({
    activities: [ new Activity("chau")]
  }),
  methods: {
    removeActivity(index){
      this.activities.splice(index,1);
    },
    addActivity(name) {
      this.activities.push(new Activity(name));
    }
  },
};
</script>

<style scoped>
.top-bar-height{
  height: 35px;
}

.cwidth {
  width: 400px;
}
.cheight {
  height: 500px;
}
.row-center {                 /* !!!! COMMON !!!! */
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.general-area-height {                /* !!!! COMMON !!!! */
  height: 90%;
}
.space-start-col{
  display: flex;
  justify-content: start;
  flex-direction: column;
}


.general-area-width {                /* !!!! COMMON !!!! */
  width: 90%;
}
.end-row {                /* !!!! COMMON !!!! */
   display: flex;
   justify-content: end;
   flex-direction: row;
 }

</style>