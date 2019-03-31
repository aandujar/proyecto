<template>
<div class="perfil">

  <v-tabs fixed-tabs class="perfil__tabs">
    <v-tab>
      Cambiar avatar
    </v-tab>
    <v-tab>
      Eventos creados
    </v-tab>
    <v-tab>
      Eventos inscritos
    </v-tab>
    <v-tab-item class="perfil__tabs__avatar">
        <div class="perfil__tabs__avatar__imagen" draggable="true"></div>
      </v-tab-item>
      <v-tab-item>
        item2
      </v-tab-item>
      <v-tab-item>
        item3
      </v-tab-item>
  </v-tabs>

</div>
</template>

<script>

</script>

<style lang="scss" scoped>
.perfil{
    height: 700px;
    width: 100%;
    padding-top: 20px;
    padding-left: 20%;
    padding-right: 20%;
    padding-bottom: 20px;
    background: linear-gradient(60deg,#F5F5F5,#616161)!important;
    
}

.perfil__tabs{
    margin-left: 40px;
}

.perfil__tabs__avatar{

}

.perfil__tabs__avatar__imagen{
    height: 300px;
    width: 300px;
    background-color: white;

}

</style>
