/*
* @Author: liyue2018
* @Date:   2018-07-12 16:29:30
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-07-20 07:42:43
*/
const Mock = require('mockjs');
var Random = Mock.Random;

var config = {
        DATA_IMG_TEXT: "随机生成的banner图片，有点丑啊",
        BANNER_COUNT: 4,
        BANNER_IMG_SIZE: "1220x460",
        NAV_IMG_SIZE: "305x198",
        NAV_COUNT: 4,
        NAV_URL: "http"
    }

// banner轮播图
const bannerImgData = function (opt) {

    let bannerList = [],
        i;

    for (i = 0; i < config.BANNER_COUNT; i++) {

        let newBannerImgObject = {
            id: Random.id(),
            img: Random.dataImage(config.BANNER_IMG_SIZE, config.DATA_IMG_TEXT)
        }
        bannerList.push(newBannerImgObject);
    }
    return {
        data: bannerList
    }
}

// nav导航图片
const navImgData = function (opt) {

    let navList = [],
        j;

    for (j = 0; j < config.NAV_COUNT; j++) {
        var newNavImgObject = {
            id: Random.id(),
            img: Random.dataImage(config.NAV_IMG_SIZE, config.DATA_IMG_TEXT),
            url: Random.url(config.NAV_URL)
        }
        navList.push(newNavImgObject);
    } 

    return {
        data: navList
    }
}

Mock.mock('/bannerImg', /get|post/i, bannerImgData);
Mock.mock('/navImg', /get|post/i, navImgData);