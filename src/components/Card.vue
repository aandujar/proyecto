<template>
  <v-card class="mt-3 mx-auto" :style="anchoComponente">
    <v-sheet
      class="v-sheet--offset mx-auto"
      :style="colorFondoImagen"
      elevation="12"
      max-width="calc(100% - 32px)"
    >
      <v-sparkline :labels="labels" :value="value" :color="colorLinea" line-width="2" padding="16"></v-sparkline>
    </v-sheet>

    <v-card-text class="pt-0">
      <div class="title font-weight-light mb-2">{{titulo}}</div>
      <div class="subheading font-weight-light grey--text">{{subtitulo}}</div>
      <v-divider class="my-2"></v-divider>
      <v-icon class="mr-2" small>{{icono}}</v-icon>
      <span class="caption grey--text font-weight-light">{{footer}}</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    labels: Array,
    value: Array,
    titulo: String,
    subtitulo: String,
    footer: String,
    icono: String,
    gradient:String,
    colorFondo1: String,
    colorFondo2: String,
    colorLinea: String,
    ancho: String
  },
  computed: {
    anchoComponente: function() {
      if (this.ancho == undefined) {
        return "width: 500px";
      } else {
        return "width: " + this.ancho;
      }
    },
    colorFondoImagen: function() {
      return "background: linear-gradient(" + this.gradient + "," +  this.colorFondo1 + "," + this.colorFondo2 + ")!important"
    }
  }
};
</script>

<style lang="scss" scoped>
.v-sheet--offset {
  top: -24px;
  position: relative;
}


</style>