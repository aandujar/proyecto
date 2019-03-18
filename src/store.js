import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     usuario: [
        {nombre:""},
        {avatar:""}
      ]
  },
  mutations: {
    setUsuario(state,usuario){
      state.usuario.nombre = usuario.nombre;
      state.usuario.avatar = usuario.avatar;
    }

  },
  actions: {

  },

  getters:{
    getNombreUsuario: state => {
      return state.usuario.nombre;
    },
    getAvatar: state => {
      return state.usuario.avatar;
    }
  },
})
