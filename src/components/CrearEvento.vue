<template>
  <div class="contenedor">
    <v-progress-linear :indeterminate="true" color="blue" v-show="filtros.crearEvento=='cargando'"></v-progress-linear>
    <form class="contenedor__form">
      <select v-model="deporte" class="contenedor__form__select">
        <option disabled value>Deportes</option>
        <option
          v-for="deporteLista in filtros.deportes"
          :key="deporteLista.nombre"
          :value="deporteLista.nombre"
        >{{deporteLista.nombre}}</option>
      </select>

      <select v-model="provincia" class="contenedor__form__select">
        <option disabled value>Provincias</option>
        <option
          v-for="prov in filtros.provincias"
          :key="prov.nombre"
          :value="prov.nombre"
        >{{prov.nombre}}</option>
      </select>

      <select v-model="localidadAlicante" class="contenedor__form__select" v-if="mostrarAlicante">
        <option disabled value>Localidades</option>
        <option
          v-for="localidad in filtros.localidadesAlicante"
          :key="localidad"
          :value="localidad"
        >{{localidad}}</option>
      </select>

      <select v-model="localidadCastellon" class="contenedor__form__select" v-if="mostrarCastellon">
        <option disabled value>Localidades</option>
        <option
          v-for="localidad in filtros.localidadesCastellon"
          :key="localidad"
          :value="localidad"
        >{{localidad}}</option>
      </select>

      <select v-model="localidadValencia" class="contenedor__form__select" v-if="mostrarValencia">
        <option disabled value>Localidades</option>
        <option
          v-for="localidad in filtros.localidadesValencia"
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
        :counter="40"
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
        <v-btn color="#B71C1C">Cancelar</v-btn>
      </router-link>
    </form>


    <v-layout row justify-center>
      <v-dialog v-model="dialogInformacion" persistent max-width="290">
        <v-card>
          <v-card-title class="headline dialogInformacion">Evento creado correctamente</v-card-title>
          <v-card-text
            class="dialogInformacion"
          >Has creado correctamente al evento. En breve recibirás un correo electrónico con todos los datos del evento.</v-card-text>
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
          >Ha ocurrido un error al crear el evento. Vuelva a intentarlo después.</v-card-text>
          <v-card-actions class="dialogError">
            <v-spacer></v-spacer>
            <v-btn flat color="white" @click="dialogError = false">Aceptar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>


  </div>

</template>

<script>
import { validationMixin } from "vuelidate";
import { required, maxLength, between } from "vuelidate/lib/validators";
import DatePicker from "@/components/DatePicker.vue";

export default {
  mixins: [validationMixin],

  validations: {
    descripcion: { required, maxLength: maxLength(40) },
    participantes: { required, between: between(2, 100) }
  },

  data: () => ({
    dialogInformacion: false,
    dialogError: false,
    fechaSeleccionada: "",
    hora: "",
    errorHora: false,
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
        this.localidadAlicante = "";
        this.localidadCastellon = "";
        this.localidadValencia = "";
      } else if (this.provincia == "Castellón") {
        this.mostrarAlicante = false;
        this.mostrarCastellon = true;
        this.mostrarValencia = false;
        this.localidadAlicante = "";
        this.localidadCastellon = "";
        this.localidadValencia = "";
      } else if (this.provincia == "Valencia") {
        this.mostrarAlicante = false;
        this.mostrarCastellon = false;
        this.mostrarValencia = true;
        this.localidadAlicante = "";
        this.localidadCastellon = "";
        this.localidadValencia = "";
      } else {
        this.mostrarAlicante = false;
        this.mostrarCastellon = false;
        this.mostrarValencia = false;
        this.localidadAlicante = "";
        this.localidadCastellon = "";
        this.localidadValencia = "";
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

  beforeCreate() {
    this.$store.dispatch("getProvincias");
    this.$store.dispatch("getLocalidades");
    this.$store.dispatch("getDeportes");
  },

  computed: {
    filtros() {
      return this.$store.state;
    },
    descripcionErrors() {
      const errors = [];
      if (!this.$v.descripcion.$dirty) return errors;
      !this.$v.descripcion.maxLength &&
        errors.push("La descripción no puede sobrepasar los 40 caracteres");
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
  methods: {
    redirigir(){
      this.dialogInformacion=false;
      this.$router.push('/eventos');
    },
    submit() {
      var self = this;
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
        } else if (this.provincia == "Castellón") {
          if (this.localidadCastellon != "") {
            localidadSeleccionada = this.localidadCastellon;
            this.errorLocalidad = false;
          } else {
            this.errorLocalidad = true;
          }
        } else if (this.provincia == "Valencia") {
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
        var id = this.$store.getters.getIdUsuario;
        var email = this.$store.getters.getEmailUsuario;
        this.$store.dispatch("crearEvento", {
          id: id,
          email: email,
          provincia: this.provincia,
          localidad: localidadSeleccionada,
          deporte: this.deporte,
          participantes: this.participantes,
          fecha: this.fechaSeleccionada,
          hora: this.hora,
          descripcion: this.descripcion
        })
         .then(function() {
          self.dialogInformacion = true;
        })
        .catch(function() {
          self.dialogError = true;
        });
      }
    },

    cambiarFecha: function(date) {
      var trocearFechaElegida = date.split("-");
      var crearFecha = new Date(
        trocearFechaElegida[2],
        trocearFechaElegida[1],
        trocearFechaElegida[0]
      );
      var ahora = new Date();
      var mes = parseInt(trocearFechaElegida[1]);
      mes--;

      if (
        crearFecha.getFullYear() >= ahora.getFullYear() &&
        mes >= ahora.getMonth() &&
        crearFecha.getDate() > ahora.getDate()
      ) {
        this.errorFecha = false;
        this.fechaSeleccionada = date;
      } else if (
        crearFecha.getFullYear() >= ahora.getFullYear() &&
        mes > ahora.getMonth()
      ) {
        this.errorFecha = false;
        this.fechaSeleccionada = date;
      } else if (crearFecha.getFullYear() > ahora.getFullYear()) {
        this.errorFecha = false;
        this.fechaSeleccionada = date;
      } else {
        this.errorFecha = true;
        this.fechaSeleccionada = "";
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
  background: linear-gradient(60deg, #f5f5f5, #616161) !important;
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


.dialogInformacion {
  background-color: #00c853 !important;
  color: white;
}

.dialogError {
  background-color: #f44336 !important;
  color: white;
}
</style>
