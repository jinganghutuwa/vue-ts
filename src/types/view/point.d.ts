/*
 * @Author: Jason
 * @Date: 2019-11-21 11:22:27
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-25 15:33:22
 * @Descripttion: 
 */

declare namespace POINT {
    interface CityItemInfo {
        readonly areaId:string | number;
        readonly name:string;
        [propName: string]: any
    }
    interface CityListInfo {
        provinceName:string;
        cityItemList:Array<CityItemInfo>
    }
    interface WebListInfo {
        readonly address:string;
        readonly coordinate:string;
        readonly telephone:string;
        readonly openTime:string;
        readonly restTime:string;
        shopDistance:string;
        readonly shopName:string;
        readonly logoPath?:string;
        [propName: string]: any
    }
    interface ChangeHTMLElement extends HTMLBodyElement{
        style:CSSStyleDeclaration
    }
}