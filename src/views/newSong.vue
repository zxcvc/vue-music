<template>
<div class="wrap">
    <swiper :imgsrc=imgsrc></swiper>
    <list></list>
</div>
</template>
<script>
import swiper from '../components/swiper.vue'
export default {
    data() {
        return {
            imgsrc: null
        }
    },
    methods: {
        async getData() {
            let ret = await this.$axios.get('/api', {
                params: { json: true }
            })
            let data = ret.data
            this.$store.commit('setList', data.data)
            this.imgsrc = data.banner
        }
    },

    created() {
        this.getData()
    },
    components: {
        swiper,
    }

}
</script>

<style lang="scss" scoped>
// @import '../dist/scss/tool.scss';
// .wrap{
//     .newsonglist {
//         width: size(362);
//         right: 0;
//         li {
//             border-bottom: 1px solid #e5e5e5;
//             .itemdiv {
//                 height: size(73);
//                 display: flex;
//                 justify-content: space-between;
//                 align-items: center;
//                 .left {
//                     font-size: size(18);
//                     color: #333;
//                     flex: 8;
//                     height: 100%;
//                     display: flex;
//                     align-items: center;
//                     padding-left: size(10);
//                 }
//                 .right {
//                     flex: 2;
//                     font-size: size(24);
//                     height: 100%;
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     span{
//                         font-size: size(26);
//                         color: rgb(151, 141, 141)
//                     }
//                 }
//             }
//         }
//     }
// }
</style>
