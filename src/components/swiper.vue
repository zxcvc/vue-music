<template>
<div class="wrap">
    <swiper :options="swiperOption" class="swwrap" v-if="imgsrc">
        <swiper-slide v-for="item in imgsrc" :key="item.id">
            <router-link to="#">
                <img :src="item.imgurl" style="opaccity:1">
            </router-link>
        </swiper-slide>
    </swiper>
    <div class="swiper-pagination"></div>
</div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data() {
        return {
            swiperOption: {
                autoplay: true,
                // effect : 'fade',
                speed: 1000,
                loop: true,
                loopAdditionalSlides: 0,
                autoplay: {
                    delay: 1500,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    type: 'bullets',
                    // type: 'fraction',
                    // type : 'progressbar',
                    // type : 'custom',
                    progressbarOpposite: true, //使进度条分页器与Swiper的direction参数相反
                    bulletElement: 'li', //设定分页器指示器（小点）的HTML标签。
                    dynamicBullets: false, //动态分页器，当你的slide很多时，开启后，分页器小点的数量会部分隐藏。
                    dynamicMainBullets: 1, //动态分页器的主指示点的数量
                    hideOnClick: false, //默认分页器会一直显示。这个选项设置为true时点击Swiper会隐藏/显示分页器。
                    clickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。

                },
            },
        }
    },
    props: ['imgsrc'],
    components: {
        swiper,
        swiperSlide
    }

}
</script>

<style lang="scss" scoped>
@import '../dist/scss/tool.scss';
.wrap {
    position: relative;
    width: size(375);
    height: size(154.28);
    .swwrap {
        width: 100%;
        height: size(154.28);
        a {
            display: inline-block;
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
    .swiper-pagination {
        width: 100%;
        height: size(12);
        bottom: size(1);
        display: flex;
        justify-content: center;
    }
}
</style>