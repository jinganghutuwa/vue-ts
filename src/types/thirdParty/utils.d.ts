/*
 * @Author: Jason
 * @Date: 2019-11-21 17:47:51
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-22 11:06:34
 * @Descripttion: 
 */
interface Stroage {
    setter(key:string,value:any,time:number): any,
    getter(key:string): any,
    del(key:string): any
}
interface StorageInfo {
    _value:string,
    _time:number,
    _age:number
}

declare let BMap :any
// 地图声明
// interface BMap {
//     Geolocation():any
// }