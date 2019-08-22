<template>
<div class="wrap">
    <ul class="list clickList" v-if="data">
        <li class="item" v-for="(item,index) in data" :key="index">
            <div class="itemdiv">
                <span to="" :class="['left',{'white':item.trans_param.hash_offset}]" @click="setSonginfo(item.hash,item.trans_param.hash_offset)">
                    {{item.filename}}
                </span>
            </div>
        </li>
    </ul>

</div>
</template>
<script>
export default {
    data() {
        return {
            ff: {
                // url: '',
                imgUrl: '',
                songName: '',
                singerName: ''
            }
        }
    },
    computed: {
        data() {
            return this.$store.state.songsList
        },
        url() {
            return this.$store.state.souce.url
        }
    },
    methods: {
        setSonginfo(hash,target) {
            if(target) return;      //如果需要权限则直接return
            this.$store.dispatch('setSonginfo',hash)
        },
    },
    created() {
        this.setSonginfo = this.throttle(this.setSonginfo, 1500)
    }
}
</script>
<style lang="scss" scoped>
@import '../dist/scss/tool.scss';
.wrap {
    .player {
        position: fixed;
        bottom: 0;
    }
    .list {
        width: size(362);
        right: 0;
        li {
            border-bottom: 1px solid #e5e5e5;
            .itemdiv {
                height: size(73);
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    font-size: size(18);
                    color: #333;
                    flex: 8;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    padding-left: size(10);
                }
                .white{
                    color: grey
                }
                .right {
                    flex: 2;
                    font-size: size(24);
                    height: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    span {
                        font-size: size(26);
                        color: rgb(151, 141, 141)
                    }
                }
            }
        }
    }
}
</style>
