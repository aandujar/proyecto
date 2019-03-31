import axios from 'axios'

const $axios = axios.create({
  baseURL: 'http://localhost:3002'
})



export function login(usuario, password) {
  return $axios({
    url: 'login',
    method: 'get',
    params: {
      usuario: usuario,
      password: password
    }
  })
}

export function registro(usuario,password,email,nombre,apellidos) {
  return $axios({
    url: 'registro',
    method: 'post',
    data: { 
      usuario: usuario,
      password: password,
      email: email,
      nombre: nombre,
      apellidos: apellidos
    }
  })
}

export function getEventos(idUsuario, provincia, localidad, deporte) {
  let params;

  if ((provincia) && (localidad) && (deporte)) {
    params = { id: idUsuario, provincia: provincia, localidad: localidad, deporte: deporte };
  } else if ((provincia) && (localidad)) {
    params = { id: idUsuario, provincia: provincia, localidad: localidad, };
  } else if ((provincia) && (deporte)) {
    params = { id: idUsuario, provincia: provincia, deporte: deporte };
  } else if (provincia) {
    params = { id: idUsuario, provincia: provincia };
  } else if (deporte) {
    params = { id: idUsuario, deporte: deporte };
  } else {
    params = { id: idUsuario };
  }
  return $axios({
    url: 'eventos',
    method: 'get',
    params: params
  })
}

export function inscripcionEvento(idUsuario, idEvento, email) {
  return $axios({
    url: 'inscribirse',
    method: 'post',
    data: {
      idEvento: idEvento,
      idUsuario: idUsuario,
      email: email
    }
  })
}

export function crearEvento(id,email,provincia,localidad,deporte,participantes,fecha,hora,descripcion) {
  return $axios({
    url: 'crearEvento',
    method: 'post',
    data: { 
      id: id,
      email: email,
      provincia: provincia,
      localidad: localidad,
      deporte: deporte,
      participantes: participantes,
      fecha: fecha,
      hora: hora,
      descripcion: descripcion
    }
  })
}

export function getProvincias() {
  return $axios({
    url: 'provincias',
    method: 'get'
  })
}

export function getLocalidades() {
  return $axios({
    url: 'localidades',
    method: 'get'
  })
}

export function getDeportes() {
  return $axios({
    url: 'deportes',
    method: 'get'
  })
}



