<template>
    <v-btn color="quaternary" height="190px" width="315px" link :to="`/routines/view/${routine_id}`">
      <v-card color="quaternary" height="190px" width="315px">
        <div class="flex-container pt-2">
          <v-list-item-title class="align-self-start headline pb-3 pl-3 card-text">{{routine_name}}</v-list-item-title>
        <!-- <v-card-title class="card-text" height="1em"> {{routine_name}} </v-card-title> -->
          <v-list-item-subtitle class="align-self-start pb-3 pl-3 card-text">By: {{routine_author}}</v-list-item-subtitle>
          <v-card-text class="text-start">
            <div class="align-content-start justify-content-start card-text">
              {{routine_detail}}
            </div>
          </v-card-text>
        </div>
        <div>
        <v-card-actions class="justify-end">
          <v-chip-group>
            <v-chip small color="#7AE6F8">
              {{routine_category}}
            </v-chip>
            <v-chip small :color="difficulty_color">
              {{routine_difficulty}}
            </v-chip>

          </v-chip-group>
          <v-btn @click.prevent="update()" icon>
            <v-icon :color="this.heart_color"
            >favorite</v-icon>
          </v-btn>
        </v-card-actions>
          </div>
      </v-card>
    </v-btn>
</template>

<script>
import {useSecurityStore} from "@/stores/SecurityStore";
import { useFavouriteStore} from "@/stores/FavouriteStore";
import { FavouriteApi } from "@/api/favourites";
import {mapActions} from "pinia";

export default {
  name: "RoutineButton",
  data: () => ({
    heart_color: "grey darken-2",
    difficulty_color: null,
    favourite: 0
  }),
  props:{
      routine_name: {
        type: String,
        required: true
      },
      routine_author: {
        type: String,
        required: true
      },
      routine_detail: {
        type: String,
        required: true
      },
      routine_difficulty: {
        type: String,
        required: true
      },
      routine_category: {
        type: String,
        required: true
      },
      routine_id: {
        type: Number,
        required: true
      }
  },
  watch: {
    async routine_id() {
      const isFavourite = await FavouriteApi.checkFavourite(this.routine_id);
      if (isFavourite === true) {
        this.favourite = 1;
        this.heart_color = "primary";
      }else {
        this.favourite = 0;
        this.heart_color = "grey darken-2";
      }
      this.getDifficultyColor();
    }
  },
  computed: {
    ...mapActions(useFavouriteStore, {
      $addToFavourites: 'addToFavourites',
      $removeFromFavourites: 'remove',
    })
  },
  methods: {
    update(){
      this.switchColor()
      this.alternateFavourite()
    },
    switchColor() {
      this.heart_color = this.heart_color === "primary" ? "grey darken-2" : "primary";
    },
    getDifficultyColor() {
      if(this.routine_difficulty === "rookie")
        this.difficulty_color = "blue lighten-4"
      else if(this.routine_difficulty === "beginner")
        this.difficulty_color = "blue lighten-1"
      else if(this.routine_difficulty === "intermediate")
        this.difficulty_color =  "yellow"
      else if(this.routine_difficulty === "advanced")
        this.difficulty_color = "orange"
      else
        this.difficulty_color = "red"
    },
  async alternateFavourite() {
     if(parseInt(this.favourite) === 0) {
       this.favourite = 1;
       await FavouriteApi.markAsFavourite(this.routine_id);
       this.heart_color = "primary"
     } else {
       this.favourite = 0;
       await FavouriteApi.removeAsFavourite(this.routine_id);
       this.heart_color = "grey darken-2";
      }
    }
  },
  async created() {
    // Siempre inicializarlo!!!!!
    const securityStore = useSecurityStore();
    await securityStore.initialize();

    this.getDifficultyColor();
    const isFavourite = await FavouriteApi.checkFavourite(this.routine_id);
    if(isFavourite === true){
      this.favourite = 1;
      this.heart_color = "primary";
    }
  }
};
</script>

<!-- TODO: fix color!!! -->
<style scoped>
.flex-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.card_size {
  height: 150px;
  width: 200px;
}

.card-text {
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
}

</style>