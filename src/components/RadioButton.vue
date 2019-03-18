 <template>
 <div>
  <v-radio-group v-model="categoriaSeleccionada">
    <v-radio v-for="categoria in categorias" :key="categoria" :label="`${categoria}`" :value="categoria"></v-radio>
  </v-radio-group>
  {{categoriaSeleccionada}}
</div>
</template>

<script>
import store from '../store'
import EventBus from '../event-bus.js'

  export default {
    props: {categorias: Array,nombre: String},
    data () {
      return {
        categoriaSeleccionada:"",
        checkbox: true,
        radioGroup: 1,
        switch1: true
      }
    },
    
     watch: {
      categoriaSeleccionada: function(){
          EventBus.$emit(this.nombre, this.categoriaSeleccionada);  
      }
    },
  }
</script>