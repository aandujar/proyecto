<template>
<div class="container">
  <router-link to="/crearEvento">
    <v-btn class="container__button">Crear Evento</v-btn>
  </router-link>
  <div class="container__cards">
    <Card v-for="evento in eventos" :key="evento.id" :deporte="evento.deporte" :localidad="evento.localidad" :provincia="evento.provincia" :fecha="evento.fecha" :hora="evento.hora" :descripcion="evento.descripcion" :id="evento.id" :participantesInscritos="evento.usuariosActuales" :participantesMaximos="evento.usuariosMaximos" :latitud="evento.latitud" :longitud="evento.longitud" :metodo="() => inscribirse(evento.id)"></Card>
  </div>
</div>
</template>


<script>
import EventBus from "../event-bus.js";
import Card from '@/components/Card.vue'
import axios from "axios";
import store from '../store'

export default {
  data() {
    return {
      provincia: "",
      deporte: "",
      eventos: [],
    };
  },

  components: {
    Card
  },

  methods:{
     inscribirse(id){
       
     var idUsuario = store.getters.getIdUsuario;
     var emailUsuario = store.getters.getEmailUsuario;
     var self = this;
     console.log(id);
    
      axios.post('http://localhost:3002/inscribirse', {
            data: {
              idEvento: id,
              idUsuario: idUsuario,
              email: emailUsuario
            }
          })
            .then(function (response) {
             router.push('/confirmacionEvento');
             })
            .catch(function (response) {
             console.log(response);
            })
            .then(function () {
              // always executed
            }); 
    }
  },



  mounted() {
    EventBus.$on("provincias", categoriaSeleccionada => {
      this.provincia = categoriaSeleccionada;
    });
    EventBus.$on("deportes", categoriaSeleccionada => {
      this.deporte = categoriaSeleccionada;
    });
  },
  created(){
    var self = this;
    var id = store.getters.getIdUsuario;
    axios
      .get("http://localhost:3002/eventos", {
        params: {
              id: id,
            }
      })
      .then(function(response) {
        self.eventos = response.data.resultado;
      })
      .catch(function() {})
      .then(function() {
        // always executed
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

.container{

 background: linear-gradient(60deg,#F5F5F5,#616161)!important;
  height: 700px;
  left: 0px;
  right: 0px;
  width: 100%;
 
}

.container__button{
  margin-left: 90%;
  background-color: #00897B !important;
}

.container__cards{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

</style>

