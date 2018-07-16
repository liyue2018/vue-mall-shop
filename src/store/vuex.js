/*
* @Author: liyue2018
* @Date:   2018-07-02 19:06:13
* @Last Modified by:   liyue2018
* @Last Modified time: 2018-07-16 18:55:51
*/

// 使用 vuex

import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)

var date = new Date();
date = date.getTime();//得到时间的13位毫秒数

var car = JSON.parse(localStorage.getItem('car') || '[]')
var keywords = localStorage.getItem('keywords') || ''
var address = JSON.parse (localStorage.getItem ('address') || '[]')


// var user = {};

var store = new Vuex.Store({
    state: {
        car: car,
        keywords: keywords,
        address: address
    },
    mutations: {
        // 加入购物车的商品信息
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
        // 当购物车中的数据改变
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
        // 删除购物车中的商品信息
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
        // 改变购物车中的选择状态时
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
        },
        // 获取地址信息
        getAddressList (state, addressList) {
            state.address = addressList
            localStorage.setItem ('address', JSON.stringify (state.address))
        },

        // 删除仓库中的地址信息
        delAddress (state, id) {
            state.address.some ((item, i) => {
                if (item.id === id) {
                    state.address.splice (i,1)
                    return true
                }
            })
        },
        // 设置为默认地址
        setDefaultAddress (state, address) {
            state.address.forEach ((item, i) => {
                if (item.checked === true) {
                    item.checked = false
                }
                if (item.id === address.id) {
                    address.checked = true 
                    state.address.splice (i, 1)
                    state.address.unshift(address)
                }
            })
            // 更改后 存储到本地
            localStorage.setItem ('address', JSON.stringify (state.address))
        },

        // 编辑地址信息
        modifyAddress (state, address) {
            if (address.checked === true) {
                state.address.forEach ((item, i) => {
                    if (item.checked === true) {
                        item.checked = false
                    }
                })
                state.address.some ((item, i) => {
                    if (item.id === address.id) {
                        state.address.splice (i, 1)
                        state.address.unshift(address)
                    }
                })
            }
            localStorage.setItem ('address', JSON.stringify (state.address))
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
       // 计算购物车中商品的数量
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
        // 若购物车中每个商品都是选中状态 
        goodsPerSelected (state) {
            var select = ''
            state.car.some (item => {
                if (item.selected === false) {
                    select = false
                    return true
                } else {
                    select = true
                }
            })

            return select
        },
        // 检查所有checked为true的地址信息 只允许第一个为真
        addressChecked (state) {
            state.address.forEach ((item, i) => {
                if (item.checked === true) {
                    item.checked = false
                }
            })
            if (state.address[0]) {
                state.address[0].checked = true
            }
            localStorage.setItem ('address', JSON.stringify (state.address))
        }
    }
});

export default store;