<template>
<div class="page">
<div class="page__header">
    <Header></Header>
</div>
<div class="page__container">
    <router-link to="/eventos">
    
        <v-btn class="container__buttons__button-success">Ver Eventos</v-btn>
        </router-link>
    
    <div class="pane">
    <CrearEvento></CrearEvento>
    </div>
</div>
<div class="page__footer"></div>
</div>
    
</template>


<script>
import Header from "@/components/Header.vue"
import CrearEvento from "@/components/CrearEvento.vue"

export default {
  components: {
    Header,

    CrearEvento
  }
};
</script>


<style lang="scss" scoped>

.page{
    display: grid;
    grid-template-areas:  'header header header'
                          'container container container'
                          'footer footer footer';
}

.page__header { 
    grid-area: header; 
}

.page-container{
    grid-area: container;
}

.page__footer{
    grid-area: footer;
}

.pane {
  margin-top: 50px;
  margin-left: 40%;
  width: 60%;
  background-color: white;
  border: 1px solid black;
  padding: 10px;
}

</style>
