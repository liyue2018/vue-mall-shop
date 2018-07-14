/*
* @Author: liyue2018
* @Date:   2018-07-02 19:06:13
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-07-14 15:50:15
*/

// 使用 vuex

import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')
var keywords = localStorage.getItem('keywords') || ''

// var user = {};

var store = new Vuex.Store({
    state: {
        car: car,
        keywords: keywords
        // searchResultList: []
    },
    mutations: {
    
        addToCar(state, goodsinfo) {
            var flag = false;

            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count);
                    flag = true;
                    return true;
                }
            })

            if (!flag) {
                state.car.push(goodsinfo);
            }

            // 存储至本地
            localStorage.setItem('car', JSON.stringify(state.car));
        },

        updateCarNum(state, goodsinfo) {

            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count = goodsinfo.count;
                    return true;
                }
            })

            // 存储至本地
            localStorage.setItem('car', JSON.stringify(state.car));
        },

        removeFormCar(state, id) {
            state.car.some((item,i) => {
                if (item.id == id) {
                    state.car.splice(i,1);
                    return true;
                }
            });
            // 存储至本地
            localStorage.setItem('car', JSON.stringify(state.car));
        },

        updateSelected(state, goodsSelected) {
            state.car.some(item => {
                if (item.id == goodsSelected.id) {
                    item.selected = goodsSelected.selected;
                    return true;
                }
            });

            localStorage.setItem('car', JSON.stringify(state.car));
        },
        // 得到搜索页面地址栏中的关键字

        getSearchKeywords (state, keywords) {
            state.keywords = keywords
        }
    },
    getters: {
        // 只负责对外提供数据，不负责修改数据 类似于过滤器，计算属性，对元素进行包装

       getAllCount(state) {
            var c = 0; 
            state.car.forEach(item => {
                c += item.count;
            })
            return c;
       },

       getGoodsCount(state) {
        var o = {};
        state.car.forEach(item => {
            o[item.id] = item.count;
        });
        return o;
       },

       // 购物车中所有商品的价格

       getGoodsTotalamount(state) {
        var totalAmount = 0;
            state.car.forEach(item => {
                totalAmount += item.productPrice * item.count
                // 保留两位小数
                totalAmount = Math.floor(totalAmount * 100) / 100
            });
            return totalAmount;
       },

       // 购物车中被选中的商品价格

       getTotal(state) {
            var selectedGoods = {
                count: 0,
                amount: 0
            };
            state.car.forEach(item => {
                if (item.selected) {
                    selectedGoods.count += item.count;
                    selectedGoods.amount += item.count * item.productPrice;
                    selectedGoods.amount = Math.floor(selectedGoods.amount * 100) / 100
                    return true;
                }
            })
            return selectedGoods;
        },
        // 导出选中的商品

        getSelectedGoods(state) {
            var s = [];
            state.car.forEach(item => {
                if (item.selected) {
                    s.push(item);
                    return true;
                }
            });
            return s;
        },

        // keywords 在刷新页面后，被赋值为本地存储中最近的值

        // setKeywords (state) {
        //     state.keywords = localStorage.getItem('keywords')
        // }

    }
});

export default store;