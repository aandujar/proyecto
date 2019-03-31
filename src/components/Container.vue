<template>
  <div class="pagecontainer">
    <div class="pagecontainer__menu">
      <NavigationDrawer></NavigationDrawer>
    </div>
    <router-link to="/crearEvento">
    <v-btn class="pagecontainer__button">Crear Evento</v-btn>
  </router-link>
   <div class="pagecontainer__content">
    <div class="pagecontainer__content__cards">
      <Card
        v-for="evento in eventosRecibidos"
        :key="evento.id"
        :deporte="evento.deporte"
        :localidad="evento.localidad"
        :provincia="evento.provincia"
        :fecha="evento.fecha"
        :hora="evento.hora"
        :descripcion="evento.descripcion"
        :id="evento.id"
        :participantesInscritos="evento.usuariosActuales"
        :participantesMaximos="evento.usuariosMaximos"
        :latitud="evento.latitud"
        :longitud="evento.longitud"
        :metodo="() => inscribirse(evento.id)"
        @mandarLocalizacion="recibirLocalizacion"
      ></Card>
    </div>
  </div>
    <v-layout row justify-center>
      <v-dialog v-model="dialogInformacion" persistent max-width="290">
        <v-card>
          <v-card-title class="headline dialogInformacion">Inscripción correcta</v-card-title>
          <v-card-text
            class="dialogInformacion"
          >Te has inscrito correctamente al evento. En breve recibirás un correo electrónico con todos los datos del evento.</v-card-text>
          <v-card-actions class="dialogInformacion">
            <v-spacer></v-spacer>
            <v-btn flat color="white" @click="redirigir">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialogError" persistent max-width="290">
        <v-card>
          <v-card-title class="headline dialogError">Error</v-card-title>
          <v-card-text
            class="dialogError"
          >Ha ocurrido un error en la inscripción. Vuelva a intentarlo después.</v-card-text>
          <v-card-actions class="dialogError">
            <v-spacer></v-spacer>
            <v-btn flat color="white" @click="dialogError = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialogBusqueda" persistent max-width="290">
        <v-card>
          <v-card-title class="headline dialogError">Error</v-card-title>
          <v-card-text
            class="dialogError"
          >No hay eventos disponibles con los filtros seleccionados.</v-card-text>
          <v-card-actions class="dialogError">
            <v-spacer></v-spacer>
            <v-btn flat color="white" @click="dialogBusqueda = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>

    <v-layout row justify-center>
      <v-dialog v-model="dialogMapa" persistent max-width="440">
        <v-card>
          <v-card-title class="headline">Localización del evento</v-card-title>
          <v-card-text>
            <Map v-if="dialogMapa" :latitud="latitud" :longitud="longitud"></Map>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="black" @click="dialogMapa = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </div>
</template>


<script>
import EventBus from "../event-bus.js";
import Card from "@/components/Card.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import Map from "@/components/Map.vue";

export default {
  data() {
    return {
      provincia: "",
      localidad: "",
      deporte: "",
      dialogInformacion: false,
      dialogError: false,
      dialogMapa: false,
      dialogBusqueda: false,
      latitud: "",
      longitud: "",
    };
  },

  components: {
    Card,
    NavigationDrawer,
    Map
  },

  computed: {
    estadoEvento() {
      return this.$store.state.eventosEstado;
    },
    eventosRecibidos() {
      return this.$store.state.eventos;
    }
  },

  methods: {
    inscribirse(id) {
      var idUsuario = this.$store.getters.getIdUsuario;
      var emailUsuario = this.$store.getters.getEmailUsuario;
      var self = this;
      this.$store
        .dispatch("inscribirse", {
          idUsuario: idUsuario,
          idEvento: id,
          email: emailUsuario
        })
        .then(function() {
          self.dialogInformacion = true;
        })
        .catch(function() {
          self.dialogError = true;
        });
    },

    redirigir(){
      this.dialogInformacion = false;
      this.$router.push('/eventos');
    },

    recibirLocalizacion(latitud, longitud) {
      this.latitud = latitud;
      this.longitud = longitud;
      this.dialogMapa = true;
    }
  },

  mounted() {
    var self = this;
    EventBus.$on("provincias", categoriaSeleccionada => {
      this.provincia = categoriaSeleccionada;
      this.localidad = '';
      var idUsuario = this.$store.getters.getIdUsuario;
      this.$store.dispatch("getEventos", { idUsuario: idUsuario, provincia: this.provincia, localidad: this.localidad, deporte: this.deporte })
      .catch(function() {
          self.dialogBusqueda = true;
        });
    });
    EventBus.$on("deportes", categoriaSeleccionada => {
      this.deporte = categoriaSeleccionada;
      var idUsuario = this.$store.getters.getIdUsuario;
      this.$store.dispatch("getEventos", { idUsuario: idUsuario, provincia: this.provincia, localidad: this.localidad, deporte: this.deporte })
      .catch(function() {
          self.dialogBusqueda = true;
        });
    });
    EventBus.$on("localidades", categoriaSeleccionada => {
      this.localidad = categoriaSeleccionada;
      var idUsuario = this.$store.getters.getIdUsuario;
      this.$store.dispatch("getEventos", { idUsuario: idUsuario, provincia: this.provincia, localidad: this.localidad, deporte: this.deporte })
      .catch(function() {
          self.dialogBusqueda = true;
        });
    });

  },
  beforeCreate() {
    var idUsuario = this.$store.getters.getIdUsuario;
    this.$store.dispatch("getEventos", { idUsuario: idUsuario, provincia: this.provincia, localidad: this.localidad, deporte: this.deporte });
  },
  
  
};
</script>

<style lang="scss" scoped>
.dialogInformacion {
  background-color: #00c853 !important;
  color: white;
}

.dialogError {
  background-color: #f44336 !important;
  color: white;
}

.pagecontainer {
  height: 700px;
  width: 100%;
  position: relative;
}

.pagecontainer__menu {
  z-index: 1;
  position: absolute;
}

.pagecontainer__button{
  margin-left: 90%;
  background-color: #00897B !important;
}

.pagecontainer__content {
  height: 100%;
  width: 100%;
  z-index: -3;
}

.pagecontainer__button {
  margin-left: 90%;
  background-color: #00897b !important;
}

.pagecontainer__content__cards {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  z-index: -2;
  padding-top: 20px;
  padding-left: 90px;
  padding-right: 10px;
  padding-bottom: 10px;
}
</style>

