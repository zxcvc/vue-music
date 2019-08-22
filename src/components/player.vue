<template>
<div class="wrap" v-show="audioData.url">
    <!-- auido标签 -->
    <audio ref="audio" @ended="end" v-show="audioData.url" class="audio" @canplay="start" @timeupdate="timeupdate">
        <source :src="audioData.url">
    </audio>
    <!-- 小播放器 -->
    <div :class="['smallplayer',{'target':!target}]" v-show="target">
        <div class="left" @click="tobig">
            <a>
                <img :src="audioData.imgUrl" alt="" v-if="audioData">
                <div class="info">
                    <p class="name" v-if="audioData">{{audioData.songName}}</p>
                    <p class="singer" v-if="audioData">{{audioData.singerName}}</p>
                </div>
            </a>
        </div>
        <div class="right">
            <span class="iconfont icon-fast-backward" @click="pre"></span>
            <span :class="['iconfont', playIcon]" @click.stop="play2pause"></span>
            <span class="iconfont icon-fast-forward" @click="next"></span>
        </div>
    </div>
    <!-- 大播放器 -->
    <div :class="['bigplayer',{'target':target}]">
        <div class="wrap">
            <nav class="nav">
                <p>{{audioData.songName}}-{{audioData.singerName}}</p>
                <span class="iconfont icon-xiangshang" @click="tosmall"></span>
            </nav>

            <img :src="audioData.imgUrl" alt="" class="bgimg">
            <div class="contain">
                <div class="imgAndlyric">
                    <swiper :options="swiperOption" class="swwrap" v-if="audioData">
                        <swiper-slide class="slide">
                            <div :class="['img']">
                                <img :src="audioData.imgUrl" alt="" ref="xuanzhuan" class="xuanzhuan">
                            </div>
                        </swiper-slide>
                        <swiper-slide class="slide" v-if="lyric">
                            <div class="lyric" ref="lyric">
                                <ul class="content" ref="content">
                                    <li align="center" v-for="(item,index) in lyricObj.lines" :key="index" :class="{'current':index === currentLineNum}" ref="li">{{item.txt}}</li>
                                </ul>
                            </div>
                        </swiper-slide>
                    </swiper>

                </div>
                <div class="control">
                    <div class="progress">
                        <div class="parogressbar">
                            <span class="currenttime" v-cloak>{{currentTime | timeFormat}}</span>
                            <div class="timewrap" v-drag>
                                <div class="time" ref="time">
                                    <div class="ball" ref="ball"></div>
                                    <div class="hctime"></div>
                                    <div class="currenttimebar" ref="currenttimebar"></div>
                                </div>
                            </div>
                            <span class="endtime">{{endtime | timeFormat}}</span>
                        </div>
                    </div>
                    <div class="playControl">
                        <span :class="['iconfont', xunhuanIcon]" @click="xunhuan"></span>
                        <span class="iconfont icon-fast-backward" @click="pre"></span>
                        <span :class="['iconfont', playIcon]" @click="play2pause"></span>
                        <span class="iconfont icon-fast-forward" @click="next"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import BScroll from 'better-scroll'
import scroll from 'iscroll'
let scrollAnimate = scroll.utils.ease.quadratic

