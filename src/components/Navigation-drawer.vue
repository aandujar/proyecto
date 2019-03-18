<template>
  <v-navigation-drawer stateless value="true">
    <v-list>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon>home</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>Inicio</v-list-tile-title>
      </v-list-tile>

      <v-list-tile>
        <v-list-tile-action>
          <v-icon>account_circle</v-icon>
        </v-list-tile-action>
        <v-list-tile-title>{{nombreUsuario}}</v-list-tile-title>
      </v-list-tile>

      <v-list-group prepend-icon="filter_list" value="true">
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-title>Filtros</v-list-tile-title>
          </v-list-tile>
        </template>

        <v-list-group no-action sub-group value="true">
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-title>Comunidades</v-list-tile-title>
            </v-list-tile>
          </template>
          <div class="categorias">
            <RadioButton
              :categorias="comunidades"
              nombre="comunidades"
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
      nombreUsuario: "",
      comunidades: [],
      deportes: []
    };
  },

  components: {
    RadioButton
  },

  methods: {
    cargarComunidades(json) {
      var self = this;
      json.map(comunidad => self.comunidades.push(comunidad.nombre));
    },

    cargarDeportes(json) {
      var self = this;
      json.map(deporte => self.deportes.push(deporte.nombre));
    }
  },

  created() {
    var self = this;
    axios
      .get("http://localhost:3002/comunidades", {})
      .then(function(response) {
        self.cargarComunidades(response.data);
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
      "Bienvenido, " + store.getters.getNombreUsuario + store.getters.getAvatar;
  },

  mounted() {}
};
</script>

<style lang="scss" scoped>
.categorias {
  margin-left: 20%;
}
</style>
