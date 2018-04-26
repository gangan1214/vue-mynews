import cache from '@/utils/cache'
import { request } from '@/utils/request'

export default {
    // 分了不同模块的store, 所以这里设置namespaced：true
    namespaced: true,
    state: {
        indexActive: 'news_recommend',
        indexColumn: [{
            classname: '推荐',
            classid: 0,
            classpath: 'news_recommend'
        }],
        indexPage: { news_recommend: 1 },
        indexLocation: { news_recommend: 0 },
        currentContent: '',
        indexSwiper: false
    },
    getters: {
        activeMeta: state => {
            let index = state.indexColumn.findIndex(obj => obj.classpath === state.indexActive)
            let classid = state.indexColumn[index].classid
            let page = state.indexPage[state.indexActive]
            let localtion = state.indexLocation[state.indexActive]
            return { index, classid, page, localtion }
        }
    },
    mutations: {
        set_indexAction(state, val) {
            state.indexActive = val
            cache.setSession('index_Active', val)
        },
        set_indexPage(state, obj) {
            state.indexPage = obj
            cache.setSession('index_Page', obj)
        },
        set_indexLocation(state, obj) {
            state.indexLocation = obj
            cache.setSession('index_Location', obj)
        },
        set_indexColumn(state, arr) {
            state.indexColumn = arr
            cache.setSession('index_Column', arr)
        },
        set_currentContent(state, val) {
            state.currentContent = val
            cache.setSession(`${state.indexActive}_json`, val)
        },
        set_indexSwiper(state, val) {
            state.indexSwiper = val
        }
    },
    actions: {
        get_indexActive_cache({ commit, dispath }) {
            const data = cache.getSession('index_Active')
            if (data) {
                commit('set_indexActive', data)
            } else {
                commit('set_indexActive', 'news_recommend')
            }
        },
        get_indexPage_cache({ commit }, indexColumn) {
            const data = JSON.parse(cache.getSession('index_Page'))
            if (data) {
                commit('set_indexPage', data)
            } else {
                let pageObj = {}
                if (indexColumn) {
                    indexColumn.forEach(item => {
                        pageObj[item.classpath] = 1
                    })
                    commit('set_indexPage', pageObj)
                }
            }
        },

        // 获取列表数据缓存
        get_listItem_cache({ commit, state }, activeType) {
            let data = JSON.parse(cache.getSession(`${state.indexActive}_json`))
            return data
        },
        async get_indexColumn_data({ commit, state, dispatch }) {
            let res
            const data = JSON.parse(cache.getSession('index_Column'))
            if (data) {
                res = data
            } else {
                // let json = await request('post', 'classID')
                let json = await request('indexNav')
                res = [...state.indexColumn, ...json]
            }
            commit('set_indexColumn', res)
        },

        // 获取文章列表数据
        async get_listItem_data({ getters }, page) {
            // let params = {
            //     'classid': getters.activeMeta.classid,
            //     'page': page
            // }
            // let res = await request('post', 'Class', params)
            let res = await request('listItem')
            return res
        },

        // 获取置顶数据
        async get_stick_data({ commit, getters }) {
            // let params = {
            //     'classid': getters.activeMeta.classid,
            //     'type': 'stick'
            // }
            // let res = await request('post', 'Stick', params)
            let res = await request('stickListItem')
            console.log(res)
            return res
        },

        // 获取banner数据
        async get_banner_data({ commit, getters }) {
            // let params = {
            //     'classid': getters.activeMeta.classid,
            //     'type': 'banner'
            // }
            // let res = await request('post', 'Stick', params)
            let res = await request('banner')
            return res
        },

        // 获取频道数据
        async get_channel_data({ state }) {
            let res = await request('post', 'classID', { 'channel': 'channel' })
            return res
        }
    }
}
