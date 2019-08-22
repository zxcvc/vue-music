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
        title() {
            return this.data.rankname
        }
    },
    methods: {
        async getData() {
            let url = '/api/plist/list/id'.replace(/id/, this.$route.query.listId)
            let ret = await this.$axios.get(url, {
                params: {
                    json: true
                }
            })
            let data = ret.data
            data.info.list.imgurl = data.info.list.imgurl.replace(/\{size\}/, 400)
            this.imgurl = data.info.list.imgurl
            this.$store.commit('setList', data.list.list.info)
            this.$store.commit('setTitle', data.info.list.specialname)

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
