<template>
  <form>
    <v-text-field
      v-model="usuario"
      :error-messages="usuarioErrors"
      :counter="12"
      label="Usuario"
      required
      @input="$v.usuario.$touch()"
      @blur="$v.usuario.$touch()"
    ></v-text-field>
    <v-text-field
        v-model="password1"
        :error-messages="password1Errors"
        :counter="16"
        label="Password"
        required
        :type="false ? 'text' : 'password'"
        @input="$v.password1.$touch()"
        @blur="$v.password1.$touch()"
    ></v-text-field>
    <v-text-field
        v-model="password2"
        :error-messages="password2Errors"
        label="Confirmar Password"
        :counter="16"
        :type="false ? 'text' : 'password'"
        required
        @input="$v.password2.$touch()"
        @blur="$v.password2.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="name"
      :error-messages="nameErrors"
      label="Nombre"
      required
      @input="$v.name.$touch()"
      @blur="$v.name.$touch()"
    ></v-text-field>
    <v-text-field
      v-model="apellidos"
      :error-messages="apellidosErrors"
      label="Apellidos"
      required
      @input="$v.apellidos.$touch()"
      @blur="$v.apellidos.$touch()"
    ></v-text-field>
     <v-btn id="botonSubmit" @click="submit">Registrarme</v-btn>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'
  import axios from 'axios'
  const $ = require('jquery')
  window.$ = $
  export default {
    mixins: [validationMixin],

    validations: {
      usuario: { required, maxLength: maxLength(12) },
      password1: { required },
      password2: { required },
      name: { required, maxLength: maxLength(20) },
      apellidos: { required, maxLength: maxLength(40) },
      email: { required, email }
    },
    data: () => ({
      usuario: '',
      password1: '',
      password2: '',
      email: '',
      name: '',
      apellidos: '',
      }),

    computed: {
    usuarioErrors () {
        const errors = []
        if (!this.$v.usuario.$dirty) return errors
        !this.$v.usuario.maxLength && errors.push('El nombre de usuario no puede sobrepasar los 12 caracteres')
        !this.$v.usuario.required && errors.push('Nombre de usuario es obligatorio.')
        return errors
      },
      password1Errors () {
        let patron = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,16}$/
        const errors = []
        if (!this.$v.password1.$dirty) return errors
        !this.$v.password1.required && errors.push('El password es obligatorio.')
        !patron.test(this.password1) && errors.push('El password debe contener mayúsculas, minúsculas y números y contener entre 8 y 16 caracteres')
        return errors
      },
      password2Errors () {
        const errors = []
        if (!this.$v.password2.$dirty) return errors
        !this.$v.password2.required && errors.push('Password es obligatorio.')
        this.password2!=this.password1 && errors.push('Los passwords no coinciden')
        return errors
      },
      
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('El nombre no puede sobrepasar los 20 caracteres')
        !this.$v.name.required && errors.push('Nombre es obligatorio.')
        return errors
      },
      apellidosErrors () {
        const errors = []
        if (!this.$v.apellidos.$dirty) return errors
        !this.$v.apellidos.maxLength && errors.push('Los apellidos no puede sobrepasar los 40 caracteres')
        !this.$v.apellidos.required && errors.push('Apellidos son obligatorios.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('El email no es válido')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },

    methods: {
      submit () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          axios.get('http://localhost:3002/registro', {
            params: {
              usuario: this.usuario,
              password: this.password1,
              email: this.email,
              nombre: this.name,
              apellidos: this.apellidos
           }
          })
            .then(function (response) {
              store.commit('setUsuario', response.data[0].usuario)
              router.push('/eventos');
            })
            .catch(function (response) {
              $('#formularioLogin').after("<div class='error'>" + response.request.response + "</div>");
              setTimeout(function(){
                $(".error").remove();
              },6000);
            })
            .then(function () {
              // always executed
            });  
        }
      },
      
    }
  }
</script>