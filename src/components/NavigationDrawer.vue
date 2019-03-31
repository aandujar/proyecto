<template>
  <v-navigation-drawer class="page__menu-side" stateless value="true" mini-variant-width="80" :mini-variant="mini">
    
         <v-btn flat v-if="mini" @click="cambiarMenu"><v-icon>chevron_right</v-icon></v-btn>
         <v-btn flat v-else @click="cambiarMenu"><v-icon>chevron_left</v-icon></v-btn>
       
      
  <v-list>

     <router-link to="/eventos">
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Inicio</v-list-tile-title>
      </v-list-tile>
     </router-link>

      <router-link to="/perfil">
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>account_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{nombreUsuario}}</v-list-tile-title>
      </v-list-tile>
      </router-link>

       <router-link to="/">
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>power_settings_new</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Logout</v-list-tile-title>
      </v-list-tile>
       </router-link>

      <v-list-group prepend-icon="filter_list" value="true" v-if="!mini">
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>Filtros</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-group no-action sub-group value="true">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Provincias</v-list-tile-title>
            </v-list-tile>
          </template>
          <div class="categorias">
            <RadioButton
              @clicked="cambiarLocalidades"
              :categorias="provincias"
              nombre="provincias"
            ></RadioButton>
          </div>

        </v-list-group>

        <v-list-group no-action sub-group value="true">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Localidades</v-list-tile-title>
            </v-list-tile>
          </template>
          <div class="categorias">
            <RadioButton v-if="verAlicante"
              :categorias="localidadesAlicante"
              nombre="localidades"
            ></RadioButton>
            <RadioButton v-if="verCastellon"
              :categorias="localidadesCastellon"
              nombre="localidades"
            ></RadioButton>
            <RadioButton v-if="verValencia"
              :categorias="localidadesValencia"
              nombre="localidades"
            ></RadioButton>
          </div>

        </v-list-group>

        <v-list-group sub-group no-action>
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Deportes</v-list-tile-title>
            </v-list-tile>
          </template>
          <div class="categorias">
            <RadioButton
              :categorias="deportes"
              nombre="deportes"
            ></RadioButton>
          </div>
        </v-list-group>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import axios from "axios";
import store from "../store";
import RadioButton from "@/components/RadioButton.vue";
export default {
  data() {
    return {
      mini: false,
      nombreUsuario: "",
      provincias: [],
      localidadesAlicante: [],
      localidadesCastellon: [],
      localidadesValencia: [],
      deportes: [],
      verAlicante: false,
      verCastellon: false,
      verValencia: false,
    };
  },

  components: {
    RadioButton
  },

  methods: {

    cambiarMenu(){
      if(this.mini==true){
        this.mini=false;
      }else{
        this.mini=true;
      }
    },

    cargarProvincias(json) {
      var self = this;
      json.map(provincia => self.provincias.push(provincia.nombre));
    },

    cargarLocalidades(json) {
      var self = this;
      json.map(function(localidad){
        if(localidad.provincia=="Alicante"){
          self.localidadesAlicante.push(localidad.nombre);
        }else if(localidad.provincia=="Castellón"){
          self.localidadesCastellon.push(localidad.nombre);
        }else if(localidad.provincia=="Valencia"){
          self.localidadesValencia.push(localidad.nombre);
        }
      });
    },

    cargarDeportes(json) {
      var self = this;
      json.map(deporte => self.deportes.push(deporte.nombre));
    },

    cambiarLocalidades(provincia){
      if(provincia=="Alicante"){
        this.verAlicante = true;
        this.verCastellon = false;
        this.verValencia = false;
      }else if(provincia=="Castellón"){
        this.verAlicante = false;
        this.verCastellon = true;
        this.verValencia = false;
      }else if(provincia=="Valencia"){
        this.verAlicante = false;
        this.verCastellon = false;
        this.verValencia = true;
      }
    }
  },

  created() {
    var self = this;
    axios
      .get("http://localhost:3002/provincias", {})
      .then(function(response) {
        self.cargarProvincias(response.data);
      })
      .catch(function() {})
      .then(function() {
        // always executed
      });

      axios
      .get("http://localhost:3002/localidades", {})
      .then(function(response) {
        self.cargarLocalidades(response.data);
      })
      .catch(function() {})
      .then(function() {
        // always executed
      });

    axios
      .get("http://localhost:3002/deportes", {})
      .then(function(response) {
        self.cargarDeportes(response.data);
      })
      .catch(function() {})
      .then(function() {
        // always executed
      });

    this.nombreUsuario =
      "Bienvenido, " + store.getters.getNombreUsuario;
  },

};
</script>

<style lang="scss" scoped>

.page__menu-side{

}
.categorias {
  padding-left: 20%;
}
</style>
