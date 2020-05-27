/*
 * @Author: Jason
 * @Date: 2019-11-20 14:13:48
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-21 11:04:49
 * @Descripttion: 
 */
import { POST } from "./../assets/ts/axios"

const URL = {
    CityList:'/ShengDaXMGJYH/sdcar/getCityList',
    AreaList:'/ShengDaXMGJYH/sdcar/getAreaList',
    ShopList:'/ShengDaXMGJYH/sdcar/getShopList',
}

function GetCityList(pars:object = {}){
    return POST(URL.CityList,pars)
}
function GetAreaList(pars:object = {}){
    return POST(URL.AreaList,pars)
}
function GetShopList(pars:object = {}){
    return POST(URL.ShopList,pars)
}

export { 
    GetAreaList,GetShopList,GetCityList
}