<template>
    <div>
        <panel :title="addressListTit">
            <div slot="r">
                <input type="button" name="" value="添加收货地址" readonly="readonly" class="add-address-btn" @click="isPopup = !isPopup">
            </div>
            <div slot="content" class="addressList-content">
                <ul class="table-title">
                    <li>姓名</li>
                    <li>详细地址</li>
                    <li>电话</li>
                </ul>
                <div class="lists">
                    <transition-group mode="out-in" tag="div" appear>
                        <div class="item" v-for="item in addressList" :key="item.id">
                            <div class="username">
                                <span>{{ item.username }}</span>
                            </div>
                            <div class="address">
                                <span>{{ item.detailAddress }}</span>
                            </div>
                            <div class="tel">
                                <span>{{ item.tel }}</span>
                                <i v-if="item.checked" class="set-default">（默认地址）</i>
                                <a href="#" @click.prevent="changeChecked(item)" v-if="!item.checked" ref="default" class="set-default">设为默认地址</a>
                            </div>
                            <div class="buttons">
                                <span class="iconfont icon-edit"></span>
                                <span class="iconfont icon-delete" @click.prevent="del(item.id)"></span>
                            </div>
                        </div>
                    </transition-group>


                </div>
                <div class="no-address" v-if="len ? 0:1">
                    <h3>你还未添加收货地址</h3>
                    <p>
                        <input type="button" name="" value="添加收货地址" readonly="readonly" class="address-btn" @click="isPopup = !isPopup">
                    </p>
                </div>
            </div>
        </panel>
        <popup v-if="isPopup" @func="getLocalAddress"></popup>
    </div>
</template>

<script>

    import popup from '../../components/popup.vue';
    import panel from '../../components/panel.vue'
    export default {
        data: function() {
            return {
                isPopup: false,
                addressList: [],
                len: 0,
                isShow: true,
                addressListTit: '收货地址',
                setDefault: false,
                first:'',
                count: 1
            }
        },
        created() {
            this.getLocalAddress();
            // this.checked();
        },
        mounted() {
            // this.changeChecked();
            // this.checked();
        },
        methods: {
            // getAddressData() {
            //     this.$http.get('../../../static/js/addressData.json').then(res => {
            //         this.addressList = res.body;
            //     }, err => {
            //         console.log(err)
            //     });
                 
            // },
            getLocalAddress() {
                // 从本地请求地址数据
                this.addressList = JSON.parse(localStorage.getItem('address') || '[]');

                this.len = this.addressList.length;
            },
            del(id) {
                this.addressList.some((item,i) => {
                    if (item.id == id) {
                        this.addressList.splice(i,1);
                        return true;
                    }
                })
                localStorage.setItem('address',JSON.stringify(this.addressList));

                this.len = this.addressList.length;
                
                if (this.len > 0) {
                    this.isShow = 1;
                } else {
                    this.isShow = 0;
                }
            },
            changeChecked(newaddress) {
                var date = new Date();
                date = date.getTime();//得到时间的13位毫秒数
                
                var addAddress = { id: date, username: newaddress.username, tel: newaddress.tel, detailAddress: newaddress.detailAddress, checked: true }
                this.del(newaddress.id);

                // this.addressList.some((item,i) => {
                //     if (item.id == newaddress.id) {
                //         this.addressList.splice(i,1);
                //         return true;
                //     }
                // });
                this.addressList.unshift(addAddress);
                this.checked();
                localStorage.setItem('address',JSON.stringify(this.addressList));
            },

            // 默认值检查
            checked() {
                this.addressList[0].checked = true;
                 // 只能设置一个默认地址
                for(var i = 1; i < this.len; i++) {
                    this.addressList[i].checked = false;
                }
            }
        },
        components: {
            popup,
            panel
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    .add-address-btn {
        position: absolute; 
        right: 10px;
        top: 14px;
        padding: 6px 12px;
        border-radius: 4px;
        &:hover {
            background: #f3f3f3;
        }
    }
    .addressList-content {
        img {
            width: 200px; 
            height: 200px; 
            margin: 0 auto;
        }
        .tips {
            font-size: 22px; 
            color: #999; 
            margin-top: 20px;
        }

        .table-title {
            height: 38px; 
            line-height: 38px;
            width: 100%;
            background: #eee;
            border: 1px solid #dbdbdb;
            border-width: 0 1px 1px 1px;
            padding-left: 20px;
            li {
                width: 33%; 
                display: inline-block; 
                padding-left: 20px;
            }
        }

        .lists {
            // 路由动画

            .v-enter, 
            .v-leave-to {
                opacity: 0; 
                transform: translateX(40px);
            }

            .v-move {
                transition: all 0.1s ease;
            }

            .v-enter-active, 
            .v-leave-active {
                transition: all 0.5s ease;
            }
            .item {
                height: 80px; 
                line-height: 80px;
                padding-left: 20px; 
                border-bottom: 1px solid #eee;
                position: relative;
                .username, .address, .tel {
                    width: 33%; 
                    display: inline-block;
                    padding-left: 20px;
                    .set-default {
                        display: inline-block; 
                        padding-left: 30px;
                    }
                }

                .buttons {
                    position: absolute; 
                    right: 20px;
                    bottom: 0;
                    span {
                        font-weight: 500; 
                        padding-right: 10px;
                    }
                    span.icon-edit {
                        color: #20a0ff;
                    }
                    span.icon-delete {
                        color: #666;
                    }
                }

                &:hover {
                    background: #f5f5f5;
                    transition: all 0.5s ease;
                }

            }
        }

        .no-address {
            height: 200px; 
            padding: 60px 0; 
            text-align: center; 
            font-size: 18px;
            .address-btn {
                padding: 6px 12px;
                border-radius: 4px;
                margin-top: 20px;
                &:hover {
                    background: #f3f3f3;
                }
            }
        }
    }
</style>