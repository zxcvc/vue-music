<template>
<div class="wrap">
    <ul class="list">
        <li class="item" v-for="item in data" :key="item.specialid">
            <router-link :to="{path:'/detail/polistItem',query:{listId:item.specialid}}">
                <div class="left">
                    <img :src="item.imgurl" alt="">
                    <div class="describe">
                        <p class="top">{{item.specialname}}</p>
                        <div class="bottom">
                            <span class="iconfont icon-headset"></span>
                            <span>{{item.playcount}}</span>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <span class="iconfont icon-next"></span>
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
            data: []
        }
    },
    methods: {
        async getData() {
            let ret = await this.$axios.get('/api/plist/index&json=true')
            let data = ret.data.plist.list.info
            data.forEach(item => {
                item.imgurl = item.imgurl.replace(/\{size\}/, 400)
            })
            this.data = data
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
    .list {
        width: size(375);
        li {
            a {
                border-bottom: 1px solid #e5e5e5;
                height: size(123.44);
                margin-left: size(12.875);
                display: flex;
                .left {
                    height: 100%;
                    flex: 8.5;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    img {
                        width: size(96.75);
                        height: size(96.75);
                    }
                    .describe {
                        height: size(96.75);
                        width: size(207);
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        padding-left: size(16);
                        .top {
                            color: #333;
                            font-size: size(18);
                        }
                        .bottom {
                            color: #9b9b9b;
                            font-size: size(14.1426);
                        }
                    }
                }
                .right {
                    height: 100%;
                    flex: 1.5;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span {
                        color: rgb(151, 141, 141);
                        font-size: size(26)
                    }
                }
            }
        }
    }
}
</style>
