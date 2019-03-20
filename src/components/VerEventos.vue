<template>
<div>componente ver</div>

</template>


<script>
import EventBus from "../event-bus.js";

export default {
  data() {
    return {
      provincia: "",
      deporte: ""
    };
  },

  mounted() {
    EventBus.$on("provincias", categoriaSeleccionada => {
      this.provincia = categoriaSeleccionada;
    });
    EventBus.$on("deportes", categoriaSeleccionada => {
      this.deporte = categoriaSeleccionada;
    });
  },
  watch: {
    comunidad: function() {
      
    },
    deporte: function() {
      
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
