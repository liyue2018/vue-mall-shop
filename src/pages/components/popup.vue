<template>
    <div class="popup">
        <div class="mask">
            <div class="content">
                <div class="topbar">
                    <div class="dialog-tit">
                        <h4>{{ title }}</h4>
                    </div>
                    <a class="close" @click.prevent='popupClose'>
                        <span class="iconfont icon-close"></span>
                    </a>
                </div>
                <div class="pcontent">
                    <p v-show="isResive === -1">{{addressInfo}}</p>
                    <div class="informs" @change="inputValueChange">
                        <div class="name">
                            <input type="text" placeholder="收货人姓名" name="username" v-model="username">
                        </div>
                        <div class="address">
                            <input type="text" placeholder="收货地址" name="address" v-model="detailAddress">
                        </div>
                        <div class="tel">
                            <input type="number" placeholder="手机号码" name="tel" v-model="tel">
                        </div>
                        <p class="checkbox">
                            <input type="checkbox" v-model="checked">
                            <span>设为默认值</span>
                        </p>
                        <button type="button" class="save-btn" :disabled="disabled" :class="{'disabled-btn': isDisabled}" @click="getNewAddress">保存</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                username: '',
                tel: '',
                detailAddress: '',
                addressList: [],
                checked: false,
                isDisabled: true,
                disabled: true,
            }
        },
        created() {
            this.modifyOrAdd()

        },
        methods: {
            // 判断是修改还是增加
            modifyOrAdd() {

                if (this.isResive === -1) {
                    this.username = this.addressInfo.username;
                    this.tel = this.addressInfo.tel; 
                    this.detailAddress = this.addressInfo.detailAddress;
                    this.checked = this.addressInfo.checked;
                }
            },
            popupClose() {

                // 执行父组件传过来的函数 将弹窗状态传给父组件
                var popup = false;
                this.$emit ('getPopupState', popup);
                this.$emit ('getResive', popup);
            },
            getNewAddress() {

                // 如果是修改地址 
                if (this.isResive === -1) {

                    var addAddress = {
                        id: this.addressInfo.id, 
                        username: this.username, 
                        tel: this.tel, 
                        detailAddress: this.detailAddress, 
                        checked: this.checked 
                    }

                    this.$store.commit ('modifyAddress', addAddress);
                    this.popupClose ();
                } else {
                    var date = new Date();
                    date = date.getTime(); // 得到时间的13位毫秒数
                    var addAddress = { 
                        id: date, 
                        username: this.username, 
                        tel: this.tel, 
                        detailAddress: this.detailAddress, 
                        checked: this.checked 
                    }

                    this.addressList = JSON.parse(localStorage.getItem('address') || '[]');

                    if (addAddress.checked === true) {
                        this.addressList.unshift(addAddress);
                    } else {
                        this.addressList.push(addAddress);
                    }

                    // 将该新增地址保存至本地存储
                    localStorage.setItem ('address', JSON.stringify(this.addressList));

                    // 把地址列表推到仓库
                    this.$store.commit ('getAddressList', this.addressList);

                    // 重置输入框
                    this.username = this.detailAddress = this.tel = '';

                    // 重新把按钮设置为不可点击状态
                    this.isDisabled = this.disabled = true 
                }
            },

            // 表单都不为空时，可以保存
            inputValueChange() {
                if (this.username != '' && this.detailAddress != '') {
                    this.isDisabled = this.disabled = false; 
                } 
            }
        },
        props: ['title','addressInfo','isResive']
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .popup {
        position: fixed; 
        top: 0; 
        left: 0; 
        bottom: 0; 
        right: 0; 
        z-index: 6;
        .mask {
            background: rgba(0,0,0,.2);
            padding-top: 1px;
            height: 100%; 
            width: 100%;
            .content {
                width: 30%; 
                background: #fff; 
                box-shadow: 0 1px 6px 2px rgba(0, 0, 0, 0.1);
                margin: 30px auto;
                border-radius: 6px;
                .topbar {
                    background: #f5f5f5; 
                    border-bottom: 1px solid #dcdcdc; 
                    border-radius: 6px 6px 0 0;
                    height: 60px; 
                    line-height: 60px; 
                    position: relative; 
                    font-size: 18px;
                    text-align: center;
                    .close {
                        position: absolute; 
                        right: 10px; 
                        top: 10px;
                        width: 30px;
                        height: 30px;
                        line-height: 30px;
                        border: 1px solid #ddd;
                        border-radius: 50%;
                        cursor: pointer;
                        .icon-close {
                            font-weight: 900;
                            opacity: 0.7; 
                            &:hover {
                                opacity: 1;
                            }
                        }
                    }
                }
                .pcontent {
                    padding: 30px 10px;
                    .informs > div {
                        margin-bottom: 20px;
                        input {
                            width: 100%; 
                            height: 50px; 
                            line-height: 50px; 
                            border-radius: 5px; 
                            padding-left: 10px;
                            font-size: 14px;
                            box-shadow: 0 -1px 3px 1px rgba(0,0,0,.08);
                            &::-webkit-input-placeholder {
                                color: #ddd;
                                font-weight: 500;
                            }
                            &::-moz-placeholder {
                                color: #ddd;
                                font-weight: 500;
                            }
                        }
                        .checkbox {
                            input[type="checkbox"] {
                                display: inline-block;
                                width: 20px; 
                                height: 20px; 
                            }
                        }

                        .tel {
                            input::-webkit-outer-spin-button,
                            input::-webkit-inner-spin-button {
                                -webkit-appearance: none;
                            }
                            input[type="number"]{
                                -moz-appearance: textfield;
                            }
                        }
                    }
                    button.save-btn {
                            width: 100%; 
                            padding: 12px 0; 
                            border-radius: 5px;
                            font-size: 14px;
                            margin-top: 20px;
                            border: 1px solid #afafaf;
                            background-color: #678ee7;
                            background-image: linear-gradient(180deg,#678ee7,#5078df);
                            color: #fff;
                        }
                    .disabled-btn { 
                        background: #a9a9a9;
                        border: 1px solid #afafaf;
                        background-image: linear-gradient(180deg,#b8b8b8,#a9a9a9);
                        cursor: not-allowed;
                        opacity: 0.5;
                    }
                }

            }
        }
    }
</style>