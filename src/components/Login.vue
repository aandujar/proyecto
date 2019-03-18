<template>
  <form id="formularioLogin">
    <v-text-field
      v-model="usuario"
      :error-messages="usuarioErrors"
      label="Usuario"
      required
      @input="$v.usuario.$touch()"
      @blur="$v.usuario.$touch()"
    ></v-text-field>
    <v-text-field
        v-model="password"
        :error-messages="passwordErrors"
        label="Password"
        required
        :type="false ? 'text' : 'password'"
        @input="$v.password.$touch()"
        @blur="$v.password.$touch()"
    ></v-text-field>
     <v-btn id="boton" @click="submit">Login</v-btn>
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required } from 'vuelidate/lib/validators'
  import axios from 'axios'
  import { setTimeout } from 'timers';
  import router from '../router'
  import store from '../store'
  const $ = require('jquery')
  window.$ = $

  export default {
    mixins: [validationMixin],

    validations: {
      usuario: { required },
      password: { required },
    },

    data: () => ({
      usuario: '',
      password: '',
      error: false,
    }),

    computed: {
    usuarioErrors () {
        const errors = []
        if (!this.$v.usuario.$dirty) return errors
        !this.$v.usuario.required && errors.push('Nombre de usuario es obligatorio.')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.required && errors.push('El password es obligatorio.')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
        if (!this.$v.$invalid) {
          axios.get('http://localhost:3002/login', {
            params: {
              usuario: this.usuario,
              password: this.password
            }
          })
            .then(function (response) {
              store.commit('setUsuario', response.data[0]);
              router.push('/eventos');
             })
            .catch(function (response) {
              $('#formularioLogin').after("<div class='error'>" + response.data + "</div>");
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

<style lang="scss" scoped>
  .error{
    background-color: red;
    color: white;
    height: 65px;
    width: 583px;
    padding:10px;
    font-size: 20px;
  }
</style>