<template>
<div class="menu-side">
<NavigationDrawer></NavigationDrawer>
</div>
</template>


<script>
import NavigationDrawer from '@/components/Navigation-drawer.vue'

export default {
  components: {
    NavigationDrawer
  }
};



</script>

<style>
.menu-side{
  height: 700px;
}


</style>
