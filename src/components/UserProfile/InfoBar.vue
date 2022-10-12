<template>
  <div>
    <v-text-field
        dense
        solo
        rounded
        hide-details
        outlined
        background-color="tertiary"
        color="secondary"
        append-icon="edit"
        :label="label_text"
        :value="value"
        :v-model="info"
        v-if="isReadonly === false"
    >
    </v-text-field>
    <v-text-field
        dense
        solo
        rounded
        hide-details
        outlined
        background-color="tertiary"
        color="secondary"
        readonly
        :label="label_text"
        :value="value"
        v-else
    >
    </v-text-field>
  </div>
</template>

<script>
export default {
  name: "InfoBar",
  props: {
    label_text: String,
    value: String,
    info: String,
    isReadonly: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style scoped>
</style>