<template>
  <div>
    <gmap-map
      :center="center"
      :zoom="12"
      style="width:100%;  height: 400px;"
    >
      <gmap-marker
        :position="center"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
export default {
  data() {
    return {
      center,
      };
  },

 props: {
    latitud: Number,
    longitud: Number
  },
  created(){
      this.center = { lat: Number(this.latitud), lng: Number(this.longitud) }
  },

  mounted() {
    navigator.geolocation.getCurrentPosition(position => {
        this.center
      });
  }
};
</script>