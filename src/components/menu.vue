<template>
  <ul :id="id" class="menu" @mouseenter="mouseenter" @mouseover="mouseover" :style="style">
    <li>菜单1</li>
    <li>菜单2</li>
    <li>
      菜单3
      <Icon name="go" width="10" height="10"></Icon>
      <ul class="menu sub">
        <li>菜单3-1</li>
        <li>菜单3-2</li>
        <li>
          菜单3-3
          <Icon name="go" width="10" height="10"></Icon>
          <ul class="menu sub">
            <li>菜单3-3-1</li>
            <li>菜单3-3-2</li>
          </ul>
        </li>
      </ul>
    </li>
    <li>菜单4</li>
  </ul>
</template>

<script>
import '@xpf0000/vuesvgicon/dist/VueSvgIcons.css'
import Icon from '@xpf0000/vuesvgicon'
import '../icon/go'
import { clientBoundsPoints } from '@xpf0000/dom-points'
export default {
  name: 'x-menu',
  components: {
    Icon
  },
  data () {
    return {
      x: 0,
      y: 0,
      id: ''
    }
  },
  computed: {
    style () {
      return {
        transform: `translate(${this.x}px, ${this.y}px)`
      }
    }
  },
  mounted () {
    this.$el.isDragDrop = true
    console.log('mounted: ', this.$el)
    let p = clientBoundsPoints(document.body)
    let p1 = clientBoundsPoints(this.$el)
    if (p1[1].x > p[1].x) {
      this.x -= p1[1].x - p[1].x
    }
    if (p1[2].y > p[2].y) {
      this.y -= p1[2].y - p[2].y
    }
  },
  methods: {
    mouseenter (e) {
    },
    mouseover (e) {
      let target = e.target
      if (target.nodeName === 'LI') {
        let lis = target.parentNode.querySelectorAll('li')
        for (let dom of lis) {
          if (dom.nodeName === 'LI') {
            dom.className = ''
          }
        }
        let subs = target.parentNode.querySelectorAll('.sub')
        for (let dom of subs) {
          dom.style.cssText = ''
        }
        target.className = 'active'
        let sub = target.querySelector('.sub')
        if (sub) {
          let p = clientBoundsPoints(document.body)
          let p1 = clientBoundsPoints(sub)
          if (p1[1].x > p[1].x) {
            sub.style.left = 'unset'
            sub.style.right = '100%'
          }
          if (p1[2].y > p[2].y) {
            sub.style.top = `${p[2].y - p1[2].y}px`
          }
        }
      }
    }
  }
}
</script>

<style scoped="scoped" lang="scss">
  .menu{
    left: 0;
    top: 0;
    position: absolute;
    padding: 12px 0;
    border-radius: 8px;
    box-shadow: 0 0 14px 0 rgba(0,0,0,.3);
    display: flex;
    flex-direction: column;
    list-style: none;
    width: 200px;
    margin: 0;
    color: #333;
    font-size: 13px;
    background: #fff;
    >li{
      cursor: pointer;
      width: 100%;
      height: 38px;
      padding: 0 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      &:hover,&.active{
        background-color: rgba(80,126,211,.2);
        >.sub{
          display: flex;
        }
      }
    }
    &.sub{
      position: absolute;
      top: 0;
      left: 100%;
      z-index: 99;
      /*right: 100%;*/
      display: none;
    }
  }
</style>
