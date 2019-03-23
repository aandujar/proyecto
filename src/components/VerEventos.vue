<template>
<div>
<Card></Card>
  </div>
</template>


<script>
import EventBus from "../event-bus.js";
import Card from '@/components/Card.vue'

export default {
  data() {
    return {
      provincia: "",
      deporte: ""
    };
  },

  components: {
    Card
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
