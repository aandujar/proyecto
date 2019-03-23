<template>
  <div class="contenedor">
    <form class="contenedor__form">
      <select v-model="deporte" class="contenedor__form__select">
        <option disabled value>Deportes</option>
        <option
          v-for="deporteLista in deportes"
          :key="deporteLista"
          :value="deporteLista"
        >{{deporteLista}}</option>
      </select>

      <select v-model="provincia" class="contenedor__form__select">
        <option disabled value>Provincias</option>
        <option v-for="prov in provincias" :key="prov" :value="prov">{{prov}}</option>
      </select>

      <select v-model="localidadAlicante" class="contenedor__form__select" v-if="mostrarAlicante">
        <option disabled value>Localidades</option>
        <option
          v-for="localidad in localidadesAlicante"
          :key="localidad"
          :value="localidad"
        >{{localidad}}</option>
      </select>

      <select v-model="localidadCastellon" class="contenedor__form__select" v-if="mostrarCastellon">
        <option disabled value>Localidades</option>
        <option
          v-for="localidad in localidadesCastellon"
          :key="localidad"
          :value="localidad"
        >{{localidad}}</option>
      </select>

      <select v-model="localidadValencia" class="contenedor__form__select" v-if="mostrarValencia">
        <option disabled value>Localidades</option>
        <option
          v-for="localidad in localidadesValencia"
          :key="localidad"
          :value="localidad"
        >{{localidad}}</option>
      </select>

      <div class="contenedor__form__error">
        <div v-if="errorDeporte">Debes elegir un deporte</div>
        <div v-if="errorProvincia">Debes elegir una provincia</div>
        <div v-if="errorLocalidad">Debes elegir una localidad</div>
      </div>

      <v-textarea
        v-model="descripcion"
        solo
        placeholder="Descripción del evento"
        :counter="200"
        @input="$v.descripcion.$touch()"
        @blur="$v.descripcion.$touch()"
        :error-messages="descripcionErrors"
      ></v-textarea>

      <v-layout row wrap>
        <v-flex>
          <v-text-field
            v-model="participantes"
            label="Participantes máximos"
            @input="$v.participantes.$touch()"
            @blur="$v.participantes.$touch()"
            :error-messages="participantesErrors"
            class="contenedor__form__textfield"
          ></v-text-field>
        </v-flex>
        <v-layout column wrap>
          <v-flex>
            <v-text-field v-model="hora" label="Hora HH:MM" class="contenedor__form__textfield"></v-text-field>
          </v-flex>
          <div class="contenedor__form__error">
            <div v-if="errorHora">No has introducido una hora válida</div>
          </div>
        </v-layout>
      </v-layout>

      <DatePicker @clicked="cambiarFecha"></DatePicker>
      <div class="contenedor__form__error">
        <div v-if="errorFecha">Debes elegir una fecha correcta</div>
      </div>

      <v-btn @click="submit" color="#00897B">Crear Evento</v-btn>
      <router-link to="/eventos">
        <v-btn @click="submit" color="#B71C1C">Cancelar</v-btn>
      </router-link>
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, between } from "vuelidate/lib/validators";
import DatePicker from "@/components/DatePicker.vue";
import axios from "axios";
import store from "../store";

