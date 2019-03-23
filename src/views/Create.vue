<template>
<div class="page">

<div class="page__header">
    <Header></Header>
</div>

<div class="page__container">
   <CrearEvento></CrearEvento>
</div>

<div class="page__footer">

    
</div>



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

.page__container{
    grid-area: container;
}

.page__footer{
    grid-area: footer;
}

</style>
