<template>
  <v-card :height="cardHeight" :width="cardWidth" class="rounded-xl" color="quaternary" raised>
    <div class="space-start-col" >

      <div>
        <v-card :width="cardWidth" class="rounded-b-0 rounded-t-xl  top-bar-height row-center" color="secondary">
          <h2 class="mt-2">{{ cardTitle }}</h2>
        </v-card>
      </div>

      <div >
        <slot>
          <!-- Aca entra el contenido-->
        </slot>
      </div>

    </div>
  </v-card>
</template>

<script>
export default {
  name: "CustomCard",
  props: {
    cardWidth: { type: Number, required: true },
    cardHeight: { type: Number, required: true },
    cardTitle: { type: String, required: true },
  }
};
</script>

<style scoped>

.top-bar-height{
  height: 49px;
}


.row-center {                 /* !!!! COMMON !!!! */
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>