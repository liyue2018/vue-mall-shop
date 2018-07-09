<template>
    <div class="login">
        <div class="login-box">
            <div class="login-title">
                <h1>
                    <span class="iconfont icon-RFQ-filling icon-logo"></span>
                </h1>
                <h3>使用 VueMall 账号 登录官网</h3>
            </div>
            <vue-form :state="formstate" @submit.prevent="onSubmit" class="login-form">
                <validate tag="label" class="form-control">
                    <input type="text" name="account" v-model="model.account" required placeholder="账号">
                    <field-messages name="account" class="prompt" show="$dirty && $touched">
                        <div style="color: #137d3b">
                            Success!
                        </div>
                        <div slot="required">
                            账户没填呢
                        </div>
                        <!-- <template slot="required" scope="state">
                            <span v-if="state.$touched || state.$submitted">账户没填呢</span>
                        </template> -->
                    </field-messages>
                </validate>

                <validate tag="label" class="form-control">
                    <input type="password" name="password" v-model="model.password" required placeholder="重复密码">
                    <field-messages name="password" class="prompt" show="$dirty && $touched">
                        <div style="color: #137d3b">
                            Success!
                        </div>
                        <div slot="required">
                            需要填写密码
                        </div>
                        <!-- <template slot="required" scope="state">
                            <span v-if="state.$touched || state.$submitted">需要填写密码</span>
                        </template> -->
                    </field-messages>
                </validate>
                <div class="login-info">
                    <input type="checkbox" name="" />
                    <span>记住密码</span>
                    <span class="tips">
                        <router-link to="/register">注册 VueMall 账号</router-link>
                        |
                        <a href="#">忘记密码？</a>
                    </span>
                </div>
                <div class="buttons">
                    <input type="submit" readonly="readonly" name="" value="登录" />
                    <input type="button" readonly="readonly" name="" value="返回" />
                </div>
            </vue-form>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                formstate: {},
                model: {
                    account: '',
                    password:''
                }
            }
        },
        methods: {
            onSubmit() {
                if (this.formstate.$invalid) {
                    return;
                }
            }
        }
    }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
    
    .login {
        min-height: 800px; 
        min-width: 630px; 
        background: url('/assets/images/bg_9b9dcb65ff.png') repeat;
        padding: 40px 0 60px;
    }

    .login-box {
        width: 452px; 
        height: 676px; 
        background: #fff; 
        background-image: linear-gradient(#fff,#eee);
        border: 1px solid #dadada; 
        border-radius: 5px;
        margin: 0 auto; 
        box-shadow: 1px 4px 10px 2px rgba(0,0,0,0.1);
        padding: 0 40px;
        .login-title {
            text-align: center; 
            font-size: 20px;
            color: #333;
            margin-top: 50px;
            h1 {
                margin-bottom: 20px;
                span.iconfont {
                    font-size: 56px;
                    color: rgba(176,23,31,1);
                }
            }
        }
    }

    .login-form {
        margin-top: 40px;
        .form-control {
            input {
                display: block; 
                width: 100%; 
                height: 50px; 
                border: 1px solid #ddd; 
                border-radius: 5px; 
                padding-left: 10px;
                font-size: 16px;
                &::-webkit-input-placeholder {
                    opacity: 0.4;
                }
                &::-ms-input-placeholder {
                    opacity: 0.4;
                }
            }
            .prompt {
                color: rgb(176,23,31);
                height: 30px; 
                line-height: 30px;
            }
        }
        .login-info {
            position: relative;
            .tips {
                position: absolute; 
                right: 0;
            }
        }
        .buttons {
            margin-top: 20px;
            input {
                display: block;
                width: 100%; 
                padding: 10px 0;
                border-radius: 5px;
                font-size: 16px;
                margin-bottom: 20px;
                opacity: 0.9;
                &:first-child {
                    border: 1px solid #5c81e3;
                    background: #678ee7;
                    background-image: linear-gradient(180deg,#678ee7,#5078df);
                    color: #fff;
                }
                &:last-child {
                    &:hover {
                        background: #eee;
                    }
                }
                &:hover {
                        opacity: 1;
                    }
            }
        }

    }
</style>