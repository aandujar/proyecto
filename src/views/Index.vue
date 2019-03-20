<template>
  <div class="index">
    <div class="index__buttons">
        <v-btn class="index__buttons__button-success" v-on:click="verLogin">Login</v-btn>
        <v-btn class="index__buttons__button-info" v-on:click="verRegistro">Registro</v-btn>
    </div>
    <p class="index__title">
      {{ titulo1 }}
    </p>
    <p class="index__title">
      {{ titulo2 }}
    </p>
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
      active: null,
      item1: "Login",
      item2: "Registro",
      titulo1: "SportMates es la mejor forma de buscar gente como tú para practicar tus deportes favoritos.",
      titulo2: "Simplemente regístrate o inicia sesión y podrás empezar."
    };
  },

  components: {
    Registro,
    Login
  },

  methods:{
        verLogin: function(){
            this.condicionLogin = true;
            this.condicionRegistro = false;
        },
        verRegistro: function(){
            this.condicionLogin = false;
            this.condicionRegistro = true;
        }
  }
};
</script>

<style lang="scss" scoped>

.index {
  padding: 30px;
  height: 100%;
  width: 100%;
  background-color: #388e3c !important;
}

.index__buttons{
  display: flex;
  flex-direction: row;
  margin-left: 80%;
}

.index__buttons__button-success{
  background-color: #42A5F5 !important;
}

.index__buttons__button-info{
    background-color: #E53935 !important;
}

.index__title{
  font-size: 20px;
  text-align: center;
}

.index__pane {
  margin-top: 50px;
  margin-left: 30%;
  width: 40%;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
}
</style>