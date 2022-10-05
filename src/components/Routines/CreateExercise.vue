<template>
  <v-card color="quaternary" class="rounded-xl cheight cwidth">

    <div class="general-area">
       <div class="general-area-width general-area-height space-between-col">
            <div>
              <h2 >New exercise</h2>
              <v-text-field rounded outlined color="secondary"  hide-details
                            background-color="tertiary" label="Title"
                            class="py-2"></v-text-field>

              <v-textarea rounded outlined color="secondary" hide-details
                          background-color="tertiary" label="Description" no-resize
                          class="py-2"></v-textarea>
            </div>
            <div>
              <v-divider></v-divider>
            </div>

         <div>
           <div class="row-start">
             <p>Number of Series:</p>
             <div class="text-field">
               <v-text-field class="pl-2 py-0 my-0"  hide-details single-line></v-text-field>
             </div>
           </div>

           <div class="row-start">
             <p>Time:</p>
             <div class="text-field">
               <v-text-field class="pl-2 py-0 my-0"  hide-details single-line></v-text-field>
             </div>
           </div>
         </div>

          <div class="end-row">
            <v-btn rounded color="secondary">Done</v-btn>
          </div>
          </div>
    </div>





  </v-card>
</template>

<script>
export default {
  name: "RoutineOverview",
  data: () => ({
    time: "45",
    dificulty: [1,2,3,4,5],
    dif: ""
  }),

  computed: {
    time_val() {
      return this.time;
    },
  },
};
</script>

<style scoped>

.general-area{               /* !!!! COMMON !!!! */
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.space-between-col{               /* !!!! COMMON !!!! */
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.cheight {
  height: 500px;
}
.cwidth{
  width: 300px;
}

.end-row {                /* !!!! COMMON !!!! */
  display: flex;
  justify-content: end;
  flex-direction: row;
}
.general-area-width {                /* !!!! COMMON !!!! */
  width: 85%;
}

.general-area-height {                /* !!!! COMMON !!!! */
  height: 90%;
}

.row-start {
  display: flex;
  flex-direction: row;
  justify-content: start;
}
.text-field {
  width: 20%;
  padding-left: 5px;
  padding-bottom: 0;
  padding-top: 0;
}

</style>