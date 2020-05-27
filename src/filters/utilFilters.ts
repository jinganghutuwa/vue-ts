/*
 * @Author: Jason
 * @Date: 2020-04-22 11:18:36
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2020-04-22 11:50:32
 * @Descripttion: 
 */

/**
 * @name: 使数字默认保留两位小数
 * @description: 
 * @param {type} num：要格式化的数字或者数字字符串  fix:要保留小数的位数
 * @return: 经过toFixed()之后 返回保留小数位数之后的string类型的字符串
 */
function toFixed(num: number|string, fix: number = 2):string {
    return (+num).toFixed(fix)
}

/**
 * @name: 格式化手机号码
 * @description: eg:将13151784919 转化成 131****4919格式
 * @param {type} tel:手机号
 * @return: 形为：131****4919的string类型 
 */
function formatPhone(tel: string):string {
    try {
        if (tel.length > 8) {
            return tel.substr(0, 3) + '****' + tel.substr(7)
        } else {
            return tel
        }
    } catch{
        return ''
    }

}
export { toFixed,formatPhone }