// 歌词混入数据
let lyric = {
    data() {
        return {
            lyricObj: null,
            currentLyric: null, // 设置一个歌词维护属性
            currentLineNum: 0,
            // scrollObj: null,
            playingLyric: null,
            height: null,
        }
    },

    computed: {
        isplay() {
            return this.$store.state.isplay
        },
        lyric() {
            return this.$store.state.lyric
        },

        scrollObj() {
            let scrollObj = new BScroll(this.$refs.lyric, {
                startY: 0,
                bounce: false,
                resizePolling: 60,
                observeDOM: true,
            })
            return scrollObj
        }
    },

    methods: {
        handler({ lineNum, txt }) {
            this.currentLineNum = lineNum
            this.scrollObj && this.scrollObj.scrollToElement(this.$refs.li[lineNum], 500, false, true, scrollAnimate)
        },
        lyricFn(lyric) {
            return new this.$Lyric(lyric, this.handler)
        },
        timeupdate(e) {
            this.ballEl.style.left = `${e.target.currentTime/e.target.duration*(this.time_el_length-this.ball_length)}px`
            this.current_time_bar_el.style.width = `${e.target.currentTime/e.target.duration*(this.time_el_length-this.ball_length)}px`
            // if(this.ballEl.style.left > )
            this.lyricObj.seek(e.target.currentTime * 1000)
            this.lyricObj.stop()
            this.currentTime = e.target.currentTime
        },
    },

    watch: {
        lyric(newval, oldval) {
            if (newval) {
                this.lyricObj && this.lyricObj.stop()
                this.lyricObj = this.lyricFn(newval)
            }
        },
    },

    mounted() {
        this.lyricObj && this.timeupdate()

    }
}
export default {

    mixins: [lyric],

    data() {
        return {
            // time_el_length:null,
            // ball_length: null,
            playIcon: 'icon-pause',
            xunhuanIcon: 'icon-xunhuan',
            timer: null,
            currentTime: '',
            endtime: '',
            timer2: null,
            xunhuanTarget: 0,
            mode: '顺序',
            // index: null,
            // hash: null,
            xuanzhuanId: null,
            a: true,
            lyricData: null,
            showLyric: false,
            //
            swiperOption: {
                autoplay: false,
                // effect : 'flip',
                speed: 1000,
                loop: false,
                // loopAdditionalSlides: 0,
            },
        }
    },
    computed: {
        current_time_bar_el() {
            return this.$refs.currenttimebar
        },
        ballEl() {
            return this.$refs.ball
        },
        time_el_length() {
            return this.$refs.time.clientWidth
        },
        ball_length() {
            return this.$refs.ball.clientWidth
        },
        audioData() {
            return this.$store.state.audioData
        },
        lyric() {
            return this.$store.state.lyric
        },
        list() {
            return this.$store.state.songsList
        },
        target() {
            return this.$store.state.target
        },
        // hash(){
        //     return this.$store.state.audioData.hash
        // },
        index() {
            if (this.audioData) {
                let index = this.list.findIndex(item => item.hash.toUpperCase() === this.audioData.hash)
                return index
            }
        }
    },

    methods: {
        play(load = false) {
            this.lyricObj.stop()
            let audio = this.$refs.audio
            if (load) {
                audio.load()
            }
            audio.play()
            this.playIcon = 'icon-pause'
            this.$store.commit('setIsplay', true)
            // this.lyricObj.togglePlay()
        },
        paused() {
            this.lyricObj.state = 0
            let audio = this.$refs.audio
            audio.pause()
            this.playIcon = 'icon-play'
            this.$store.commit('setIsplay', false)
        },
        showLy() {
            this.showLyric = true
        },
        setSonginfo(hash) {
            this.$store.dispatch('setSonginfo', hash)
        },
        next() {
            this.currentLineNum = 0
            this.scrollObj && this.scrollObj.scrollToElement(this.$refs.li[0], 500, false, true, scrollAnimate)
            // let index = this.list.findIndex(item => item.hash === this.audioData.hash)
            if (this.index === this.list.length - 1) {
                this.setSonginfo(this.list[0].hash)
            } else {
                this.setSonginfo(this.list[this.index + 1].hash)
                let index = this.list.findIndex(item=>item.hash === this.audioData.hash)
            }
            this.play(true)
        },
        pre() {
            this.currentLineNum = 0
            this.scrollObj && this.scrollObj.scrollToElement(this.$refs.li[0], 500, false, true, scrollAnimate)

            // let index = this.list.findIndex(item => item.hash === this.audioData.hash)
            if (this.index === 0) {
                this.setSonginfo(this.list[this.list.length - 1].hash)
            } else {
                this.setSonginfo(this.list[this.index - 1].hash)
            }
            this.play(true)
        },
        playMode(mode) {
            // let index = this.list.findIndex(item => item.hash === this.audioData.hash)
            let len = this.list.length

            switch (mode) {
                case '顺序':
                    // this.setSonginfo(this.list[this.index + 1].hash)
                    // // if(this.index >= len){
                    // //    this.setSonginfo(this.list[0].hash)
                    // // }
                    // this.play(true)
                    this.next()
                    break;
                case '单曲':
                    this.setSonginfo(this.list[this.index].hash)
                    this.play(true)
                    break;
                case '随机':
                    let random = Math.round(Math.random() * len) //生成0-len的随机数
                    this.setSonginfo(this.list[random].hash)
                    this.play(true)
                    break;
            }
        },

        play2pause() {
            let audio = this.$refs.audio
            if (audio.paused) {
                this.play()
                if (this.$refs.xuanzhuan) {
                    this.$refs.xuanzhuan.style = 'animation-play-state: play'
                }
            } else {
                this.paused()
                if (this.$refs.xuanzhuan) {
                    this.$refs.xuanzhuan.style = 'animation-play-state: paused'
                }
            }
            // console.log(this.lyricObj);
            // this.lyricObj && this.lyricObj.togglePlay()
        },
        end() {
            this.playMode(this.mode)
        },
        xunhuan() {
            this.xunhuanTarget++
                let x = this.xunhuanTarget % 3
            switch (x) {
                case 0:
                    this.xunhuanIcon = 'icon-xunhuan'
                    this.mode = '顺序'
                    break;

                case 1:
                    this.xunhuanIcon = 'icon-cloud-circulation'
                    this.mode = '单曲'
                    break;

                case 2:
                    this.xunhuanIcon = 'icon-suiji'
                    this.mode = '随机'
                    break;
            }
        },
        tobig() {
            this.$store.commit('setTarget', false)
            // this.scrollObj && this.scrollObj.scrollToElement(this.$refs.li[this.currentLineNum], 0, false, true)
        },
        tosmall() {
            this.$store.commit('setTarget', true)
        },
        start() {
            this.endtime = this.$refs.audio.duration
        },
        // changeCurrentTime() {
        //     clearInterval(this.timer2)
        //     let audio = this.$refs.audio
        //     this.timer2 = setInterval(() => {
        //         this.currentTime = audio.currentTime
        //     }, 1000)
        // },
    },

    directives: {
        drag: {
            update: (el, binding) => {
                let left
                let disX
                let offsetWidth
                let ball = el.children[0].children[0]
                let min
                let max
                let progressWidth = document.body.offsetWidth
                let audio = document.querySelector('audio')
                // setInterval(() => {
                //     ball.style.left = `${audio.currentTime/audio.duration*(el.clientWidth-ball.clientWidth)}px`
                // }, 500)

                function touchstart(e) {
                    max = el.clientWidth - ball.clientWidth
                    min = 0
                    disX = e.touches[0].clientX
                    offsetWidth = (progressWidth - el.clientWidth) / 2
                    ball.style.left = `${disX - offsetWidth - ball.clientWidth/2}px`
                    left = parseInt(ball.style.left)
                    let a = left
                    let b = max
                    posiPlay(audio, a / b)
                    el.addEventListener('touchmove', touchmove)
                }

                function touchmove(e) {
                    let x = e.touches[0].clientX - disX
                    ball.style.left = `${left + e.touches[0].clientX - disX}px`
                    if (parseInt(ball.style.left) < min) {
                        ball.style.left = `${min}px`
                    }
                    if (parseInt(ball.style.left) > max) {
                        ball.style.left = `${max}px`
                    }
                    let a = parseInt(ball.style.left)
                    let b = max
                    posiPlay(audio, a / b)

                }

                function posiPlay(audio, pre) {
                    audio.currentTime = audio.duration * pre
                }

                function touchend() {
                    el.addEventListener('touchend', touchend)
                    el.removeEventListener('touchmove', touchmove)
                    el.removeEventListener('touchend', touchend)
                }

                el.addEventListener('touchstart', touchstart)
            }
        }
    },

    watch: {
        audioData(newval) {
            if (newval) {
                this.play(true)
            }
        },
    },

    components: {
        swiper,
        swiperSlide
    },

    created() {
        this.next = this.throttle(this.next, 1000)
        this.pre = this.throttle(this.pre, 1000)
    },

    filters: {
        timeFormat(t) {
            if(!t) return '00:00'
            let time = parseInt(t)
            let m = parseInt(time / 60)
            let s = time % 60
            m = m >= 10 ? m : '0' + m
            s = s >= 10 ? s : '0' + s
            return `${m}:${s}`
        }
    },
}
</script>
<style lang="scss" scoped>
@import '../dist/scss/tool.scss';
.wrap {
    position: relative;
    width: size(375);
    background: linear-gradient(180deg, rgb(112, 228, 35), rgb(233, 109, 27));
    .smallplayer {
        width: 100%;
        height: size(75.199); // height: size(667);
        background-color: rgba(0, 0, 0, .9);
        display: flex;
        align-items: center;
        .left {
            flex: 5.5;
            height: 100%;
            a {
                padding-left: size(4);
                display: flex;
                align-items: center;
                height: 100%;
                width: 100%;
                img {
                    width: size(67.55);
                    height: size(67.55);
                    border-radius: 5px;
                }
                .info {
                    padding-left: size(10);
                    display: flex;
                    flex-direction: column;
                    .name {
                        color: #fff;
                    }
                    .singer {
                        color: #888;
                    }
                }
            }
        }
        .right {
            flex: 4.5;
            height: 100%;
            display: flex;
            justify-content: space-around;
            align-items: center;
            span {
                font-size: size(26);
                color: #fff;
            }
        }
    }
    .bigplayer {
        position: relative;
        width: size(375);
        height: 100%;
        .wrap {
            width: 100%;
            height: 100%; // position: absolute;
            .nav {
                width: 100%;
                height: size(50);
                top: size(40);
                background-color: rgba(102, 51, 153, 0);
                position: absolute;
                z-index: 2;
                display: flex;
                color: #fff;
                p {
                    font-size: size(18);
                    text-align: center;
                    line-height: size(50);
                    padding-left: size(50);
                    height: 100%;
                    flex: 9;
                }
                span {
                    font-size: size(18);
                    text-align: center;
                    line-height: size(50);
                    height: 100%;
                    flex: 2;
                }
            }
            .bgimg {
                position: absolute;
                width: 100%;
                height: 100%;
                filter: blur(5px);
                z-index: 0;
            }
            .contain {
                background: linear-gradient(rgb(1, 77, 103), rgb(251, 178, 23));
                position: relative;
                padding-top: size(120);
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                color: blanchedalmond;
                flex-direction: column;
                position: absolute;
                width: 100%;
                height: 100%;
                .imgAndlyric {
                    display: flex;
                    position: relative;
                    width: 100%;
                    height: size(300);
                    .swwrap {
                        .slide {
                            .lyric::-webkit-scrollbar {
                                display: none;
                            }
                            .lyric {
                                position: relative;
                                width: size(375);
                                height: size(300);
                                overflow: scroll;
                                .content {
                                    // position: absolute;
                                    top: 0 !important;
                                    display: flex;
                                    flex-direction: column;
                                    align-items: center;
                                    li {
                                        line-height: size(40);
                                        font-size: size(18);
                                        color: white;
                                    }
                                    .current {
                                        color: rgb(179, 214, 110);
                                    }
                                }
                            }
                        }
                        .img {
                            position: absolute;
                            overflow: hidden;
                            z-index: 99;
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            background-color: rgba(10, 20, 20, 0);
                            img {
                                width: size(192.84);
                                height: size(192.84);
                                border-radius: 50%;
                                box-shadow: 0px 0px 20px rgb(0, 0, 0);
                            }
                        }
                    }
                }
                .xuanzhuan {
                    animation: xuanzhuan 12s linear infinite;
                    @keyframes xuanzhuan {
                        0% {
                            transform: rotate(0deg)
                        }
                        100% {
                            transform: rotate(360deg)
                        }
                    }
                }
                .control {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    .progress {
                        width: size(375);
                        height: size(48.13);
                        display: flex;
                        justify-content: center;
                        .parogressbar {
                            width: 100%;
                            display: flex;
                            justify-content: space-evenly;
                            align-items: center;
                            .currenttime {
                                // width: size(30);
                                // height: size(21);
                            }
                            .timewrap {
                                height: 100%;
                                display: flex;
                                align-items: center;
                                .time {
                                    display: flex;
                                    align-items: center;
                                    position: relative;
                                    border: 0px groove black(177, 12, 12);
                                    background-color: rgb(254, 254, 254);
                                    width: size(250);
                                    height: 3.22px;
                                    border-radius: 20px;
                                    .ball {
                                        position: absolute;
                                        width: size(14);
                                        height: size(14);
                                        background-color: orangered;
                                        border-radius: 50%;
                                        z-index: 99;
                                    }
                                    .hctime {
                                        position: absolute;
                                        width: size(200);
                                        height: 100%; // background-color: sienna;
                                    }
                                    .currenttimebar {
                                        background-color: rgb(233, 109, 27);
                                        position: absolute; // width: size(100);
                                        height: 100%;
                                    }
                                }
                            }
                        }
                    }
                    .playControl {
                        z-index: 99; // background-color: brown;
                        width: size(375);
                        height: size(57.84);
                        display: flex;
                        justify-content: space-evenly;
                        align-items: center;
                        .iconfont {
                            font-size: size(30)
                        }
                    }
                }
            }
        }
    }
    .target {
        visibility: hidden;
    }
}
</style>
