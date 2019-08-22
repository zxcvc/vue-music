<template>
<div class="wrap">
    <mt-navbar>
        <router-link to="/home/newSong" class="item mint-tab-item">新歌</router-link>
        <router-link to="/home/rank" class="item mint-tab-item">排行</router-link>
        <router-link to="/home/polist" class="item mint-tab-item">歌单</router-link>
        <router-link to="/home/singer" class="item mint-tab-item">歌手</router-link>
    </mt-navbar>
</div>
</template>

<script>
export default {
    data() {
        return {}
    }

}
</script>

<style lang="scss" scoped>
@import '../dist/scss/tool.scss';
.wrap {
    margin-bottom: size(8);

    background-color: white;
    // padding: 0 size(8);
    box-shadow: 0 0.1785rem 0.1785rem 0 #f4f4f4;
    .item {
        color: #333;
        font-size: size(20.5722);
    }
}
</style>
