<template>
  <form>
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
    <v-btn @click="submit">Login</v-btn>
    <v-text-field
      v-show="logado=='error'"
      disabled
      background-color="red"
      color="white"
      placeholder="Usuario o contraseña incorrectos"
    ></v-text-field>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],

  validations: {
    usuario: { required },
    password: { required }
  },

  data: () => ({
    usuario: "",
    password: "",
    error: false
  }),

  computed: {
    logado(){
      return this.$store.state.logado
    },
    usuarioErrors() {
      const errors = [];
      if (!this.$v.usuario.$dirty) return errors;
      !this.$v.usuario.required &&
        errors.push("Nombre de usuario es obligatorio.");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("El password es obligatorio.");
      return errors;
    }
  },

  methods: {
    submit() {
      var self = this;
      this.error = false;
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store
          .dispatch("login", { usuario: this.usuario, password: this.password })
          .then(function(response) {
            self.$router.push("/eventos");
          })
          .catch(function(error) {
            self.error = true;
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>