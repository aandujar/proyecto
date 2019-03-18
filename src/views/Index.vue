<template>
  <div class="index">
    <p class="index__title">
      {{ titulo1 }}
    </p> 
    <p class="index__title">
      {{ titulo2 }}
    </p> 
    <div class="index__pane">
    <v-tabs v-model="active" slider-color="yellow">
      <v-tab ripple>
        {{ item1 }}
      </v-tab>
      <v-tab ripple>
        {{ item2 }}
      </v-tab>
      <v-tab-item>
        <v-card flat>
          <Login></Login>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <Registro></Registro>
        </v-card>
      </v-tab-item>
    </v-tabs>
    </div>
  </div>
</template>


<script>
import Registro from "@/components/Registro.vue";
import Login from "@/components/Login.vue";

export default {
  data() {
    return {
      active: null,
      item1: "Login",
      item2: "Registro",
      titulo1: "Nombre del proyecto es la mejor forma de buscar gente como tú para practicar tus deportes favoritos.",
      titulo2: "Simplemente regístrate o inicia sesión y podrás empezar."
    };
  },
  components: {
    Registro,
    Login
  },
  methods: {
    next() {
      const active = parseInt(this.active);
      this.active = active < 2 ? active + 1 : 0;
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

.index__title{
  font-size: 20px;
  text-align: center;
}

.index__pane {
  margin-left: 30%;
  width: 40%;
}
</style>