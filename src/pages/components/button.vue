<template>
    <input :type="inputType"
           readonly="readonly"
           :class="classStyle"
           @click="inputClick"
           :disabled="classStyle==='disabled-btn' || isDisabled"
           :value="text"
           
            />
</template>
<script>
    export default {
        data() {
            return {
                isDisabled: false
            }
        },
        props: {
            text: {
                type: [String, Number],
                default: "一颗按钮"
            },
            inputType: {
                type: [String],
                default: "button"
            },
            classStyle: {
                type: [String],
                default: "default-btn"
            }
        },
        methods: {
            inputClick () {
                this.$emit("btnClick");
                this.isDisabled = true
                setTimeout(() => {

                    // 禁用按钮
                    this.isDisabled = false;
                }, 1000);
        }
    }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>

    input[type='button'] {
        width: 145px;
        height: 50px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-right: 10px;
    }

    // 灰色按钮
    .gray-btn {
        width: 140px !important;
        height: 34px !important;
        transform: translateX(54%);
        position: absolute;
        bottom: 70px;
        left: 0;
        transition: all 0.5s ease;
        opacity: 0;
    }

    // 默认按钮
    .default-btn {
        border: 1px solid #e1e1e1;
        color: #646464;
        background: #c2c3c2;
        background-image: -webkit-linear-gradient(top,#fff,#c2c3c2);
        background-image: linear-gradient(180deg,#fff,#c2c3c2);
        opacity: 0.8;
        &:hover {
            opacity: 1;
        }

    }

    // 主色按钮
    .main-btn {
        color: #fff;
        background: #5c81e3;
        background-image: -webkit-linear-gradient(top, #678ee7, #5078df);
        background-image: linear-gradient(180deg, #678ee7, #5078df);
        &:hover {
          background-color: #6c8cd4;
          background-image: linear-gradient(180deg, #6c8cd4, #4769c2);
        }
    }

    // 禁用
    .disabled-btn {
        cursor: not-allowed;
        background-image: linear-gradient(180deg, #b8b8b8, #a9a9a9);
    }
</style>