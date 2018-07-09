/*
* @Author: liyue2018
* @Date:   2018-07-02 19:06:13
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-07-04 23:46:45
*/

// 使用 vuex

import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]');

// var user = {};

var store = new Vuex.Store({
    state: {
        car: car
        // user: ''
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
        }

    }
});

export default store;