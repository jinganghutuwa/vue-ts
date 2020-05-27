<!--
 * @Author: Jason
 * @Date: 2019-11-08 14:16:45
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-15 10:48:46
 * @Descripttion: solt子组件
 -->
<template>
  <div>
    <p>这是子组件:{{give}}</p>
    <div class="header">
        <slot name="header" ></slot>
    </div>
    <div class="main">
        <slot v-bind:users="userInfo"></slot >
    </div>
    <div class="footer">
        <slot name="footer">我是子组件的插槽</slot>
    </div> 
  </div>
</template>

<script lang="ts">
    // import Vue from 'vue'
    // import Component from 'vue-class-component'
    import { Component, Vue, Prop } from 'vue-property-decorator';
    interface Person {
        firstName:string
        lastName:string
    }
    @Component
    export default class SoltComps extends Vue {
        userInfo:Person = {
            firstName : 'firstName',
            lastName:'lastName'
        }
        @Prop(String) give!:string

        // 声明周期钩子
        mounted () {
            console.log('子组件slots',this.$slots)
            console.log('子组件scopedSlots ',this.$scopedSlots )
        }

        // 方法
        returnBackFn() {
            this.$emit('returnBack', '还你200块');
        }
    }
</script>