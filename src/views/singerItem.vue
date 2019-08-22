<template>
<div class="wrap">
    <div class="imgwrap">
        <img :src="imgurl" alt="">
    </div>
    <div :class="['info',{'auto':this.auto}]">
        <p>{{singerInfo.intro}}</p>
        <span :class="['iconfont', icon]" @click="change"></span>
    </div>
    <list></list>
</div>
</template>
<script>
export default {
    data() {
        return {
            imgurl: '',
            singerInfo: {},
            icon:'icon-down',
            auto:false
        }
    },

    computed: {},
    methods: {
        change(){
            if(this.auto){
                this.auto = !this.auto
                this.icon = 'icon-down'
            }else{
                this.auto = !this.auto
                this.icon = 'icon-up'
            }
        },
        async getData() {
            let url = '/api/singer/info/singerId'.replace(/singerId/, this.$route.query.singerid)
            let ret = await this.$axios.get(url, {
                params: {
                    json: true
                }
            })
            let data = ret.data
            this.imgurl = data.info.imgurl.replace(/\{size\}/, 400)
            this.singerInfo = data.info
            this.$store.commit('setTitle', data.info.singername)
            this.$store.commit('setList', data.songs.list)

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
    .info {
        position: relative;
        width: size(375);
        height: size(40.55);
        padding-left: size(16.0722);
        padding-right: size(8);
        padding-top: size(9.643);
        display: flex;
        // justify-content: space-around;
        span {
            position: absolute;
            font-size: size(24);
            right: size(8);
            transform: translateY(size(2));
            color: #333;
        }
        p {
            height: 100%;
            width: size(310.733);
            overflow: hidden;
            font-size: size(18);
            line-height: 1.8;
            color: #333;
        }
    }
    .auto {
        height: auto !important;
        padding-bottom: size(9.643);
    }
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
