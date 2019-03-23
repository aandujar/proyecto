import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     usuario: [
        {id:''},
        {nombre:""},
        {avatar:""}
      ]
  },
  mutations: {
    setUsuario(state,usuario){
      state.usuario.id = usuario.id;
      state.usuario.nombre = usuario.nombre;
      state.usuario.avatar = usuario.avatar;
    }

  },
  actions: {

  },

  getters:{
    getIdUsuario: state => {
      return state.usuario.id;
    },
    getNombreUsuario: state => {
      return state.usuario.nombre;
    },
    getAvatarUsuario: state => {
      return state.usuario.avatar;
    }
  },
})
