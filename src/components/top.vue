<template>
<div>
    <router-link to="/home/newSong" class="logo">
    </router-link>
    <router-link to="/detail/search/hotSearch" class="search">
        <span class="iconfont icon-sousu"></span>
    </router-link>
</div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
    @import '../dist/scss/tool.scss';
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: size(58.486);
        background-color: #2ca2f9;
        .logo{
            display: inline-block;
            width: size(131.14);
            height: size(30.2);
            margin-left: size(12.85);
            background: url('../dist/img/logo.png') no-repeat;
            background-size: 100%;
        };
        .search{
            margin-right: size(12);
            span{
                color: whitesmoke;
                font-size: size(30)
            }
        }
    }
</style>
