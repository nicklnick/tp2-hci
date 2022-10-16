<template>
  <div>
    <v-row class="width">
    <v-col cols="3" v-for="(routine, index) in visibleRoutines"
           :key="index"
           v-bind:visibleRoutines="visibleRoutines"
           v-bind:pageNumber="pageNumber"
           v-bind:routine="routine"
    >
        <RoutineButton :routine_author="routine.user.username"
                       :routine_name="routine.name"
                       :routine_difficulty="routine.difficulty"
                       :routine_id="routine.id"
                       :routine_category="routine.category?.name"
                       :routine_detail="routine.detail"
        ></RoutineButton>
    </v-col>
    </v-row>
    <v-spacer></v-spacer>
    <v-pagination v-if="amountPages > 1"
                  v-model="page"
                  :length="amountPages"
                  circle
                  @next="nextPage"
                  @previous="previousPage"
                  @input="inputPage"
                  color="secondary"
    ></v-pagination>
  </div>
</template>

<script>
import RoutineButton from "@/components/Routines/RoutineButton";
export default {
  name: 'PaginationGrid',
  components: {
    RoutineButton,
  },
  data(){
    return {
      page: 1,
      pageNumber: 0,
      pageSize: 8,
      visibleRoutines: []
    }
  },
  props: {
    routineArray:{
      type: Array,
      default: () => [],
      required: true
    }
  },
  watch: {
    routineArray(){
      this.updateVisibleRoutines()
    }
  },
  computed: {
    amountPages() {
      return Math.ceil(parseInt(this.routineArray.length) / this.pageSize)
    }
  },
  methods: {
    updateVisibleRoutines(){
      this.visibleRoutines = this.routineArray.slice(this.pageNumber * this.pageSize, (this.pageNumber * this.pageSize) + this.pageSize)

      if(this.visibleRoutines.length === 0 && this.pageNumber > 0){
        this.updatePage(this.pageNumber - 1)
      }
    },
    updatePage(PageNumber){
      this.pageNumber = PageNumber;
      this.updateVisibleRoutines()
    },
    nextPage() {
      if(this.pageNumber + 1 < this.amountPages){
        this.pageNumber += 1;
        this.updateVisibleRoutines()
      }
    },
    previousPage(){
      if( this.pageNumber > 0){
        this.pageNumber -= 1;
        this.updateVisibleRoutines()
      }
    },
    inputPage(number){
      this.pageNumber = number -1;
      this.updateVisibleRoutines()
    }
  },
  created() {
    this.updateVisibleRoutines()
  }
}
</script>

<style scoped>

.width{
  width: 100%;
}
</style>