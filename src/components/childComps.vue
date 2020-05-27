<!--
 * @Author: Jason
 * @Date: 2019-11-08 14:16:45
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-14 13:50:59
 * @Descripttion: 
 -->
<template>
  <div class="child">
    <p>我是子组件，父组件对我说： {{give}}</p>
    <a href="javascript:;"  rel="external nofollow"   @click="returnBackFn">回应</a>
  </div>
</template>

<script lang="ts">
  // import Vue from 'vue'
  // import Component from 'vue-class-component'
  import { Component, Vue, Prop, Model } from 'vue-property-decorator';

  @Component
  export default class App extends Vue {
    // @Prop(String) give!:string
    @Model("returnBack",{type:String}) give!:string
    // 初始化数据
    msg = 123

    // 声明周期钩子
    mounted () {
      
    }

    // 计算属性
    get computedMsg () {
      return 'computed ' + this.msg
    }

    // 方法
    returnBackFn() {
      this.$emit('returnBack', '还你200块');
      // this.$emit('update:give', '还你200块');
    }
  }
</script>