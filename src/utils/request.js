import Vue from 'Vue'
import axios from 'axios'
// import qs from 'qs'
import indexColumnData from '@/data/indexColumn.json'
import bannerData from '@/data/banner.json'
import stickListItemData from '@/data/stickListItem.json'
import listItemData from '@/data/listItem.json'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://data.toutiaojk.com/extend/list/'

// const ajaxURL = {
//     // 主页
//     classID: 'appclassid.php', // 栏目
//     Class: 'appclass.php', // 栏目列表
//     Stick: 'appistop.php', // 栏目置顶
//     // 详情页
//     Artilce: 'apparticle.php', // 文章
//     Recommend: 'apptuijian.php', // 文章推荐
//     // 搜索页
//     Search: 'search.php' // 搜索
// }

// export var request = async(type = 'POST', url = '', data = {}) => {
//     let result
//     type = type.toUpperCase()
//     // mock data for index column
//     if (url === 'classID') {
//         await mockRequest(url).then(res => {
//             result = res.data
//         })
//         return result
//     }

//     url = ajaxURL[url]

//     if (type === 'GET') {
//         await axios.get(url, { params: data })
//             .then(res => {
//                 result = res.data
//             })
//     } else if (type === 'POST') {
//         // TODO 为什么这里要用qs.stringify();
//         await axios.post(url, qs.stringify(data))
//             .then(res => {
//                 result = res.data
//             })
//     }
//     return result
// }

const mockData = {
    indexNav: indexColumnData,
    banner: bannerData,
    stickListItem: stickListItemData,
    listItem: listItemData

}

export var request = async(type) => {
    let result
    await new Promise((resolve, reject) => {
        let data
        data = mockData[type]

        setTimeout(function() {
            resolve(data)
        }, 2000)
    }).then(res => {
        if (res) {
            result = res.data
        }
    })

    return result
}
