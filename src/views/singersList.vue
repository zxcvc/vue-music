<template>
<div class="wrap">
    <ul class="list">
        <li class="item" v-for="item in list" :key="item.singerid">
            <router-link :to="{path:'/detail/singerItem',query:{singerid:item.singerid}}" class="link">
                <div class="left">
                    <img :src="item.imgurl" alt=" ">
                </div>
                <div class="right ">
                    <p>{{item.singername}}</p>
                </div>
            </router-link>
        </li>
    </ul>
</div>
</template>
<script>
export default {
    data() {
        return {
            list: []
        }
    },
    methods: {
        async getData() {
            let url = '/api/singer/list/classId'.replace(/classId/, this.$route.query.classId)
            let ret = await this.$axios.get(url, {
                params: {
                    json: true
                }
            })
            let data = ret.data.singers.list.info
            data.forEach((item) => {
                item.imgurl = item.imgurl.replace(/\{size\}/, 400)
            })
            this.list = data
            this.$store.commit('setTitle', ret.data.classname)
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
    width: size(375);
    .list {
        width: 100%;
        .item {
            width: 100%;
            height: size(87.755);
            margin-left: size(-10);
            .link {
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                .left {
                    width: size(61.066);
                    height: size(61.066);
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .right {
                    width: size(245.33);
                    height: size(61);
                    p {
                        width: 100%;
                        height: 100%;
                        font-size: size(19.28522);
                        color: #333;
                        line-height: size(61);
                    }
                }
            }
        }
    }
}
</style>
