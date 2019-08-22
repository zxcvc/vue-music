<template>
<div>
    <div class="topfix" v-show="target">
        <top></top>
    </div>
    <router-view v-show="target"></router-view>
    <div :class="['bottomfix',{'hidden':hidden},{'small':target},{'big':!target}]">
        <player class="player" v-show="audioData.url"></player>
    </div>
</div>
</template>

<script>
import top from './components/top.vue'
export default {
    data() {
        return {
            hidden: true
        }
    },
    computed: {
        audioData() {
            return this.$store.state.audioData
        },
        target(){
            return this.$store.state.target
        }
    },
    watch: {
        audioData(newval){
            if(newval){
                this.hidden = false
            }else{
                this.hidden = true
            }
        }
    },
    components: { top }
}
</script>

<style lang="scss">
@import './dist/scss/tool.scss';
.topfix {
    width: size(375);
    position: fixed !important;
    top: 0 !important;
    z-index: 999;
}
.bottomfix.small {
    position: relative;
    margin-top: size(75.199);
    .player {
        position: fixed;
        bottom: 0;
        z-index: 999;
    }
}
.bottomfix.big{
    .player{
        position: absolute;
        top: 0;
        bottom: 0;
    }
}
.hidden {
    display: none;
}
</style>