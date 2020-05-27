<!--
 * @Author: Jason
 * @Date: 2019-11-20 13:44:38
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-26 11:30:26
 * @Descripttion: 
 -->
<template> 
    <div class="city">
        <v-head :isShowBack="$route.meta.isShowBack">城市列表</v-head>
        <div class="mt city-tip">当前定位城市</div>
        <div class="flex-btwn-aic city-item-loc" @click="chooseCity('loc')">
            <div class="flex-aic city-item-loc-text">
                <span>{{ locCity }}</span>
                <van-icon name="location-o" size="24"/>
            </div>
            <div class="city-item-loc-refresh" ref="dom" @click.stop="toRefershLoc">刷新</div>
        </div>
        <div class="city-list" v-for="(item, index) in cityList" :key="index">
            <div class="city-tip">{{item.provinceName}}</div>
            <div class="city-item" v-for="(city, index) in item.cityItemList" :key="index" @click="chooseCity(city)">{{city.name}}</div>
        </div>
    </div>
</template>

<script lang="ts">
import vHead from '@/components/header.vue'
import { sourceCode } from "./../../assets/ts/config"
import { GetCityList } from "./../../apis/point"
import { Component, Vue } from "vue-property-decorator";
import { ls,GetLoc } from "./../../assets/ts/utils"

@Component({
    components:{
        "v-head":vHead
    }
})
export default class PointCity extends Vue {
    private cityList:Array<POINT.CityListInfo> = []
    private locCity:string = "定位中..."

    mounted() {
        let _ = this
        if(sessionStorage.city && sessionStorage.city !== "null" && sessionStorage.city !== "undefined"){
            _.locCity = sessionStorage.city
        }else{
            GetLoc(()=>{
                _.locCity = sessionStorage.city
            })
        }
    }

    created() {
        let _ = this
        _.getCityList()  
        // ls.setter("Name",{name:"Jason"},1000*60*1)
        console.log(ls.getter("Name"))   
    }

    chooseCity(i:POINT.CityItemInfo | string){
        let _ = this
        console.log('获取到的参数',i)
        if( i === 'loc' ){
          sessionStorage.cityName = sessionStorage.city
        }else{
          sessionStorage.cityName = (i as POINT.CityItemInfo).name
        }
        
        _.$router.push('/point/list')
    }
    getCityList(){
        let _ = this
        let pars = {
            sourceCode
        }
        GetCityList(pars).then(res => {
            console.log("获取到的信息为",res)
            let cityInfo = res.cityMaps
            let cityList:Array<POINT.CityListInfo> = []
            for( let prop in cityInfo){
                // let cityItemInfo:POINT.CityListInfo = {
                //     provinceName:prop,
                //     cityItemList:cityInfo[prop],
                // }
                let cityItemInfo:POINT.CityListInfo = <POINT.CityListInfo>{}
                cityItemInfo.provinceName = prop
                cityItemInfo.cityItemList = cityInfo[prop]
                console.log("cityItemInfo",cityItemInfo)  
                cityList.push(cityItemInfo)
            }
            _.cityList = cityList
            console.log("cityList",_.cityList)  
        }).catch(err => {
            if(err&&err.resultDes){
                _.$toast(err.resultDes)
            } 
        })
    }
    toRefershLoc(){
        let _ = this
        GetLoc(()=>{
            _.locCity = sessionStorage.city
        })
    }
}
</script>

<style lang="scss" scoped>

.city{
    @mixin cityItem{
        width: 100%;
        height: 12vw;
        line-height: 12vw;
        background-color: #fff;
        border-bottom: 1px solid #EDEDED;
        padding: 0 4vw;
        font-size: 4vw;
        font-weight: 600;
    }
    .city-tip{
        padding: 0 4vw;
        height: 10vw;
        line-height: 10vw;
    }
    .city-item-loc{
        @include cityItem;
        .city-item-loc-refresh{
            color: #5676F2;
        }
    }
    .city-list{
        .city-item{
            @include cityItem
        }
    }
}
</style>