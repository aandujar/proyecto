<template>
<div class="content">
  <div class="content__button">
      <router-link to="/crearEvento">
        <v-btn color="info">Crear Evento</v-btn>
      </router-link>
  </div>
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

.content{
  height: 700px;
  width: 100%;
  padding-top: 30px;
  background-color: #455a64;
}

</style>
