<template>
    <panel :title="informationTit">
        <div slot="content" class="information-content">
            <div class="avator-box">
                <div class="img-box">
                    <img :src="submitImgUrl" alt="">
                </div>
                <div class="r-box">
                    <h3 class="tit">修改头像</h3>
                    <input type="file" readonly="readonly" ref="submitImg" class="submit-img" @change="submitImg" />
                </div>
            </div>
        </div>
    </panel>
</template>

<script>
    import panel from '../../components/panel.vue'

    export default {
        data: function() {
            return {
                submitImgUrl: '',
                informationTit: '账户资料'
            }
        },
        created() {
            this.getImgUrl();
        },
        updated() {
            this.submitImg();
        },
        methods: {
            getImgUrl() {

                // 在修改之前获取 缓存中的头像信息
                this.submitImgUrl = JSON.parse(localStorage.getItem('submitImgUrl'));
            },

            submitImg() {
                
                // 将修改后的图片地址保存至本地缓存中
                this.submitImgUrl = '/static/images/' + this.$refs.submitImg.files[0].name;

                // 将该图片信息保存至本地存储
                localStorage.setItem('submitImgUrl', JSON.stringify(this.submitImgUrl));
                this.$emit('getImg');
            }
        },
        computed: {
            // 'submitImgUrl': function() {
            //     return JSON.parse(localStorage.getItem('submitImgUrl'));

            // }
        },
       
        components: {
            panel
        }
    }
   
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    
    .information-content {
        height: 200px; 
        padding: 20px;
        .avator-box {
            width: 100%; 
            height: 110px; 
            padding-bottom: 10px; 
            border-bottom: 1px solid #ddd;
            .img-box {
                width: 90px; 
                height: 90px; 
                border-radius: 5px;
                background: #333;
                float: left;
                img {
                    width: 100%; 
                    height: 100%;
                }
            }
            .r-box {
                margin-left: 110px; 
                width: 100px; 
                text-align: center;
                padding-top: 14px;
                .tit {
                    font-size: 18px; 
                }
                .submit-img {
                    width: 200px;
                    font-size: 12px; 
                    color: #fff; 
                    border-radius: 5px; 
                    text-align: center; 
                    padding: 6px 0; 
                    border: 1px solid #5c81e3;
                    background-color: #678ee7;
                    background-image: linear-gradient(180deg,#678ee7,#5078df);
                    margin-top: 6px;
                }

            }

        }
    }
</style>