<template>
<div class="container">
    <div class="container__buttons">
        <v-btn class="container__buttons__button-success" v-on:click="mostrarCrear">Crear Evento</v-btn>
        <v-btn class="container__buttons__button-info" v-on:click="mostrarVer">Ver Eventos</v-btn>
    </div>
    <div v-if="crear">
        <CrearEvento></CrearEvento>
    </div>
    <div v-if="ver">
        <VerEventos></VerEventos>
    </div>
</div>
</template>

<script>
import CrearEvento from '@/components/CrearEvento.vue'
import VerEventos from '@/components/VerEventos.vue'


export default {
    data () {
      return {
        crear:false,
        ver:true
      }
    },
    components: {
        CrearEvento,
        VerEventos
    },

    methods:{
        mostrarCrear: function(){
            this.crear = true;
            this.ver = false;
        },
        mostrarVer: function(){
            this.crear = false;
            this.ver = true;
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
