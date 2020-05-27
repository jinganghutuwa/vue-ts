<!--
 * @Author: Jason
 * @Date: 2019-11-08 14:21:08
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2020-04-22 12:39:09
 * @Descripttion: 
 -->
# tsdemo
## 项目说明：
1. src目录下，==typings文件夹==主要包含：***全局声明（~自己新建~）***
3. vue.config.js为项目配置文件（==和之前一样==），也是自己新建
4. src目录下，==apis文件夹==主要是用来处理集中**接口请求**
5. src目录下，==env文件夹==为项目环境配置（dev,test,pro等）
6. src目录下，==filters文件夹==为项目的全局过滤器集中处理（index.ts为此文件夹抛出的主目录）
7. src目录下，==assets文件夹==为项目的资源文件夹，主要分为三个文件夹：
(1)、imgs：用来存储项目的图片及svg
(2)、scss:用来存储项目的样式文件
(3)、ts:用来存储提供工具方法文件(axios封装，全局方法等)



## 项目启动及构建
1. 下载依赖：npm install
2. 可通过ip地址访问项目链接：npm run dev
3. 启动：npm run serve
4. 生产打包：npm run build
5. 测试打包：npm run test

## z-index参数说明

使用分类 | 数值
---|---
头部 | 10
蒙层 | 9
其他 | 1

## 代码规范说明
**1. import引入的顺序：<br/>**
   使用import引入时，需注意引入的顺序，按照首先引入vue相关依赖，其次是项目使用的组件依赖(先是项目使用的UI框架依赖，后是项目自定义的组件)，然后是所要使用的接口api，最后是引入的项目中使用ESmodule抛出的方法 <br/>
**2. main.ts文件<br/>**
   不要再main.ts文件中书写逻辑代码，尽可能的把要写在main.ts文件中的逻辑代码抽离出来（参考全局过滤器的处理方法）