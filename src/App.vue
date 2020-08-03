<template>
  <div id="app">
    <vue-draggable-resizable
      :dropable="true"
      :dropinable="true"
      :parent="true" :x="200" :y="320" :w="200" :h="200">
      VueDragDropAlign 0
    </vue-draggable-resizable>

    <vue-draggable-resizable
      :dropable="true"
      :dropinable="true"
      :parent="true" :x="500" :y="320" :w="200" :h="200">
      VueDragDropAlign 1
    </vue-draggable-resizable>
  </div>
</template>

<script>
import Vue from 'vue'
import VueDraggableResizable from './components/vue-draggable-resizable'
import './components/vue-draggable-resizable.css'
import { pointsDistance, rotatePoint, matrixToDeg, clientDeg, clientBoundsPoints, rectBoundsToRect, pointIsInPolygon } from '@xpf0000/dom-points'
import Menu from './components/menu'
export default {
  name: 'app',
  data () {
    return {
      a: false
    }
  },
  components: {
    VueDraggableResizable,
    Menu
  },
  mounted () {
    this.$EveBus.$on('contextMenuHide', vm => {
      console.log('APP deSelectElement !!!!!!')
      this.removeMenu()
    })
    setTimeout(_ => {
      this.a = true
    }, 3000)
  },
  methods: {
    onDrag (left, top) {
      console.log('onDrag: ', left, top)
    },
    removeMenu () {
      let dom = document.body.querySelector('#drag-menu')
      dom && dom.remove()
    },
    contextmenu (e, vm, vmarr) {
      this.a = true
      console.log('contextmenu !!!!!!')
      console.log(e)
      console.log(vm)
      console.log(vmarr)
      this.removeMenu()
      let dom = document.createElement('div')
      dom.id = 'drag-menu'
      dom.style.cssText = `position:absolute;width:200px;height:400px;left:${e.pageX}px;top:${e.pageY}px;background: rgba(0,0,0,0.4);`
      document.body.appendChild(dom)

      let Tmpl = Vue.extend(Menu)
      let menu = new Tmpl({ data: { id: 'drag-menu', x: e.pageX, y: e.pageY } })
        .$mount(dom)
    },
    randomNum (minNum, maxNum) {
      switch (arguments.length) {
        case 1:
          return parseInt(Math.random() * minNum + 1, 10)
          break
        case 2:
          return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
          break
        default:
          return 0
          break
      }
    },
    randColor () {
      return `rgb(${this.randomNum(0, 255)}, ${this.randomNum(0, 255)}, ${this.randomNum(0, 255)})`
    },
    test3 () {
      let dom3 = document.getElementById('test3')
      let dom4 = document.getElementById('test4')
      rectBoundsToRect(dom4, dom3, true)
    }
  }
}
</script>

<style lang="scss">
  *{
    box-sizing: border-box;
  }
  html,body{
    margin: 0;
    padding: 0;
    height: 100%;
  }
  #app{
    height: 100%;
  }
  .vdr:before {
    position: absolute;
    content:"";
    border:1px dashed #1ec1fd;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    pointer-events:none;
  }
  .drop-aaa {
    height: 750px;
    width: 600px;
    margin-left: 110px;
    background: #333333;
    position: absolute;
  }
  .test{
    position: absolute;
    border:1px solid #fd3f32;
    transform: rotate(30deg);
  }
  #aaa{
    position: absolute;
    width: 300px;
    height: 100px;
    border:1px solid #fd3f32;
    left: 400px;
    top: 300px;
    transform: rotate(30deg);
    .centera{
      position: absolute;
      width: 5px;
      height: 5px;
      left: calc(50% - 2px);
      top: calc(50% - 2px);
      background: #fd3f32;
      border-radius: 3px;
    }
  }
  #bbb{
    position: absolute;
    width: 500px;
    height: 166.66px;
    border:1px solid #1c84fd;
    left: 400px;
    top: 300px;
    transform: rotate(30deg);
    .centerb{
      position: absolute;
      width: 5px;
      height: 5px;
      left: calc(50% - 2px);
      top: calc(50% - 2px);
      background: #1c84fd;
      border-radius: 3px;
    }
  }
  #test{
    position: absolute;
    width: 500.358751px;
    height: 300px;
    border:20.2px solid #1c84fd;
    left: 400px;
    top: 300px;
    box-sizing: unset;
  }
  #test3{
    padding: 30px;
    box-sizing: border-box;
    position: absolute;
    width: 450px;
    height: 300px;
    border:1px solid #fd4d1d;
    left: 500px;
    top: 500px;
    transform: rotate(-35deg);
    #test4{
      position: absolute;
      width: 200px;
      height: 120px;
      border:1px solid #2cb5fd;
      left: 80px;
      top: 80px;
      transform: rotate(20deg);
    }
    .ppp{
      position: absolute;
      width: 21px;
      height: 21px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .p0{
      left: -10px;
      top: -10px;
      background: #fd3f32;
    }
    .p1{
      right: -10px;
      top: -10px;
      background: #fdc31f;
    }
    .p2{
      right: -10px;
      bottom: -10px;
      background: #29a3fd;
    }
    .p3{
      left: -10px;
      bottom: -10px;
      background: #2afd69;
    }
  }
</style>
