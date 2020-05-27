<!--
 * @Author: Jason
 * @Date: 2019-11-08 14:16:45
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-22 14:43:48
 * @Descripttion: 
 -->
<template>
    <div class="flex-btwn-aic header" :style="{ backgroundColor: Bg }">
        <div class="flex-aic header-opts" :class="{ hidden: !isShowBack }" @click="toBack">
            <van-icon name="arrow-left" size="28"/>
        </div>
        <div><slot></slot></div>
        <div class="flex-jce-aic header-opts" :class="{ hidden: !isShowPerson }" @click="toPerson">
            <van-icon name="user-circle-o" size="34"/>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
    @Prop({type:Boolean,default:false})
    private isShowBack!:boolean
    @Prop({type:Boolean,default:false})
    private isShowPerson!:boolean
    @Prop({type:String,default:"#ffffff"})
    private Bg!:string

    toBack(){
        let _ = this
        if(window.history.length<2){
            _.$router.push(`/`)
        }else{
            _.$router.go(-1)
        } 
    }
    toPerson(){
        let _ = this
        console.log("跳轉個人中心頁面")
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header{
    width: 100%;
    height: 12vw;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 0 4vw;
    background-color: #fff;
    z-index: 10;
    font-size: 5vw;
    font-weight: 600;
    color: #333333;
    border-bottom: 1px solid #f4f5f7;
    .header-opts{
        width: 15%;
        height: 12vw;
    }
}
</style>
