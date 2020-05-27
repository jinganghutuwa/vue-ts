/*
 * @Author: Jason
 * @Date: 2019-11-20 14:35:19
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2020-04-21 18:09:14
 * @Descripttion: 項目基礎配置信息
 */

// 是否测试
console.log("=================>",process.env.NODE_ENV)
const isTest:boolean = process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
// 机构编码
const sourceCode:string = "PAGY"
// 项目名称
const projectName:string = "ShengDaXMGJYH"

export { isTest,sourceCode,projectName }