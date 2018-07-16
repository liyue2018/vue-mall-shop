<template>
    <div>
        <panel :title="addressListTit">
            <div slot="r">
                <input type="button" name="" value="添加收货地址" readonly="readonly" class="add-address-btn" @click="addNewAddress">
            </div>
            <div slot="content" class="addressList-content">
                <ul class="table-title">
                    <li>姓名</li>
                    <li>详细地址</li>
                    <li>电话</li>
                </ul>
                <div class="lists">
                    <div class="item" v-for="item in ($store.state.address)" :key="item.id">
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
                            <a class="iconfont icon-edit" @click.prevent='revise' @click='resiveInfo (item)'></a>
                            <a class="iconfont icon-delete" @click.prevent="del(item.id)"></a>
                        </div>
                    </div>
                </div>
                <div class="no-address" v-if="($store.state.address).length ? 0:1">
                    <h3>你还未添加收货地址</h3>
                    <p>
                        <input type="button" name="" value="添加收货地址" readonly="readonly" class="address-btn" @click="isPopup = !isPopup">
                    </p>
                </div>
            </div>
        </panel>
        <!-- <popup v-if="isPopup" @getPopupState="addNewAddress"></popup> -->
        <popup v-if="isPopup" @getPopupState="addNewAddress" @getResive="revise" :title="title" :addressInfo="addressinfo" :isResive="isResive"></popup>
    </div>
</template>

<script>

    import popup from '../../components/popup.vue';
    import panel from '../../components/panel.vue'
    export default {
        data: function() {
            return {
                isPopup: false,
                isShow: true,
                addressListTit: '收货地址',
                setDefault: false,
                first:'',
                count: 1,
                title: '',
                addressinfo: '',
                isResive: ''
            }
        },
        methods: {
            del(id) {
                // 删除仓库中的地址信息
                this.$store.commit ('delAddress', id)
            },
            // 添加新地址
            addNewAddress (popupState) {
                // 显示添加新地址弹窗
                this.title = '新增收货地址'
                this.isPopup = popupState
                this.isResive = 1
            },
            changeChecked(item) {
                this.$store.commit ('setDefaultAddress', item)
                this.$store.state.address = JSON.parse (localStorage.getItem ('address'))
            },
            // 修改地址
            revise(popupState) {
                this.title = '修改收货地址'
                this.isPopup = popupState
                this.isResive = -1
            },
            // 传递修改地址的信息
            resiveInfo (obj) {
                this.addressinfo = obj
            },
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
                    a {
                        display: inline-block;
                        font-weight: 500; 
                        padding-right: 10px;
                    }
                    a.icon-edit {
                        color: #20a0ff;
                    }
                    a.icon-delete {
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