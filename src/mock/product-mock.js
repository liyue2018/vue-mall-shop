/*
* @Author: liyue2018
* @Date:   2018-07-12 15:39:48
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-07-16 23:55:27
*/

const Mock = require('mockjs')

Mock.setup({
    timeout: '10-100'
})

var Random = Mock.Random

// 创建商品

const productData = function (opt) {
    // console.log('opt', opt)
    let products = []
    for (let i = 0; i < 80; i++) {
        let newProductObject = {
            'id': Random.id(),
            'productName': Random.ctitle(8),
            'productTitle': Random.csentence(),
            'productPrice': Random.float(9, 5000, 2, 2),
            'productImgUrl': Random.dataImage('206x206', '商品图片'),
            'productDetailImg': Random.dataImage('1120x2000', '商品详情图片很大商品详情图片很大商品详情图片很大商品详情图片很大商品详情图片很大')
        }
        products.push(newProductObject)
    }
    return {
        data: products
    }
}

Mock.mock('/products', /get|post/i, productData)