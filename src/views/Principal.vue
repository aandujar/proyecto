<template>
<div class="page">
<div class="page__header">
    <Header></Header>
</div>
<div class="page__container">
    <Container></Container>
</div>
</div>
</template>


<script>
import Header from "@/components/Header.vue";
import Container from "@/components/Container.vue";

export default {
  components: {
    Header,
    Container
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
    background: linear-gradient(60deg,#F5F5F5,#616161)!important;
}



</style>
