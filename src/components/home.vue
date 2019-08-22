<template>
    <div class="home">
        <tabbar class="tabbar"></tabbar>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import tabbar from './tabbar.vue'
export default {
    components: { tabbar }
}
</script>
<style lang="scss" scoped>
@import '../dist/scss/tool.scss';

.home {
    width: 100%;
    overflow: hidden;
    .tabbar {
        position: fixed;
        top: size(58.488);
        width: size(375);
        padding: 0;
        z-index: 999;
    }
    .main{
    margin-top: size(127.488);
    }
}
</style>
