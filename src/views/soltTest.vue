<!--
 * @Author: Jason
 * @Date: 2019-11-08 14:16:45
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2019-11-15 10:59:11
 * @Descripttion: solt使用介绍
 -->
<template>
    <div>
        <p>我是父组件, 对子组件说： {{sthGiveChild}}</p>
        <childComps :give="sthGiveChild" ref="childRef">
            <template v-solt:header> 
                <div>我是头部</div>
            </template>
            <!-- <span>插槽内容：{{sthGiveChild}}</span> -->
            <template v-slot:default="slotProps">
                {{ slotProps.users.lastName }}
            </template>
            <!-- <template #default="{users}">
                {{ users.lastName }}
            </template> -->
            <template v-solt:footer>
                <div>底部内容</div>
            </template>
           
        </childComps>
        <div v-pin:[direction]="{ color: 'red', size: '30' }">我是自定义组件{{pinText}}</div>
    </div>
</template>

<script lang="ts">
import childComps from "./../components/soltComps.vue";
import { Component, Vue } from "vue-property-decorator";

@Component({
    components: {
        childComps,
    },
    directives:{
        pin:{
            bind(){
                console.log("执行bind钩子函数")
            },
            inserted(el,binding){
                console.log("执行inserted钩子函数",el.style,binding)
                el.style.color = binding.value.color
                el.style.fontSize = binding.value.size + 'px'
            },
            update(){
                console.log("执行update钩子函数")
            },
            componentUpdated(){
                console.log("执行componentUpdated钩子函数")
            },
            unbind(){
                console.log("执行unbind钩子函数")
            }
        }
    }
})
export default class SoltTest extends Vue {

    private sthGiveChild: string = "给你100块";
    private pinText: string = "pinText";
    private direction: string = "left";
    
    mounted() {
        console.log('$this',this)
        console.log('$root',this.$root)
        console.log('$refs',this.$refs.childRef)
        console.log('$solt',this.$slots)
    }
    created() {
        setTimeout(()=>{
            this.pinText = 'pinText已更新'
        },3000)
    }
    turnBack(val:string) {
        this.sthGiveChild = val;
    }
}
</script>

<style lang="scss">
</style>
