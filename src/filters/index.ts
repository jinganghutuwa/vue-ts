/*
 * @Author: Jason
 * @Date: 2020-04-22 11:18:24
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2020-04-22 12:09:00
 * @Descripttion: 
 */
import * as UtilsFilters from './utilFilters'
import * as OrderFilters from "./orderFilters";

interface VueFiltersModule{
    [propName: string]: any
}

const vueFiltersModule:VueFiltersModule = {
    ...UtilsFilters,
    ...OrderFilters
}
export { vueFiltersModule }