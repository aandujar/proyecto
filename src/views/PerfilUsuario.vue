<template>
<div class="page">
<div class="page__header">
    <Header></Header>
</div>
<div class="page__container">
    <Perfil></Perfil>
</div>
</div>
</template>


<script>
import Header from "@/components/Header.vue";
import Perfil from "@/components/Perfil.vue";

export default {
  components: {
    Header,
    Perfil
  }
};
</script>


<style lang="scss" scoped>

.page{
    display: grid;
    grid-template-areas:  'page__header'
                          'page__container';
    
}

.page__header { 
    grid-area: page__header; 
}



.page__container{
    grid-area: page__container;
}



</style>
