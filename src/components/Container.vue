<template>
<div class="container">
    <div class="container__buttons">
        <router-link to="/crearEvento">
        <v-btn class="container__buttons__button-success">Crear Evento</v-btn>
        </router-link>
        <VerEventos></VerEventos>
</div>
</div>
</template>

<script>
import VerEventos from '@/components/VerEventos.vue'


export default {
    
    components: {
        VerEventos
    }
      

}

</script>


<style lang="scss" scoped>

.container{
    padding: 20px;

}

.container__buttons{
    margin-left: auto;
}

.container__buttons__button-success{
    background-color: #43A047 !important;
}

.container__buttons__button-info{
    background-color: #42A5F5 !important;
}

</style>
