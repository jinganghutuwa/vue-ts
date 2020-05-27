<!--
 * @Author: Jason
 * @Date: 2019-11-08 14:16:45
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-14 13:47:07
 * @Descripttion: 
 -->
<template>
  <div>
      <p>我是父组件, 对子组件说： {{sthGiveChild}}</p>
    <childComps v-model="sthGiveChild"></childComps>
    <!-- <childComps :give="sthGiveChild" @returnBack = "turnBack"></childComps> -->
  </div>
</template>

<script lang="ts">
import childComps from "./../components/childComps.vue";
import { Component, Vue } from "vue-property-decorator";
@Component({
    components: {
        childComps
    },
})
export default class App extends Vue {
    private sthGiveChild: string = "给你100块";
    turnBack(val:string) {
        this.sthGiveChild = val;
    }
}
</script>

<style lang="scss">
</style>
