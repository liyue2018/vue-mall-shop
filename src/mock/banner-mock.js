/*
* @Author: liyue2018
* @Date:   2018-07-12 16:29:30
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-07-12 18:02:28
*/
const Mock = require('mockjs')

var Random = Mock.Random 

// banner轮播图

const bannerImgData = function (opt) {
    // console.log('opt', opt)
    let bannerList = []
    for (let i = 0; i < 4; i++) {
        var newBannerImgObject = {
            'id': Random.id(),
            'img': Random.dataImage('1220x460', '随机生成的banner图片，有点丑啊')
        }
        bannerList.push(newBannerImgObject)
    }
    return {
        data: bannerList
    }
}

// nav导航图片

const navImgData = function (opt) {
    // console.log('opt', opt) 
    let navList = []
    for (let i = 0; i < 4; i++) {
        var newNavImgObject = {
            'id': Random.id(),
            'img': Random.dataImage('305x198', '丑丑的图片'),
            "url": Random.url('http')
        }
        navList.push(newNavImgObject)
    } 
    return {
        data: navList
    }
}



Mock.mock('/bannerImg', /get|post/i, bannerImgData)
Mock.mock('/navImg', /get|post/i, navImgData)