<template>
<div class="page">
<div class="page__header">
    <Header></Header>
</div>
<div class="page__menu-side">
    <MenuSide></MenuSide>
</div>
<div class="page__container">
    <Container></Container>
</div>
<div class="page__footer"></div>
</div>
    
</template>


<script>
import Header from "@/components/Header.vue";
import MenuSide from "@/components/Menu-side.vue";
import Container from "@/components/Container.vue";
import Store from "../store"

export default {
  components: {
    Header,
    MenuSide,
    Container
  }
};
</script>


<style lang="scss" scoped>

.page{
    display: grid;
    grid-template-areas:  'header header header header header'
                          'menu-side container container container container'
                          'menu-side container container container container'
                          'footer footer footer footer footer';
    grid-template-columns: 20% 20% 20% 20% 20%;
}

.page__header { 
    grid-area: header; 
}

.page__menu-side{
    grid-area: menu-side;
    
}

.page__container{
    grid-area: container;
    background: linear-gradient(60deg,#F5F5F5,#616161)!important;
}

.page__footer{
    grid-area: footer;
}

</style>
