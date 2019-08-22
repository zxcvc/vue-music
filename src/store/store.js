import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    songsList: [],
    hash: null,
    souce: null,
    audioData: {},
    title: '',
    target: true,
    isplay: false,
    lyric: null,
  },
  getters: {},
  mutations: {
    setList(state, data) {
      state.songsList = data
    },
    setHash(state, data) {
      state.hash = data
    },
    setAudioData(state, data) {
      state.audioData = data
    },
    setTitle(state, data) {
      state.title = data
    },
    setTarget(state, data) {
      state.target = data
    },
    setIsplay(state, data) {
      state.isplay = data
    },
    setLyric(state, data) {
      state.lyric = data
    }
  },
  actions: {
    async setSonginfo(context, hash) {
      //获取歌曲信息
      let ret = await axios.get('/api/app/i/getSongInfo.php', {
        params: {
          cmd: 'playInfo',
          hash: hash
        }
      })
      let data = ret.data
      //获取歌词信息
      let ret2 = await axios.get('/api/app/i/krc.php', {
        params: {
          cmd: 100,
          keyword: data.fileName,
          hash: hash,
          timelength: data.timeLength * 1000,
          d: Math.random()
        }
      })
      let lyric = ret2.data

      data.imgUrl = data.imgUrl.replace(/\{size\}/, 200)
      context.commit('setAudioData', data)
      context.commit('setLyric', lyric)
    }
  }
})

export default store
