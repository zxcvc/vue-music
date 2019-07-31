<template>
<div class="wrap">
    <div class="imgwrap">
        <img :src="imgurl" alt="">
    </div>
    <list></list>
</div>
</template>
<script>
export default {
    data() {
        return {
            imgurl: '',
        }
    },
    computed: {
        
    },
    methods: {
        async getData() {
            let ret = await this.$axios.get('/api/rank/info/', {
                params: {
                    rankid: this.$route.query.rankid,
                    page: 1,
                    json: true
                }
            })
            let data = ret.data
            data.info.imgurl = data.info.imgurl.replace(/\{size\}/, 400)
            this.imgurl = data.info.imgurl
            this.$store.commit('setList', data.songs.list)
            this.$store.commit('setTitle', data.info.rankname)
        }
    },
    created() {
        this.getData()
    }

}
</script>
<style lang="scss" scoped>
@import '../dist/scss/tool.scss';
.wrap {
    .imgwrap {
        width: size(375);
        height: size(225);
        margin-top: size(-54);
        overflow: hidden;
        img {
            width: 100%;
            height: size(375);
            margin-top: size(-54);
        }
    }
}
</style>
