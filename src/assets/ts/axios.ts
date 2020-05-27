/*
 * @Author: Jason
 * @Date: 2019-11-20 13:40:51
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2020-04-21 18:10:10
 * @Descripttion: 封裝axios請求
 */
import { isTest } from "./config"
import { openLoading,closeLoading } from "./utils"
import axios,{ AxiosResponse,AxiosError } from "axios"
import { Dialog  } from 'vant';

const baseUrlDomain:string = isTest ? 'http://h5-test.schengle.com':''

let authorToken:string = ''
axios.defaults.baseURL = baseUrlDomain
axios.defaults.timeout = 15000

function GET(url:string, params:any) {
    axios.defaults.baseURL = baseUrlDomain
    return axios.get(url, {
        params: params,
        headers: {
            'Content-Type': 'application/json',
            Authorization: authorToken
        }
    }).then(reqResult).catch(reqErr)
}

function POST(url:string, params:any, hasLoad:boolean = true, contentType:string = 'application/json') {
    axios.defaults.baseURL = baseUrlDomain
    if (hasLoad) {
        openLoading()
    }
    return axios
        .post(url, params, { headers: { 'Content-Type': contentType, Authorization: authorToken } })
        .then(reqResult)
        .catch(reqErr)
}


/**
 * 响应结果统一处理
 * @param {Object} res 响应的结果
 * @returns {Object} 响应结果的数据
 */
function reqResult(res:AxiosResponse) {
    let sucessData : any
    if (res.status === 200 && ( res.data.resultCode == '000000' || res.data.resultCode == 'SUCCESS')) {
        sucessData = res.data.data
    } else {
        // throw res 
        return Promise.reject(res)
    }
    closeLoading()
    return sucessData
}
/**
 * 响应异常统一处理
 * @param {Object} 响应的异常
 */
function reqErr(e:AxiosResponse) {
    console.error('===执行失败===>', e)
    closeLoading()
    if(e.toString().includes("timeout")){
        Dialog.alert({
            title: '系统提示',
            message: "网络出小差了，请稍后重试"
        }).then(() => {
            return false
        });
        throw ''
    }else if(e.toString().includes("Network Error") || e.toString().includes("502") || e.toString().includes("500")){
        Dialog.alert({
            title: '系统提示',
            message: "服务器异常，请稍后重试"
        }).then(() => {
            return false
        });
        throw ''
    }else{
        throw e.data
    }
}

/**
 * 关闭请求
 * 
 */
function cancelAxios(){
    let CancelToken = axios.CancelToken
    let source = CancelToken.source()

    source.cancel('Operation canceled by the user.');
    console.log("关闭axios请求")
}


export { GET, POST,cancelAxios }