export default {
  mixins: [validationMixin],

  validations: {
    descripcion: { required, maxLength: maxLength(200) },
    participantes: { required, between: between(2, 100) }
  },

  data: () => ({
    fechaSeleccionada: "",
    hora: "",
    errorHora: false,
    fecha: "",
    errorFecha: false,
    errorProvincia: false,
    errorLocalidad: false,
    errorDeporte: false,
    participantes: "",
    descripcion: "",
    provincia: "",
    localidadAlicante: "",
    localidadCastellon: "",
    localidadValencia: "",
    deporte: "",
    provincias: [],
    localidadesAlicante: [],
    localidadesCastellon: [],
    localidadesValencia: [],
    deportes: [],
    mostrarAlicante: false,
    mostrarCastellon: false,
    mostrarValencia: false
  }),

  components: {
    DatePicker
  },

  watch: {
    provincia: function() {
      if (this.provincia == "Alicante") {
        this.mostrarAlicante = true;
        this.mostrarCastellon = false;
        this.mostrarValencia = false;
      } else if (this.provincia == "Castellón") {
        this.mostrarAlicante = false;
        this.mostrarCastellon = true;
        this.mostrarValencia = false;
      } else if (this.provincia == "Valencia") {
        this.mostrarAlicante = false;
        this.mostrarCastellon = false;
        this.mostrarValencia = true;
      } else {
        this.mostrarAlicante = false;
        this.mostrarCastellon = false;
        this.mostrarValencia = false;
      }
    },

    hora: function() {
      var hour = this.hora.split(":");
      if (
        hour.length != 2 ||
        isNaN(hour[0]) ||
        hour[0] > 23 ||
        hour[0] < 0 ||
        hour[0].length != 2 ||
        isNaN(hour[1]) ||
        hour[1] > 59 ||
        hour[1] < 0 ||
        hour[1].length != 2
      ) {
        this.errorHora = true;
      } else {
        this.errorHora = false;
      }
    }
  },

  computed: {
    descripcionErrors() {
      const errors = [];
      if (!this.$v.descripcion.$dirty) return errors;
      !this.$v.descripcion.maxLength &&
        errors.push("La descripción no puede sobrepasar los 200 caracteres");
      !this.$v.descripcion.required &&
        errors.push("La descripción es obligatoria.");
      return errors;
    },
    participantesErrors() {
      const errors = [];
      if (!this.$v.participantes.$dirty) return errors;
      !this.$v.participantes.between &&
        errors.push("El número máximo de participantes debe ser entre 2 y 100");
      !this.$v.participantes.required &&
        errors.push("Es obligatorio indicar el número de participantes.");
      return errors;
    }
  },

  created() {
    var hoy = new Date();
    this.fecha = hoy.getDate() + "-" + hoy.getMonth() + "-" + hoy.getFullYear();
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
  },

  methods: {
    submit() {
      var errorAjax = false;
      var localidadSeleccionada = "";
      this.$v.$touch();
      if (this.$v.$invalid) {
        errorAjax = true;
      }
      if (this.provincia != "") {
        if (this.errorProvincia == true) {
          this.errorProvincia = false;
        }
        if (this.provincia == "Alicante") {
          if (this.localidadAlicante != "") {
            localidadSeleccionada = this.localidadAlicante;
            this.errorLocalidad = false;
          } else {
            this.errorLocalidad = true;
          }
        } else if ((this.provincia = "Castellón")) {
          if (this.localidadCastellon != "") {
            localidadSeleccionada = this.localidadCastellon;
            this.errorLocalidad = false;
          } else {
            this.errorLocalidad = true;
          }
        } else if ((this.provincia = "Valencia")) {
          if (this.localidadValencia != "") {
            localidadSeleccionada = this.localidadValencia;
            this.errorLocalidad = false;
          } else {
            this.errorLocalidad = true;
          }
        }
        if (localidadSeleccionada == "") {
          errorAjax = true;
        }
      } else {
        this.errorProvincia = true;
        errorAjax = true;
      }
      if (this.hora != "" && this.errorHora == false) {
        this.errorHora = false;
      } else {
        this.errorHora = true;
        errorAjax = true;
      }
      if (this.fechaSeleccionada != "" && this.errorFecha == false) {
        this.errorFecha = false;
      } else {
        this.errorFecha = true;
        errorAjax = true;
      }
      if (this.deporte == "") {
        this.errorDeporte = true;
        errorAjax = true;
      } else {
        this.errorDeporte = false;
      }
      if (this.descripcion == "") {
        errorAjax = true;
      }

      if (errorAjax == false) {
        var id = store.getters.getIdUsuario;
        axios
          .post("http://localhost:3002/crearEvento", {
            data: {
              id: id,
              provincia: this.provincia,
              localidad: localidadSeleccionada,
              deporte: this.deporte,
              participantes: this.participantes,
              fecha: this.fechaSeleccionada,
              hora: this.hora,
              descripcion: this.descripcion
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(function(response) {
            console.log(response);
          })
          .catch(function(response) {
            console.log(response);
          })
          .then(function() {
            // always executed
          });
      }
    },

    cambiarFecha: function(date) {
      if (date <= this.fecha) {
        this.errorFecha = true;
      } else {
        if (this.errorFecha == true) {
          this.errorFecha = false;
          this.fechaSeleccionada = date;
        }
      }
    },

    cargarProvincias(json) {
      var self = this;
      json.map(provincia => self.provincias.push(provincia.nombre));
    },

    cargarLocalidades(json) {
      var self = this;
      json.map(function(localidad) {
        if (localidad.provincia == "Alicante") {
          self.localidadesAlicante.push(localidad.nombre);
        } else if (localidad.provincia == "Castellón") {
          self.localidadesCastellon.push(localidad.nombre);
        } else if (localidad.provincia == "Valencia") {
          self.localidadesValencia.push(localidad.nombre);
        }
      });
    },

    cargarDeportes(json) {
      var self = this;
      json.map(deporte => self.deportes.push(deporte.nombre));
    }
  }
};
</script>

<style lang="scss" scoped>

.contenedor {
  height: 700px;
  width: 100%;
  padding-top: 30px;
  background-color: #455a64;
}

.contenedor__form {
  margin-left: 30%;
  width: 40%;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
}

.contenedor__form__select {
  height: 60px;
  width: 80px;
  padding-top: 20px;
  padding-left: 10px;
  border-bottom: 1px solid black;
  margin-right: 20px;
  outline: none;
  margin-left: 10px;
  margin-bottom: 20px;
}

.contenedor__form__error {
  display: flex;
  flex-direction: column;
  color: rgba(0, 0, 0, 0.54);
  font-size: 12px;
  min-height: 12px;
  min-width: 1px;
  position: relative;
  margin-top: -10px;
  margin-bottom: 10px;
}

.contenedor__form__flex-vertical {
  display: flex;
  flex-direction: column;
}

.contenedor__form__textfield {
  width: 180px;
  margin-right: 10px;
}
</style>
