<template>
<div class="wrap">
    <span class="iconfont icon-prev" @click="back"></span>
    <p class="title" ref="title" align="center">{{title}}</p>
</div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    computed:{
        title(){
            return this.$store.state.title
        }
    },
    methods: {
        back() {
            this.$router.go(-1)
        }
    },

}
</script>
<style lang="scss" scoped>
@import '../dist/scss/tool.scss';
.wrap {
    width: size(375);
    height: size(54);
    margin-bottom: size(8);
    position: fixed;
    display: flex;
    // box-shadow: 0 0.1785rem 0.1785rem 0 #f4f4f4;
    // color: rgb(90, 86, 86);
    background: linear-gradient(90deg,rgba(1, 26, 32, 0.3),rgba(177, 108, 233, 0.3));
    span {
        width: size(38.555);
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        font-size: size(40);
        color: white;
    }
    .title {
        color: white;
        width: size(297.88);
        height: 100%;
        text-align: center;
        line-height: size(54);
        font-size: size(18)
    }
}
</style>
