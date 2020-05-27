/*
 * @Author: Jason
 * @Date: 2019-11-20 13:40:59
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-22 18:17:27
 * @Descripttion: 各类函数封装
 */
import { Toast  } from 'vant';
import { projectName } from "./config"


/**
 * 加载中提示框
 */
function openLoading() {
    Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
    });
} 
/**
 * 关闭加载中提示框
 */
function closeLoading() {
    Toast.clear();
} 

/*
* localstorage 存储对象
* 存储信息为json字符串："{"_value":"Jason","_time":1574323217586,"_age":1574326817586}"
* _value：存储值；_time：存储时的时间；_age：过期时间；
*/
let ls:Stroage = {
    setter: function (key:string, value:any, time:number):void {
        let _key = projectName + "_" + key;
        localStorage.removeItem(_key);
        let _time = +new Date()
        let _age = _time + time
        let _value:any
        if(value instanceof Object || value instanceof Array ){
            _value = JSON.stringify(value)
        }else{
            _value = value
        }
        let storageInfo:StorageInfo = {
            _value,_age,_time
        }
        localStorage.setItem(_key, JSON.stringify(storageInfo));
    },
    getter: function (key:string):any {
        let _key = projectName + "_" + key;
        let sinfo = localStorage.getItem(_key)
        let storageInfo:StorageInfo
        let nowTime = +new Date()
        let isExpire:boolean = (function(){
            if(sinfo){
                storageInfo = JSON.parse(sinfo)
                return nowTime > storageInfo._age 
            }else{
                return true
            }
        })()
        if(isExpire){
            localStorage.removeItem(_key);
        }else{
            storageInfo = JSON.parse(sinfo as string)
            return storageInfo._value
        }
    },

    del: function (key:string) {
        var _key = projectName + "_" + key;
        localStorage.removeItem(_key);
    }
}
/*
* 检查各个数据的格式
*/
function Checking(value:string, type:string):boolean | undefined {
    switch (type) {
        case 'carnum' : 
            return /^[\u4E00-\u9FA5]{1}[A-Z]{1}[\da-zA-Z]{5,6}$/.test(value)
        case 'phone':
            return /^(\+?0?\d{1,3})-?\d{9,11}$/.test(value)
        case 'isEmail': 
            return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(value) 
    }
}
/*
* 获取URL地址栏携带的参数
*/
function GetQueryString(name:string):string{
    let url = window.document.location.toString()
    let arrObj = url.split('?')
    if (arrObj.length > 1) {
        let arrPara = arrObj[1].split('&')
        let arr
        for (let i = 0; i < arrPara.length; i++) {
            arr = arrPara[i].split('=')
            if (arr != null && arr[0] === name) {
                return arr[1]
            }
        }
        return ''
    } else {
        return ''
    }
}
// function getUrlParam(name) {
//     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
//     var r = window.location.search.substr(1).match(reg); //匹配目标参数
//     if (r != null) return unescape(r[2]);
//     return null; //返回参数值
// }

/**  
* 获取定位
* 关于状态码
* BMAP_STATUS_SUCCESS	检索成功。对应数值“0”。
* BMAP_STATUS_CITY_LIST	城市列表。对应数值“1”。
* BMAP_STATUS_UNKNOWN_LOCATION	位置结果未知。对应数值“2”。
* BMAP_STATUS_UNKNOWN_ROUTE	导航结果未知。对应数值“3”。
* BMAP_STATUS_INVALID_KEY	非法密钥。对应数值“4”。
* BMAP_STATUS_INVALID_REQUEST	非法请求。对应数值“5”。
* BMAP_STATUS_PERMISSION_DENIED	没有权限。对应数值“6”。(自 1.1 新增)
* BMAP_STATUS_SERVICE_UNAVAILABLE	服务不可用。对应数值“7”。(自 1.1 新增)
* BMAP_STATUS_TIMEOUT	超时。对应数值“8”。(自 1.1 新增)
*/
async function GetLoc(callback:()=>void){
    openLoading()
    if (navigator.geolocation) {
        let geolocation = new BMap.Geolocation();
        let geoc = new BMap.Geocoder();
        geolocation.getCurrentPosition(function (r:any) {
            // 浏览器定位
            if (geolocation.getStatus() === 0) {
                geoc.getLocation(r.point, function (rs:any) {
                    closeLoading()
                    var addComp = rs.addressComponents;
                    console.log('浏览器定位获取的定位信息', rs)
                    sessionStorage.longitude = rs.point.lng; //经度
                    sessionStorage.latitude = rs.point.lat; //纬度
                    sessionStorage.province = addComp.province; //省
                    sessionStorage.city = addComp.city; //城市
                    sessionStorage.myAddress = addComp.province + addComp.city + addComp.district + addComp.street +
                        addComp.streetNumber;
                    typeof callback == 'function' && callback()
                    
                });
            } else {
                console.log('浏览器定位failed' , geolocation.getStatus());
                getLocByIP(callback)
            }
        }, {
            enableHighAccuracy: true,maximumAge: 0, timeout: 12000
        });
    } else {
        console.log('浏览器不支持地理定位。');
        getLocByIP(callback)
    }

}

// ip定位
async function getLocByIP(cb:()=>void) {
    var myCity = new BMap.LocalCity();
    myCity.get(function (result:any) {
        // 创建地理编码实例      
        var myGeo = new BMap.Geocoder();
        // 根据坐标得到地址描述    
        myGeo.getLocation(new BMap.Point(result.center.lng, result.center.lat), function (res:any) {
            closeLoading()
            console.log('IP获取的定位信息', res)
            var addComp = res.addressComponents;
            sessionStorage.longitude = res.point.lng; //经度
            sessionStorage.latitude = res.point.lat; //纬度
            sessionStorage.province = addComp.province; //省
            sessionStorage.city = addComp.city; //城市
            sessionStorage.myAddress = addComp.province + addComp.city + addComp.district + addComp.street +
                addComp.streetNumber;
            typeof cb == 'function' && cb()
        });
    });
}


/**
 * 判断是否在微信里打开
*/
function ISWX(){ 
    let u = window.navigator.userAgent 
    return /micromessenger/.test(u.toLowerCase())
}

export { ls,Checking,GetQueryString,ISWX,GetLoc,openLoading,closeLoading }