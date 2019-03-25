import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
     usuario: [
        {id:''},
        {nombre:""},
        {avatar:""},
        {email:""}
      ]
  },
  mutations: {
    setUsuario(state,json){
      console.log(json);
      state.usuario.id = json.id;
      state.usuario.nombre = json.nombre;
      state.usuario.avatar = json.avatar;
      state.usuario.email = json.correo;
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
    },
    getEmailUsuario: state => {
      return state.usuario.email;
    }
  },
})
