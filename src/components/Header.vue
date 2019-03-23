<template>
<nav class="header">
<ul class="header__items">
<li class="header__items__item">
    <router-link to="/eventos">
    <v-img 
        src="http://localhost:3002/imagenes/logo.png" 
        class="header__items__item__imagen"
    ></v-img>
    </router-link>>
    </li>
<li class="header__items__item header__items__item--derecha">
    <v-img
        :src="image"
        class="header__items__item__imagen header__items__item__imagen--redondeada"
    ></v-img>
    </li>
</ul>
</nav>
</template>

<script>
import store from '../store'
export default {
    
    data: () => ({
        image:''
    }),
    created() {
        this.image="http://localhost:3002/imagenes/avatares/" + store.getters.getAvatarUsuario
    }
}


</script>


<style lang="scss" scoped>
.header{
    background: linear-gradient(60deg,#ef5350,#e53935)!important;
    height: 100px;
    width: 100%;
    padding-right: 20px;
}

.header__items{
    list-style: none;
    display: flex;
    flex-direction: row;
}

.header__items__item{
    
}

.header__items__item--derecha{
    margin-left: auto;
}

.header__items__item__imagen{
    height: 100px;
    width: 100px;
}



.header__items__item__imagen--redondeada{
    border-radius: 110px;
}


</style>
