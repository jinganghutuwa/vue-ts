/*
 * @Author: Jason
 * @Date: 2019-09-23 09:52:30
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2020-04-22 13:45:42
 * @Descripttion: 
 */
let isProduction = process.env.NODE_ENV === 'production'
let path = require("path")
module.exports = {
  publicPath: '/TSDEMO',
  // runtimeCompiler: true,
  devServer: {
    host: 'localhost',
    port: 4919,
    open: true,
    overlay: {
      warnings: true,
      errors: true
    }
  },
//   是否使用包含运行时编译器的Vue内核版本
// runtimeCompiler: true,

// 使用runtime-only 还是 in-browser compiller
// compiler: false,
  runtimeCompiler: true,
  configureWebpack: config  => {
    if (isProduction) { 
      // 在使用keep-alive时，打包之后保持类名不被编译
      config.optimization.minimizer[0].options.terserOptions.keep_fnames = true;
    }
    // Object.assign(config, {
      // module:{
        // rules:[
          // {
          //   test:/\.vue$/,
          //   loader: 'sass-loader',
          //   options:{
          //     postcss:[require('autoprefixer')]
          //   }
          // },
        // ]
      // }
      // config.resolve = {
      //   alias: {
      //     'vue$': 'vue/dist/vue.min.js',
      //     // '@': path.resolve(__dirname, './src')
      //   }
      // }
    // })
    
  },
  productionSourceMap: false
}