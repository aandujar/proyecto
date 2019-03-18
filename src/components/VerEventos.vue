<template></template>

<script>
import EventBus from "../event-bus.js";

export default {
  data() {
    return {
      comunidad: "",
      deporte: ""
    };
  },

  mounted() {
    EventBus.$on("comunidades", categoriaSeleccionada => {
      this.comunidad = categoriaSeleccionada;
    });
    EventBus.$on("deportes", categoriaSeleccionada => {
      this.deporte = categoriaSeleccionada;
    });
  },
  watch: {
    comunidad: function() {
      console.log(this.comunidad + " " + this.deporte);
    },
    deporte: function() {
      console.log(this.comunidad + " " + this.deporte);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
