<template>
    <div>
        <mall-header></mall-header>
        <transition mode="out-in" tag="div">
            <router-view></router-view>
        </transition>
        <mall-footer></mall-footer>
        <go-top></go-top>
    </div>
</template>

<script>

import mallHeader from './common/header.vue';
import mallFooter from './common/footer.vue';
import GoTop from './components/goTop.vue';

export default {
    data: function() {
        return {}
    },
    components: {
        mallHeader,
        mallFooter,
        GoTop
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    .v-enter, 
    .v-leave-to {
        opacity: 0; 
        transform: translateX(140px);
    }

    .v-enter-active, 
    .v-leave-active {
        transition: all 0.5s ease;
    }
</style>