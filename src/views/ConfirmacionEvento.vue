<template>
<div class="page">
<div class="page__header">
    <Header></Header>
</div>
<div class="page__container">
    Se ha creado el evento correctamente, en unos segundos serás redirigido a la página principal
</div>
</div>
    
</template>


<script>
import Header from "@/components/Header.vue";
import router from '../router'

export default {
  components: {
    Header
  },

  mounted(){
      setTimeout(function(){
           router.push('/eventos');
      }, 6000);

  }
};
</script>


<style lang="scss" scoped>

.page{
    display: grid;
    grid-template-areas:  'header'
                          'container';
}

.page__container{
    grid-area: container;
    background: linear-gradient(60deg,#F5F5F5,#616161)!important;
    padding-top: 30px;
    padding-left: 30%;
    height: 100%;
    width: 100%;
}


</style>
