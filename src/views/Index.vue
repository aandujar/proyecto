<template>
  <div class="index">
    <ul class="index__header">
      <li>
        <v-img src="http://localhost:3002/imagenes/logo.png" class="index__header__image"></v-img>
      </li>
      <li class="index__progress">
        <v-progress-circular
          v-show="datos.logado=='cargando' || datos.registro=='cargando'"
          :size="70"
          :width="7"
          color="black"
          indeterminate
        ></v-progress-circular>
      </li>
      <div class="index__header__buttons">
        <li>
          <v-btn class="index__header__buttons__button-login" v-on:click="verLogin">Login</v-btn>
        </li>
        <li>
          <v-btn class="index__header__buttons__button-registro" v-on:click="verRegistro">Registro</v-btn>
        </li>
      </div>
    </ul>

    <p
      class="index__title"
    >SportMates es la mejor forma de buscar eventos para practicar tus deportes favoritos en la Comunidad Valenciana.</p>
    <p class="index__title">Simplemente regístrate o inicia sesión y podrás empezar.</p>
    <div class="index__pane">
      <div v-if="condicionLogin">
        <Login></Login>
      </div>
      <div v-if="condicionRegistro">
        <Registro></Registro>
      </div>
    </div>
  </div>
</template>


<script>
import Registro from "@/components/Registro.vue";
import Login from "@/components/Login.vue";

export default {
  data() {
    return {
      condicionLogin: true,
      condicionRegistro: false,
      active: null
    };
  },
  computed: {
    datos() {
      return this.$store.state;
    }
  },
  components: {
    Registro,
    Login
  },

  methods: {
    verLogin: function() {
      this.condicionLogin = true;
      this.condicionRegistro = false;
    },
    verRegistro: function() {
      this.condicionLogin = false;
      this.condicionRegistro = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  height: 100%;
  width: 100%;
  background-color: #388e3c !important;
}

.index__header {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  list-style: none;
  padding: 20px;
}

.index__header__buttons {
  margin-left: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.index__header__buttons__button-login {
  background-color: #00bcd4 !important;
}

.index__header__buttons__button-registro {
  background-color: #607d8b !important;
}

.index__header__image {
  height: 140px;
  width: 250px;
}

.index__title {
  font-size: 20px;
  text-align: center;
}

.index__pane {
  margin-left: 30%;
  width: 40%;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
}

.index__progress {
  margin-left: 28%;
}
</style>