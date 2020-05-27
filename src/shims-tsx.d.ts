/*
 * @Author: Jason
 * @Date: 2019-11-08 14:16:45
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-15 14:53:17
 * @Descripttion: 
 */
// 相关 tsx 模块注入
import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
