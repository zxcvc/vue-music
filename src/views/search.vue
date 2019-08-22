<template>
<div class="wrap">
    <div class="form">
        <div class="searchbox">
            <div class="left">
                <span class="iconfont icon-sousu"></span>
                <input type="text" placeholder="歌手/歌名/拼音" v-model="keyword" @input="input">
            </div>
            <div class="right">
                <button :class="['btn',{'active':this.active}]" @click.prevent="search">搜索</button>
            </div>
        </div>
    </div>
    <router-view></router-view>
</div>
</template>

<script>
import hotSearch from '../components/hotSearch.vue'
import searchList from '../components/searchList.vue'
export default {
    data() {
        return {
            keyword: '',
            active: false,
        }
    },
    methods: {
        input() {
            if (!(this.keyword.trim())) {
                this.active = false
            } else {
                this.active = true
            }
        },
        search() {
            if (this.keyword.trim()) {
                this.$router.push({ path: '/detail/search/searchList', query: { keyword: this.keyword } })
            }
        }
    },
    components: {
        hotSearch,
        searchList
    }
}
</script>

<style lang="scss" scoped>
@import '../dist/scss/tool.scss';
.wrap {
    .form {
        height: size(63.06);
        background-color: #fbfbfb;
        display: flex;
        justify-content: center;
        align-items: center;
        .searchbox {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: size(349.31);
            height: size(37.38);
            .left {
                background-color: #fff;
                height: 100%;
                width: size(278.39);
                border: 1px solid #e5e5e5;
                border-radius: 5px;
                display: flex;
                align-items: center;
                span {
                    margin-left: size(6);
                    flex: 1;
                    font-size: size(20);
                    color: #333;
                }
                input {
                    height: 100%;
                    flex: 9;
                    border: none;
                    outline-width: 0px;
                    font-size: size(18);
                }
            }
            .right {
                margin-left: size(6);
                .btn {
                    width: size(60.25);
                    height: size(37.28);
                    font-size: size(14);
                    background-color: #e5e5e5;
                    color: #959595;
                    border-radius: 5px;
                    vertical-align: middle;
                    border: none;
                    outline-width: 0px;
                }
                .active {
                    background-color: #2ca2f9;
                    color: white;
                }
            }
        }
    }
}
</style>
