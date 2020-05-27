/*
 * @Author: Jason
 * @Date: 2019-11-08 14:16:45
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2020-04-22 13:25:30
 * @Descripttion: 
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/common.scss'
import Vant from 'vant';
import 'vant/lib/index.css';
import { isTest } from "./assets/ts/config"
import { vueFiltersModule } from "./filters/index"
Vue.config.productionTip = false
Vue.use(Vant);


const vconsole = () => {
  let vcJS = document.createElement('script')
  vcJS.setAttribute('src','https://cdn.bootcss.com/vConsole/3.3.4/vconsole.min.js')
  vcJS.setAttribute('type','text/javascript')
  document.head.appendChild(vcJS)
  vcJS.onload = ()=>{
    let vConsole = new VConsole();
  }
}
if( isTest ) vconsole()


// 全局过滤器集中处理
Object.keys(vueFiltersModule).forEach((item:string) => {
  Vue.filter(item, vueFiltersModule[item])
});
// // 传统的过滤器处理
// // Vue.filter('toFixed', (num: number, fix: number = 3) => {
// //   return num.toFixed(fix)
// // })

Vue.component('base-input', {
  inheritAttrs: false, // // v-bind="$attrs"
  props: ['label', 'value'],
  template: `
    <label class="c1">
      {{ label }}
      <input
        type="text"
        v-bind="$attrs"
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)"
      >
    </label>
  `,
  // v-on="inputListeners"
  // computed: {
  //   inputListeners: function () {
  //     var _ = this
  //     // `Object.assign` 将所有的对象合并为一个新对象
  //     return Object.assign({},
  //       // 我们从父级添加所有的监听器
  //       this.$listeners,
  //       // 然后我们添加自定义监听器，
  //       // 或覆写一些监听器的行为
  //       {
  //         // 这里确保组件配合 `v-model` 的工作
  //         input: function (event:any) {
  //           _.$emit('input', event.target.value)
  //         }
  //       }
  //     )
  //   }
  // },

})
Vue.component('demo-comps', {
  props:['name'],
  template:`<div>
    <div>我是子组件   {{name}}</div>
  </div>`,
  created() {
    console.log('listeners',this.$listeners) // 包含父级所有绑定的方法
  }
})
Vue.component('child-com', {
  props:['name'],
  template:`<div>
    <div>我是子组件   {{name}}</div>
    <grandcom v-bind="$attrs" v-on="$listeners"></grandcom>
  </div>`,
  created() {
    console.log('listeners',this.$listeners) // 包含父级所有绑定的方法
  },
  
  components: {
      'grandcom':{
        template:`<div>我是孙子组件{{$attrs.sex}}<button @click="grandChangeName">改变名字</button></div>`,
        methods:{
          grandChangeName(){
              this.$emit('testChangeName','kkkkkk')
          }
        }
      }
  }
})
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  created() {
    // console.log('anchored-heading',this.$slots)
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
new Vue({
  data:{
    name:"Jason"
  },
  methods:{
    getMyName: function () { 
      console.log('执行vue根实例方法')
    }
  },
  router,
  store,
  render: h => h(App)
  
}).$mount('#app')
