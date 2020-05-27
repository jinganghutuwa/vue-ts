<!--
 * @Author: Jason
 * @Date: 2019-11-08 14:16:45
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-15 13:21:39
 * @Descripttion: 
 -->
<template>
  <div>
    <input v-model="msg">
    <p>msg: {{ msg }}</p>
    <p>computed msg: {{ computedMsg }}</p>
    <button @click="greet" ref="myBtn">Greet</button>

    <anchored-heading :level="1">
      <span>Hello world!</span>
    </anchored-heading>
  </div>
</template>

<script lang="ts">
  // import Vue from 'vue'
  // import Component from 'vue-class-component'
  import { Component, Vue, Watch } from 'vue-property-decorator';
  
  @Component
  export default class About extends Vue {
    // 初始化数据
    msg:string = '123'

    @Watch('msg', { deep: true, immediate: true }) 
    msgWatch (newVal:string, oldVal:string) {
      console.log(`原来的值为：${oldVal}，改变之后的值为：${newVal}`)
    }

    // 声明周期钩子
    mounted () {
      this.greet()
      console.log(this.$route.query.name)
    }

    // 计算属性
    get computedMsg () {
      return 'computed ' + this.msg
    }

    // 方法
    greet ():void {
      alert('greeting: ' + this.msg)
      console.log((this.$refs.myBtn as HTMLElement).innerText)
    }
  }
</script>