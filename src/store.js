import Vue from 'vue'
import Vuex from 'vuex'
import * as service from './service/servicio.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario: [
      { logado: '' },
      { id: '' },
      { nombre: "" },
      { avatar: "" },
      { email: "" }
    ],
    logado: '',
    eventos: [],
    eventosEstado: '',
    provincias: [],
    localidadesAlicante: [],
    localidadesCastellon: [],
    localidadesValencia: [],
    deportes: [],
    crearEvento:'',
    registro:'',

  },
  mutations: {
    ['SET_USUARIO']: (state, json) => {
      state.usuario.id = json.id;
      state.usuario.nombre = json.usuario;
      state.usuario.avatar = json.avatar;
      state.usuario.email = json.correo;
    },
    ['LOGIN_CORRECTO']: (state) => {
      state.logado = "si"
    },
    ['LOGIN_ERROR']: (state) => {
      state.logado = "error"
    },
    ['LOGIN_CARGANDO']: (state) => {
      state.logado = "cargando"
    },
    ['SET_EVENTOS']: (state, json) => {
      state.eventos = json;
    },
    ['EVENTOS_CORRECTO']: (state) => {
      state.eventosEstado = "si"
    },
    ['EVENTOS_ERROR']: (state) => {
      state.eventosEstado = "error"
    },
    ['EVENTOS_CARGANDO']: (state) => {
      state.eventosEstado = "cargando"
    },
    ['SET_PROVINCIAS']: (state, json) => {
      state.provincias = json;
    },
    ['SET_LOCALIDADES']: (state, json) => {
      state.localidadesAlicante= []
      state.localidadesCastellon= []
      state.localidadesValencia= []
      json.map(function(localidad){
        if(localidad.provincia=="Alicante"){
          state.localidadesAlicante.push(localidad.nombre);
        }else if(localidad.provincia=="Castellón"){
          state.localidadesCastellon.push(localidad.nombre);
        }else if(localidad.provincia=="Valencia"){
          state.localidadesValencia.push(localidad.nombre);
        }
      });
    },
    ['SET_DEPORTES']: (state, json) => {
      state.deportes = json;
    },
    ['CREAR_EVENTO']: (state) => {
      state.crearEvento = '';
    },
    ['CREAR_EVENTO_CARGANDO']: (state,) => {
      state.crearEvento = 'cargando';
    },
    ['REGISTRO_CARGANDO']: (state) => {
      state.registro = 'cargando';
    },
    ['REGISTRO_NO_CARGANDO']: (state) => {
      state.registro = '';
    },
  },
  actions: {
    login({ commit }, { usuario, password }) {
      return new Promise((resolve, reject) => {
        commit('LOGIN_CARGANDO');
        service.login(usuario, password)
          .then(function (response) {
            commit('LOGIN_CORRECTO')
            commit('SET_USUARIO',response.data.resultado[0])
            resolve()
          })
          .catch(function () {
            commit('LOGIN_ERROR');
            reject()
          })
      })
    },

    getEventos({ commit }, { idUsuario,provincia,localidad,deporte }) {
      return new Promise((resolve, reject) => {
        commit('EVENTOS_CARGANDO');
        service.getEventos(idUsuario,provincia,localidad,deporte)
          .then(function (response) {
            commit('EVENTOS_CORRECTO')
            commit('SET_EVENTOS',response.data.resultado)
            resolve()
          })
          .catch(function () {
            commit('EVENTOS_ERROR')
            commit('SET_EVENTOS',[])
            reject()
          })
      })
    },
    
    inscribirse({ commit },{ idUsuario, idEvento, email }) {
       return new Promise((resolve, reject) => {
         service.inscripcionEvento(idUsuario,idEvento,email)
          .then(function () {
            resolve()
          })
          .catch(function () {
            reject()
          })
      })
    },

    getProvincias({ commit }) {
      return new Promise((resolve, reject) => {
        service.getProvincias()
         .then(function (response) {
          commit('SET_PROVINCIAS',response.data.resultado)
           resolve()
         })
         .catch(function () {
           reject()
         })
     })
  },

  getLocalidades({ commit }) {
    return new Promise((resolve, reject) => {
      service.getLocalidades()
       .then(function (response) {
        commit('SET_LOCALIDADES',response.data.resultado)
         resolve()
       })
       .catch(function () {
         reject()
       })
   })
},

getDeportes({ commit }) {
  return new Promise((resolve, reject) => {
    service.getDeportes()
     .then(function (response) {
      commit('SET_DEPORTES',response.data.resultado)
       resolve()
     })
     .catch(function () {
       reject()
     })
 })
},

crearEvento({ commit },{id,email,provincia,localidad,deporte,participantes,fecha,hora,descripcion}) {
  return new Promise((resolve, reject) => {
    commit('CREAR_EVENTO_CARGANDO');
    service.crearEvento(id,email,provincia,localidad,deporte,participantes,fecha,hora,descripcion)
     .then(function () {
      commit('CREAR_EVENTO');
       resolve()
     })
     .catch(function () {
      commit('CREAR_EVENTO');
       reject()
     })
 })
},

registro({ commit },{usuario,password,email,nombre,apellidos}) {
  return new Promise((resolve, reject) => {
    commit('REGISTRO_CARGANDO');
    service.registro(usuario,password,email,nombre,apellidos)
     .then(function (response) {
        commit('REGISTRO_NO_CARGANDO');
        commit('SET_USUARIO',response.data);
        resolve()
     })
     .catch(function () {
      commit('REGISTRO_NO_CARGANDO');
      reject()
     })
 })
},

},

  getters: {
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
