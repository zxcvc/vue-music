<template>
<div class="wrap">
    <list></list>
    <!-- <component :is="player" class="com"> -->
    <!-- </component> -->
</div>
</template>
<script>

import list from './list'
export default {
    // props: ['data'],
    data() {
        return {
            player: ''
        }
    },
    methods: {
        go() {
            this.player = ''
            console.log(this.player);
            this.player = 'player'
            console.log(this.player);
        }
    },
    components: { list },
    computed: {
        data() {
            return this.$store.state.songsList
        },
        hash() {
            return this.$store.state.hash
        }
    },
    watch: {
        hash() {
            if (this.hash) {
                this.player = 'player'
            } else {
                this.player = ''
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../dist/scss/tool.scss';
.wrap {
    .com {
        position: fixed;
        bottom: 0;
    }
}

.player {}
</style>
