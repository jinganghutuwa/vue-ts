<!--
 * @Author: Jason
 * @Date: 2019-11-22 14:40:53
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-25 15:46:40
 * @Descripttion: 
 -->
<template> 
    <div class="city" :class="{ 'active-fixed': isFixed }" :style="{ top: -scrollY + 'px' }">
        <v-head :isShowBack="$route.meta.isShowBack">门店列表</v-head>
        <div class="flex-btwn-aic point-classify">
            <div class="flex-jcc-aic point-classify-item" @click="toDrowMenu">
                <div class="down-menu-name">{{areaName}}</div>
                <van-icon name="arrow-down" class="color-gree"/>
            </div>
            <div class="flex-btwn-aic point-search">
                <div class="flex-aic point-search-info" >
                    <img @click="search()" src="../../assets/imgs/icon_search.png" alt="">
                    <input type="text" v-model="searchText"  @keyup.enter="search()" placeholder="请输入关键字搜索"> 
                </div>
                <div class="point-search-off" v-show="isShowOff" @click="cancalSearch()">取消</div>
            </div>
        </div>

        <!-- 城市选择和服务选择蒙层 -->
        <transition name="fade">
            <div class="point-mask" v-show="isShowMask">
                <div class="point-info-list">
                    <div class="point-info-item" @click="chooseService('0')">全城</div>
                    <div class="point-info-item" v-for="(item, index) in areaList" :key="index" @click="chooseService(item)" >{{item.name}}</div>
                </div>
            </div>
        </transition>

        <!-- 网点列表 -->
        <div class="point-list" v-if="webList&&webList.length>0">
            <van-list v-model="isLoading" :finished="isEnd"  :error.sync="isError"
                error-text="请求失败，点击重新加载" finished-text="我也是有底线的哦" @load="loadMore">
                <div class="flex-btwn-aic point-item" v-for="(item, index) in webList" :key="index">
                    <img class="point-item-logo" :src="item.logoPath || logoImg" alt />
                    <div class="point-info">
                    <div class="point-item-name">{{item.shopName}}</div>
                    <div class="point-item-address">{{item.address}}</div>
                    <div class="flex-btwn-aic">
                        <div class="point-item-time-tel">
                        <div class="flex-aic">
                            <img src="../../assets/imgs/icon_time.png" alt />
                            <span>{{item.openTime}} -{{item.restTime}}</span>
                        </div>
                        <div class="flex-aic">
                            <img src="../../assets/imgs/icon_tel.png" alt />
                            <span>{{item.telephone}}</span>
                        </div>
                        </div>
                        <div class="point-item-nav" @click="toNav(item)">
                        <div class="color-c7">{{item.shopDistance}}</div>
                        <div class="point-item-to-nav">导航</div>
                        
                        </div>
                    </div>
                    </div>
                </div>
            </van-list>
        </div>
        <div v-else class="no-data">暂无更多数据</div>
    </div>
</template>

<script lang="ts">
import vHead from '@/components/header.vue'
import { sourceCode } from "./../../assets/ts/config"
import { GetLoc } from "./../../assets/ts/utils"
import { GetAreaList,GetShopList } from "./../../apis/point"
import { Component, Vue } from "vue-property-decorator";

@Component({
    components:{
        "v-head":vHead
    }
})
export default class PointList extends Vue {
    private areaName:string = ""
    private curAreaId:string|number|null = null
    private searchText:string = ""
    private areaList:Array<POINT.CityItemInfo> = []
    private isShowMask:boolean = false
    private pageNum:number = 1
    private scrollY:number = 0
    private isError:boolean = false
    private isEnd:boolean = false
    private isLoading:boolean = false
    private webList:Array<POINT.WebListInfo> = []
    private logoImg:string = require("../../assets/imgs/icon_logo.png")
    private isFixed:boolean = false

    get isShowOff():boolean{
        let _ = this
        _.searchText = _.searchText.replace(/(^\s*)|(\s*$)/g, "")
        if(_.searchText){
            return true
        } else{
            return false
        }
    }

