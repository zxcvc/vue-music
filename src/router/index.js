import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export default new Router({
  mode: 'history',
  linkActiveClass: 'is-selected',
  base:'music',
  routes: [{
      path: '/',
      redirect: '/home/newSong'
    },
    {
      name: 'home',
      path: '/home',
      component: () => import('../components/home.vue'),
      children: [{
          name: 'newSong',
          path: 'newSong',
          component: () => import('../views/newSong.vue'),
        },
        {
          name: 'polist',
          path: 'polist',
          component: () => import('../views/polist.vue')
        },
        {
          name: 'rank',
          path: 'rank',
          component: () => import('../views/rank.vue')
        },
        {
          name: 'singer',
          path: 'singer',
          component: () => import('../views/singer.vue')
        },

      ]
    },
    {
      name: 'detail',
      path: '/detail',
      component: () => import('../components/detail.vue'),
      children: [{
          name: 'search',
          path: 'search',
          component: () => import('../views/search.vue'),
          children:[
            {
              name:'hotSearch',
              path:'hotSearch',
              component:()=>import('../components/hotSearch.vue')
            },
            {
              name:'searchList',
              path:'searchList',
              component:()=>import('../components/searchList.vue')
            }
          ]
        },
        {
          name: 'rankItem',
          path: 'rankItem',
          component: () => import('../views/rankItem.vue')
        },
        {
          name: 'polistItem',
          path: 'polistItem',
          component: () => import('../views/polistItem.vue')
        },
        {
          name: 'singersList',
          path: 'singersList',
          component: () => import('../views/singersList.vue')
        },
        {
          name: 'singerItem',
          path: 'singerItem',
          component: () => import('../views/singerItem.vue')
        },
        // {
        //   name:'bigPlayer',
        //   path:'bigPlayer',
        //   component:()=>import('../views/bigPlayer.vue')
        // }
      ],
    },
  ]
})
