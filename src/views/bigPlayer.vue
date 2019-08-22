<template>
<div class="wrap">
    <img :src="audioData.imgUrl" alt="" class="bgimg">
    <div class="contain">
        <img :src="audioData.imgUrl" alt="">
        <div class="control">
            <div class="progress">
                <div class="parogressbar">
                    <span class="currenttime">{{'00:00'}}</span>
                    <div class="timewrap" v-drag>
                        <div class="time" ref="time">
                            <div class="ball"></div>
                            <div class="hctime"></div>
                            <div class="currenttimebar"></div>
                        </div>
                    </div>
                    <span class="endtime">{{'03:30'}}</span>
                </div>
            </div>
            <div class="playControl"></div>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            currenttiem:'',
            endtime:'',
            hctime:''
        }
    },
    methods:{
        init(){
            let audio = this.audioEl
            this.currenttiem = audio.currentTime
            this.endtime = audio.duration
            this.hctime = auido.buffered
        },
    },
    computed: {
        audioData() {
            return this.$store.state.audioData
        },
        wrapStyle() {
            let imgUrl = this.$store.state.audioData.imgUrl
            console.log(imgUrl);
            return {
                'background': `url(${imgUrl}) no-repeat`,
            }
        },
        audioEl(){
            return this.$root.$children[0].$refs.player.$refs.audio.currentTime
        }
    },
    watch: {
        audioData(newval) {
            if (newval) {
                this.$store.commit('setTitle', newval.songName)
            }
        },
        audioEl(newval){
            console.log(newval);
        }
    },
    created() {
        this.$store.commit('setTitle', this.audioData.songName)
        // this.init()
        // console.log(this.hctime);
        console.log(this.audioEl);
    },
    directives: {
        drag(el, binding) {
            let left
            let disX
            let offsetWidth
            let ball = el.children[0].children[0]
            // let min = 0
            // let max = el.clientWidth - ball.clientWidth
            let progressWidth = document.body.offsetWidth

            function touchstart(e) {
                disX = e.touches[0].clientX
                offsetWidth = (progressWidth - el.clientWidth) / 2
                ball.style.left = `${disX - offsetWidth - (ball.clientWidth / 2)}px`
                left = parseInt(ball.style.left)
                el.addEventListener('touchmove', touchmove)
            }

            function touchmove(e) {
                let max = el.clientWidth - ball.clientWidth
                let min = 0
                let x = e.touches[0].clientX - disX
                ball.style.left = `${left + e.touches[0].clientX - disX}px`
                if (parseInt(ball.style.left) < min) {
                    ball.style.left = `${min}px`
                }
                if (parseInt(ball.style.left) > max) {
                    ball.style.left = `${max}px`
                }
                el.addEventListener('touchend', touchend)
            }

            function touchend() {
                el.removeEventListener('touchmove', touchmove)
                el.removeEventListener('touchend', touchend)
            }
            el.addEventListener('touchstart', touchstart)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../dist/scss/tool.scss';
.wrap {
    width: size(375);
    height: size(667);
    position: absolute;
    margin-top: size(-112.488);
    .bgimg {
        position: absolute;
        z-index: 2;
        width: 100%;
        height: 100%;
        filter: blur(5px);
    }
    .contain {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        flex-direction: column; // padding-top: size(112.488);
        color: blanchedalmond;
        position: absolute;
        background-color: rgba(0, 0, 0, 0.8);
        width: 100%;
        height: 100%;
        z-index: 20;
        img {
            width: size(192.84);
            height: size(192.84);
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
                    display: flex;
                    justify-content: space-around;
                    align-items: center;
                    .timewrap {
                        height: 100%;
                        display: flex;
                        align-items: center;
                        .time {
                            display: flex;
                            align-items: center;
                            position: relative;
                            background-color: chartreuse;
                            width: size(267.94);
                            height: 3.22px;
                            z-index: 999;
                            .ball {
                                position: absolute;
                                width: size(14);
                                height: size(14);
                                background-color: orangered;
                                border-radius: 50%;
                                z-index: 99;
                            }
                            .hctime {
                                background-color: crimson;
                                position: absolute;
                                width: size(200);
                                height: 100%;
                            }
                            .currenttimebar {
                                background-color: tomato;
                                position: absolute;
                                width: size(100);
                                height: 100%;
                            }
                        }
                    }
                }
            }
            .playControl {
                background-color: brown;
                width: size(375);
                height: size(57.84);
            }
        }
    }
}
</style>