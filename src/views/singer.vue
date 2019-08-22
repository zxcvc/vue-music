<template>
<div class="wrap">
    <ul class="classlist">
        <li class="classitem" v-for="(item,key) in data" :key="key">
            <ul class="singerlist">
                <li class="singeritem" v-for="item in item" :key="item.classid">
                    <router-link :to="{path:'/detail/singersList',query:{classId:item.classid}}" class="link">
                        <p class="left">{{item.classname}}</p>
                        <span class="iconfont icon-next"></span>
                    </router-link>
                </li>
            </ul>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    data() {
        return {
            data: null
        }
    },
    methods: {
        async getData() {
            let ret = await this.$axios.get('/api/singer/class&json=true')
            let data = ret.data.list
            let arr = [
                [],
                [],
                [],
                []
            ]
            data.forEach(item => {
                switch (item.classid) {
                    case 88:
                        arr[0].push(item)
                        break
                    case 1:
                        arr[1].push(item)
                        break
                    case 2:
                        arr[1].push(item)
                        break
                    case 3:
                        arr[1].push(item)
                        break
                    case 4:
                        arr[2].push(item)
                        break
                    case 5:
                        arr[2].push(item)
                        break
                    case 6:
                        arr[2].push(item)
                        break
                    case 7:
                        arr[3].push(item)
                        break
                    case 8:
                        arr[3].push(item)
                        break
                    case 9:
                        arr[3].push(item)
                        break
                }
            })
            this.data = arr
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
    padding-top: size(1);
    .classlist {
        width: 100%;
        .classitem {
            background-color: #fbfbfb;
            margin: size(18) auto;
            width: size(347.31);
            border: 1px solid #e4e4e4;
            border-radius: size(5);
            .singerlist {
                width: 100%;
                :last-child {
                    border-bottom: none !important;
                }
                .singeritem {
                    height: size(49.688);
                    width: 100%;
                    border-bottom: 1px solid #e4e4e4;
                    .link {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        p {
                            height: 100%;
                            flex: 9;
                            display: flex;
                            align-items: center;
                            font-size: size(18);
                            color: #333;
                            padding-left: size(12.875);
                        }
                        span {
                            display: flex;
                            align-items: center;
                            height: 100%;
                            flex: 1;
                            font-size: size(26);
                            color: #333;
                        }
                    }
                }
            }
        }
    }
}
</style>
