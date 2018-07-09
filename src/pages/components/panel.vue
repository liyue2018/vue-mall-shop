<template>
    <div>
         <!-- 为您推荐开始 -->
         <div class="panel">
            <div>
                <h2 class="title">{{ title }}
                    <slot name="r"></slot>
                </h2>
            </div>
             <div class="content">
                 <slot name="content"></slot>
             </div>
         </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
            }
        },
        props: ['title']
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

         .panel {
            width: 100%;
            margin-bottom: 40px; 
            overflow: hidden;
            border-radius: 8px 8px 0 0;
            h2.title {
                background: linear-gradient(#fbfbfb,#ececec);
                height: 60px; 
                line-height: 60px; 
                padding-left: 20px;
                font-size: 18px; 
                font-weight: 400;
                border: 1px solid #d4d4d4;
                border-radius: 8px 8px 0 0;
            }
            .content {
                overflow: hidden;
                background: #fff;
                // height: 400px;
            }
        }

</style>