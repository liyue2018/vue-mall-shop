<template>
    <div class="main">
        <router-view></router-view>
    </div>
</template>

<script>

export default {
    data: function() {
        return {
            title: 'liyue'
        }
    },
    // watch: {
    //     '$route.path': function (newValue, oldValue) {
    //         console.log (newValue + '====' + oldValue)
    //     }
    // }
}


</script>

<style>

@import 'assets/style/index.scss';

.main {
    background: #ededed;
    width: 100%;
    overflow: hidden;
}
</style>