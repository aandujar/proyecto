<template>
<div class="container">
    <div class="container__buttons">
        <v-btn class="container__buttons__button-success" v-on:click:"mostrarCrear">Crear Evento</v-btn>
        <v-btn class="container__buttons__button-info" v-on:click:"mostrarCrear">Ver Eventos</v-btn>
    </div>
    <div>
        <CrearEvento></CrearEvento>
    </div>
    <div>
        <VerEventos></VerEventos>
    </div>
</div>


</template>

<script>
import CrearEvento from '@/components/CrearEvento.vue'
import VerEventos from '@/components/VerEventos.vue'


export default {
    components: {
        CrearEvento,
        VerEventos
    },

    methods:{
        mostrarCrear: function(){
            
        },
        mostrarEditar: function(){

        }
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
