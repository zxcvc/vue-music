<template>
<div>
    <list></list>
</div>
</template>
<script>
export default {
    data() {
        return {
            page: 1,
            arr: []
        }
    },
    computed: {
        keyword() {
            return this.$route.query.keyword
        }
    },
    watch: {
        keyword() {
            this.getData(false)
        }
    },
    methods: {
        getData(isPush = false) {
            this.$ajax({
                url: 'http://mobilecdn.kugou.com/api/v3/search/song',
                type: "GET",
                dataType: "jsonp",
                data: {
                    format: 'jsonp',
                    keyword: this.$route.query.keyword,
                    page: this.page,
                    pagesize: 20,
                    showtype: 1
                },
                success: (data) => {
                    if(isPush){
                        this.arr.push(...data.data.info)
                    }else{
                        this.arr = data.data.info
                    }
                    this.$store.commit('setList', this.arr)
                }
            })
        },
        getMore() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            let clientHeight = document.documentElement.clientHeight || document.body.clientHeight
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
            if (scrollTop + clientHeight === scrollHeight) {
                this.page++
                    this.getData(true)
            }
        }
    },
    created() {
        this.getMore = this.throttle(this.debounce(this.getMore,400),2000)
        this.getData(false)
    },
    mounted() {
        window.addEventListener('scroll',this.getMore)
    },
    beforeDestroy(){
        window.removeEventListener('scroll',this.getMore)
    }

}
</script>
<style lang="scss" scoped>

</style>