    mounted(){
        let _ = this;
        if(sessionStorage.cityName){
            _.areaName = sessionStorage.cityName
            return
        }
        if(sessionStorage.city && sessionStorage.city !== 'null' && sessionStorage.city !== 'undefined'){
            _.areaName = sessionStorage.city
        }else{
            GetLoc(()=>{
                _.areaName = sessionStorage.city
            })
        }
    }
    created() {
        let _ = this
        _.getAreaList()
        _.getShopList()
    }

    
    private toDrowMenu() {
        let _ = this;
        _.isShowMask = true;
        _.scrollY = window.scrollY 
        console.log('_.scrollY',_.scrollY)
        _.isFixed = true
        // body定位的top就是滚动的距离
        // console.log((document.body as HTMLBodyElement).style);
        // (document.body as HTMLBodyElement).style = `position:fixed;top:-${_.scrollY}px;height:100%;width:100%;overflow: hidden;`
    }
    private cancalSearch(){
      let _ = this
      _.searchText = ''
      _.search()
    }
    private search(){
        let _ = this
        _.pageNum = 1;
        _.webList = [];
        _.isError = false
        _.isEnd = false;
        //   document.body.style = ''
        _.isFixed = false
        window.scrollTo(0, _.scrollY)
        _.getShopList();
    }
    private toNav(i:POINT.WebListInfo){
        let _ = this;
        console.log("点击去导航", i);
        _.$router.push({
            path: `/point/nav`,
            query: {
                coordinate: i.coordinate,
                address: i.address
            }
        });
    }
    /**
     * 切换区域网点
     */
    private chooseService(i:POINT.CityItemInfo|string){
        let _ = this
        if (i == "0") {
            _.areaName = sessionStorage.cityName || sessionStorage.city;
            _.curAreaId = null;
        } else {
            _.areaName = (i as POINT.CityItemInfo).name;
            _.curAreaId = (i as POINT.CityItemInfo).areaId;
        }
        _.pageNum = 1;
        _.isError = false
        _.webList = [];
        _.isEnd = false;
        // document.body.style = ''
        _.isFixed = false
        window.scrollTo(0, _.scrollY)
        _.getShopList();
        _.isShowMask = false;
    }
    /**
     * 加载下一页
     */
    private loadMore() {
        let _ = this;
        if (_.isEnd) return;
        _.isEnd = true;
        _.isLoading = true;
        _.pageNum++;
        _.getShopList();
    }
    /**
     * 获取网点列表
     */
    private getShopList() {
        let _ = this;
        let cityName = sessionStorage.cityName || sessionStorage.city
        let pars = {
            sourceCode,
            pageNo: _.pageNum,
            pageSize: 10,
            longitude: sessionStorage.longitude,
            latitude: sessionStorage.latitude,
            cityName: cityName,
            areaId: _.curAreaId,
            shopName:_.searchText
        };
        GetShopList(pars).then(res => {
            try {
                console.log("====>", JSON.parse(res.map.shopList));
                let shopList = JSON.parse(res.map.shopList);
                shopList = shopList.map((i:POINT.WebListInfo) => {
                    if (i.shopDistance) {
                        i.shopDistance = i.shopDistance.toLowerCase();
                    }
                    return i;
                });
                
                if (_.pageNum == 1) {
                    _.webList = shopList;
                } else {
                    _.webList = _.webList.concat(shopList);
                }

                if (shopList.length < 10) {
                    _.isEnd = true;
                } else {
                    _.isEnd = false;
                }
                _.isError = false
                _.isLoading = false
            } catch (error) {
                console.log('执行 JSON.parse(res.map.shopList)出错',error)
            }
          
        }).catch(err => {
            console.log("执行错误", err);
            _.isError = true
            if(err&&err.resultDes){
                _.$toast(err.resultDes)
            }
        });
    }

