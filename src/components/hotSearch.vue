<template>
<div class="warp">
    <div class="hot">最近热门</div>
    <ul class="list">
        <li class="item" v-for="item in data" :key="item.keyword">
            <router-link :to="{path:'/detail/search/searchList',query:{keyword:item.keyword}}">{{item.keyword}}</router-link>
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
        getData() {
            this.$ajax('', {
                url: 'http://mobilecdn.kugou.com/api/v3/search/hot?format=jsonp&plat=0&count=30',
                type: 'GET',
                dataType: 'jsonp',
                success: (data) => {
                    this.data = data.data.info
                }
            })
        }
    },
    created() {
        this.getData()
    }

}
</script>
<style lang="scss" scoped>
@import '../dist/scss/tool.scss';
.warp {
    width: size(375);
    .hot {
        width: 100%;
        height: size(52.425);
        line-height: size(52.425);
        border-bottom: 1px solid #ccc;
        color: #2ca3f5;
        font-size: size(15.4278);
        padding-left: size(16.0722);
    }
    ul {
        width: 100%;
        li {
            width: size(362.166);
            height: size(65.288);
            transform: translateX(size(12.844));
            border-bottom: 1px solid #e5e5e5;
            a {
                display: flex;
                align-items: center;
                font-size: size(20.5772);
                color: #333;
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
