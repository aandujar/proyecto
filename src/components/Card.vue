<template>
  <v-card class="mt-3 mx-auto card" elevation="12">
    <v-sheet
      class="v-sheet--offset mx-auto card__header"
      elevation="18"
      max-width="calc(100% - 32px)"
    >
      <v-img
       :src="rutaImagen" 
       height="100%"
       width="100%"
       ></v-img>
       </v-sheet>
    <div class="card__detalles">


    <div><v-icon>work</v-icon>{{ deporte }}</div>
    <div><v-icon>room</v-icon>{{localidad}}</div>
    <div><v-icon>room</v-icon>{{provincia}}</div>
    <div><v-icon>date_range</v-icon>{{crearFecha}}</div>
    <div><v-icon>access_time</v-icon>{{crearHora}}</div>
      
      </div>
<v-divider class="my-2"></v-divider>
    <div class="card__descripcion">
      {{descripcion}}
      </div>
      <v-divider class="my-2"></v-divider>
      
      <div class="card__footer">
          <v-btn flat color="green" v-on:click="metodo" class="card__footer__boton">Inscribirse</v-btn>
          <v-btn flat color="blue" v-on:click="enviarLocalizacion" class="card__footer__boton">Ver en mapa</v-btn>
        <div class="card__footer__inscritos">{{participantesInscritos}}/{{participantesMaximos}}</div>
      </div>
  </v-card>
</template>

<script>


export default {
  props: {
    deporte: String,
    localidad: String,
    provincia: String,
    fecha: String,
    hora: String,
    descripcion: String,
    participantesInscritos: String,
    participantesMaximos: String,
    id: Number,
    latitud: Number,
    longitud: Number,
    metodo: Function,
    metodo2: Function
  },

  computed:{
    crearFecha: function(){
      var fechaTrocear = this.fecha.split("T");
      var fechaTrocearBien = fechaTrocear[0].split("-");
      return fechaTrocearBien[2] + "-" + fechaTrocearBien[1] + "-" + fechaTrocearBien[0];
    },

    crearHora: function(){
      var horaTroceada = this.hora.split(":");
      return horaTroceada[0] + ":" + horaTroceada[1];
    },

    rutaImagen: function(){
       return "http://localhost:3002/imagenes/" + this.deporte + ".png";
  }
  },
  methods:{
    enviarLocalizacion(){
      this.$emit('mandarLocalizacion',this.latitud,this.longitud);
    }
  }
  
  
};
</script>

<style lang="scss" scoped>

.card{
  height: 310px;
  width: 310px;
  margin-bottom: 20px;
}

.card__header{
  position: relative;
  height: 90px;
  width: 90px;
  top: -15px;
  left: -90px;
  z-index:0;
}

.card__detalles{
  position: relative;
  padding-left: 120px;
  top: -70px;
  margin-bottom: -70px;
  font-size: 20px;
}

.card__descripcion{
  padding: 10px;
  top: 160px;
  height: 90px;
  width: 100%;
  word-wrap: break-word;
  font-size: 18px;
}

.card__footer{
  display: flex;
  flex-direction: row;
  top: -20px;
  font-size: 18px;
  padding-top: 8px;
  padding-right: 5px;
}

.card__footer__boton{
  margin-left: -10px;
}

.card__footer__inscritos{
  position: relative;
  margin-left: auto;
  top: 14px;
}

</style>