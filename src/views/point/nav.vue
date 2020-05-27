<!--
 * @Author: Jason
 * @Date: 2019-11-22 16:02:31
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-22 17:07:05
 * @Descripttion: 
 -->
<template>
  <div>
    <v-head :isShowBack="$route.meta.isShowBack">门店地图</v-head>
    <div class="nav">
        <div class="nav-content">
            <!-- <div class="flex-aic nav-info">
                <div class="nav-info-address">上海市静安区灵石路656号上海市静安区灵石路656号上海市静安区灵石路656号上海市静安区灵石路656号</div>
                <div class="nav-info-btn">导航</div>
            </div> -->
        <div id="allmap"></div>
        </div>
    </div>
    <van-action-sheet v-model="naviVisible" :round="false" cancel-text="取消" :actions="naviActions" @select="onSelect" @cancel="naviVisible = false" />
  </div>
</template>

<script lang="ts">
import vHead from '@/components/header.vue'
import axios,{ AxiosResponse,AxiosError } from "axios"
import { Component, Vue } from 'vue-property-decorator';

const locIcon:string = require("../../assets/imgs/icon_nav.png");

interface NavItem {
    name:string,
    navType:string
}

@Component({
    components:{
        "v-head":vHead
    }
})
export default class PonitNav extends Vue {
    private naviVisible:boolean = false
    private naviActions:Array<any> = [
        { name: '高德地图',navType:"gd" },
        { name: '腾讯地图',navType:"tx" },
        { name: '百度地图',navType:"bd" }
    ]
    mounted() {
        let _ = this
        console.log('页面带来的参数',_.$route.query)
        let { coordinate,address } = _.$route.query
        coordinate = (coordinate as string).split(',')
        console.log('coordinate',coordinate)
        // 百度地图API功能
        var map = new BMap.Map("allmap");
        map.enableScrollWheelZoom(false); //开启鼠标滚轮缩放
        var point = new BMap.Point(coordinate[0], coordinate[1]);
        map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别

        //创建图标
        var pt = new BMap.Point(coordinate[0], coordinate[1]);
        var myIcon = new BMap.Icon(locIcon, new BMap.Size(30, 30));
        var marker = new BMap.Marker(pt, { icon: myIcon }); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中


        var label = new BMap.Label(`<div class="flex-aic nav-info">
                <div class="nav-info-address">${address}</div>
                <div class="nav-info-btn">导航</div>
            </div>`,{offset:new BMap.Size(-140,-60)});
        marker.setLabel(label);


        label.addEventListener("click", function () {
            _.naviVisible = true
            console.log('导航',_.naviVisible)
        });

        
    }

    onSelect(i:NavItem) {
        let _ = this
        console.log(i)
        _.navigate(i.navType)
        _.naviVisible = false
    }
    // 百度、高德、腾讯导航
    navigate(style:string) {
        let _ = this
        let { coordinate } = _.$route.query
        coordinate = (coordinate as string).split(',')
        if (style == "bd") {
            window.location.href = `https://api.map.baidu.com/direction?origin=latlng:${
            sessionStorage.latitude
            },${sessionStorage.longitude}|name:我的位置&destination=latlng:${
            coordinate[1]
            },${coordinate[0]}|name:我的终点&mode=driving&origin_region=${
            sessionStorage.city
            }&destination_region=长沙市&output=html&coord_type=bd09ll&src=myAppName`;
        } else if (style == "gd") {
            // 转换百度坐标为高德坐标 调高德导航
            axios.get(`https://restapi.amap.com/v3/assistant/coordinate/convert?key=17d277e5a61eda694c1784737631c319&locations=${sessionStorage.longitude},${sessionStorage.latitude}|${ coordinate[0]},${ coordinate[1]}&coordsys=baidu`)
            .then(res => {
                console.log('res',res.data)
                if (res.data.status == 1) {
                    var locations = res.data.locations.split(";");
                    let startPt = locations[0].split(",");
                    startPt.lng = startPt[0];
                    startPt.lat = startPt[1];
                    let endPt = locations[1].split(",");
                    endPt.lng = endPt[0];
                    endPt.lat = endPt[1];
                    console.log('endPt',endPt)
                    window.location.href = `https://uri.amap.com/navigation?from=&to=${
                        endPt.lng
                    },${endPt.lat},我的终点&mode=car&policy=0&coordinate=gaode&callnative=1`;
                }
            }).catch(err=>{
                console.log('err',err)
            })
        } else if (style == "tx") {
            // 转换百度坐标为腾讯坐标
            // qq.maps.convertor.translate(
            // new qq.maps.LatLng(coordinate[1], coordinate[0]),3,function(res) {
            //     let latlng = res[0];
            //     window.location.href = `https://apis.map.qq.com/uri/v1/routeplan?type=drive&to=中关村&tocoord=${
            //     latlng.lat
            //     },${latlng.lng}&policy=1&referer=myapp`;
            // }
            // );
        }
    }
}
</script>