<!--
 * @Author: Jason
 * @Date: 2019-11-08 14:16:45
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2020-04-22 13:25:09
 * @Descripttion: 
 -->
<template>
  <div class="home">
    <p @click.native="getForce">{{userInfo.name}}</p>
    <p>{{userInfo.age}}</p>
    <img alt="Vue logo" src="../assets/imgs/logo.png" @click="changeUserName">
    <HelloWorld :msg="msgText"/>
    <div>{{toFixedNum | toFixed}}</div>
    <div>{{tel | formatPhone}}</div>
    <div>{{carType | carServerPrice}}</div>
    <!-- <base-input
      class="c2"
      label="test"
      v-model="username"
      type = "date"
      required
      placeholder="Enter your username"
    ></base-input> -->

    <!-- <child-com :name="name" :age="age" :sex="sex" @click.native="getForce"  @testChangeName="changeName"></child-com> -->
    <anchored-heading :level="3">1234</anchored-heading>
    
    <demo-comps v-bind="userInfo"></demo-comps>
  </div>
</template>

<script lang = "ts">
// @ is an alias to /src

import HelloWorld from '@/components/HelloWorld.vue'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class';
import { Component, Vue, Watch } from 'vue-property-decorator';
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate' // for vue-router 2.2+
])
interface Obj{
  name:string,
  age:number
}
const someModule = namespace('./../store/index.ts')
@Component({
  components: {
    HelloWorld
  },
  // filters: {
  //   toFixed: (num: number, fix: number = 2) => {
  //     return num.toFixed(fix)
  //   }
  // }
})
export default class App extends Vue {
  private msgText = "Hello,World"
  private tel:string = "13151784919"
  private carType:string = "JJX00001"
  toFixedNum:string = "123.1"
  username:string = ''
  name:string = '张三'
  age:number = 30
  sex: string = '男'
  userInfo:Obj = {
    name:'张三',
    age:24
  }
  

  beforeRouteEnter (to:any, from:any, next:any) {
    console.log('beforeRouteEnter')
    next() // needs to be called to confirm the navigation
  }
  @Watch('username')
  usernameWatch(newVal:string,oldVal:string){
    console.log(`username改变之后的值为${newVal}，原来的值为${oldVal}`)
  }
  @Watch('userInfo',{ immediate: true, deep: true })
  userInfoWatch(newVal:Obj,oldVal:Obj){
    console.log(`userinfo改变之后的值为${JSON.stringify(newVal) }，原来的值为${JSON.stringify(oldVal)}`)
  }

  // @State('airportInfo') getterAirportInfo:any
  @State(state => state.airportInfo) getterAirportInfo:any
  @Action('setAirportInfo') MutationAirportInfo:any
  // @Mutation('TypeAirPortInfo') MutationAirportInfo:any
  created() {
    // console.log(this.$attrs)
    this.MutationAirportInfo({ name:'Jason',age:23,city:'XZ' })
    setTimeout(() => {
      console.log(this.getterAirportInfo)
    }, 3000);
    
  }
  changeName(val:string){
    this.name = val
    console.log(this)
  }
  changeUserName(){
    let _ = this
    this.userInfo = {
      name:'chj',
      age:13
    }
    setTimeout(function(){
      _.$router.push({path:'/about',query:{
        myName:"chj"
      }})
    },500)
  }
  getForce(){
    console.log("force")
  }
  
}

// export default {
//   name: 'home',
//   components: {
//     HelloWorld
//   }
// }
</script>
