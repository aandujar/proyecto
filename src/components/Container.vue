<template>
  <div class="container">
    <VerEventos></VerEventos>
  </div>
</template>

<script>
import VerEventos from "@/components/VerEventos.vue";

export default {
  components: {
    VerEventos
  }
};
</script>


<style lang="scss" scoped>
.container {
  padding: 20px;
}
</style>
