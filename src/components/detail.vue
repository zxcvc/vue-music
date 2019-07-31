<template>
    <div class="detail">
        <backbox class="backbox" ref="backbox"></backbox>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import backbox from './backbox.vue'
export default {
    components: { backbox },
}
</script>
<style lang="scss" scoped>
@import '../dist/scss/tool.scss';

.detail {
    width: 100%;
    // overflow: hidden;
    .backbox {
        position: fixed;
        top: size(58.488);
        width: size(375);
        padding: 0;
        // opacity: 0.9;
        // background-color: white;
        z-index: 999;
    }
    .main{
    margin-top: size(112.488);
    }
}
</style>