    /**
     * 获取区域列表
     */
    private getAreaList(){
        let _ = this;
        let cityName = sessionStorage.cityName || sessionStorage.city
        let pars = {
            cityName: cityName
        };
        GetAreaList(pars).then(res => {
            console.log("获取到的区域信息为",res)
            _.areaList = res.areaList
        }).catch(err => {
            if(err&&err.resultDes){
                _.$toast(err.resultDes)
            }
        });
    }
}
</script>


<style lang="scss" scoped>
.scrollY{
    touch-action:none;
    -moz-touch-action:none;
    -ms-touch-action:none;
    -webkit-touch-action:none;
}
.active-fixed{
    position: fixed;
    width: 100%;
    top: 0;
    bottom: 0;
    left:0;
    overflow: hidden;
}
.point-classify {
    height: 12vw;
    width: 100%;
    border-top: 1px solid #F4F5F7;
    background-color: #fff;
    position: fixed;
    top:12vw;
    left: 0;
    right: 0;
    z-index: 10;
    .point-classify-item {
        width: 30%;
        text-align: center;
        height: 12vw;
        line-height: 12vw;
        font-size: 4vw;
    }
    .point-search{
        width: 70%;
        height: 9vw;
        padding-right: 4vw;
        .point-search-info{
            height: 9vw;
            background-color: #F8F8F8;
            padding: 0 2vw;
            border-radius: 1.3333vw;
            overflow: hidden;
            // width: calc(100%-12vw);
            flex: 1;
            -webkit-flex: 1;
            -moz-flex: 1;
            -ms-flex: 1;
            -o-flex: 1;
            img{
                width: 4.2667vw;
                height: auto;
                margin-right: 2vw;
            }
            input{
                height: 100%;
                background-color: transparent;
                flex: 1;
                -webkit-flex: 1;
                -moz-flex: 1;
                -ms-flex: 1;
                -o-flex: 1;
            }
        }
        .point-search-off{
            width: 12vw;
            text-align: right;
            height: 9vw;
            line-height: 9vw;
            color:#666;
            font-size: 4vw;
        }
    }
}
.point-mask {
    border-top: 1px solid #F4F5F7;
    background-color: #fff;
    position: fixed;
    top: 24vw;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    overflow-y: auto;
    .point-info-list {
        // width: 100%;
        // height: 100%;
        // overflow-y: scroll;
        // background-color: #fff;
        // border-top: 1px solid #F4F5F7;
        .point-info-item {
            height: 12vw;
            text-align: center;
            font-size: 4vw;
            line-height: 12vw;
            background-color: #fff;
            border-bottom: 1px solid #ededed;
        }
    }
}
.point-list {
    width: 100%;
    margin-top: 24vw;
    padding: 2.6667vw 0 6vw;
    .point-item {
        padding: 4vw;
        width: 100%;
        background-color: #fff;
        margin-bottom: 2.6667vw;
        .point-item-logo {
            width: 26.4vw;
            height: auto;
            display: inline-block;
            margin-right: 4.8vw;
        }
        .point-info {
            flex: 1;
            -ms-flex: 1;
            -webkit-flex: 1;
            -moz-flex: 1;
            overflow: hidden;
        .point-item-name {
            width: 100%;
            font-size: 4vw;
            font-weight: bold;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-bottom: 2.6vw;
        }
        .point-item-address {
            font-size: 3.4667vw;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
            margin-bottom: 3vw;
        }
        .point-item-time-tel {
            font-size: 3.2vw;
            div:first-child {
                margin-bottom: 2.6667vw;
            }
            img {
                width: 4vw;
                display: inline-block;
                margin-right: 2vw;
            }
        }
        .point-item-nav {
            text-align: center;
            font-size: 3.2vw;
            .point-item-to-nav {
                height: 6vw;
                padding: 0 4vw;
                background-color: #53B5E9;
                color: #fff;
                font-size: 3.2vw;
                line-height: 6vw;
                border-radius: 3vw;
                margin-top: 2vw;
            }
        }
        }
    }
}
</style>