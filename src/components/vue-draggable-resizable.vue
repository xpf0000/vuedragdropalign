<template>
  <div
    :style="style"
    :class="[{
      [classNameActive]: enabled,
      [classNameDragging]: dragging,
      [classNameResizing]: resizing,
      [classNameDraggable]: draggable,
      [classNameResizable]: resizable
    }, className]"
    @mousedown="elementMouseDown"
    @touchstart="elementTouchDown"
  >
    <div
      v-if="enabled && resizable"
      v-for="handle in actualHandles"
      :key="handle"
      :class="[classNameHandle, classNameHandle + '-' + handle]"
      :style="{display: enabled ? 'block' : 'none'}"
      @mousedown.stop.prevent="handleDown(handle, $event)"
      @touchstart.stop.prevent="handleTouchDown(handle, $event)"
    >
      <slot :name="handle"></slot>
    </div>
    <div
      v-show="enabled && rotatable"
      @mousedown.stop.prevent="rotateDown($event)"
      @touchstart.stop.prevent="rotateTouchDown($event)"
      :class="[classNameRotate]"><Icon name="rotate" width="14" height="14"></Icon></div>
    <div class="x-toolTip" v-if="enabled && showTips && toolTops" v-text="toolTops"></div>
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
import '@xpf0000/vuesvgicon/dist/VueSvgIcons.css'
import Icon from '@xpf0000/vuesvgicon'
import { matchesSelectorToParentElements, addEvent, removeEvent } from '../utils/dom'
import {
  clientCenterPoint,
  polygonIsInPolygon,
  clientOriginalPoints,
  domExactSize,
  pointToLineDistance, rotatePoint, clientBoundsPoints, clientDeg, rectBoundsToRect
} from '@xpf0000/dom-points'
import {
  computeWidth,
  computeHeight,
  restrictToBounds,
  snapToGrid
} from '../utils/fns'
import '../icon/rotate'
let DataCenter = {
  select: {},
  active: -1
}
Vue.prototype.$EveBus = new Vue()
const events = {
  mouse: {
    start: 'mousedown',
    move: 'mousemove',
    stop: 'mouseup'
  },
  touch: {
    start: 'touchstart',
    move: 'touchmove',
    stop: 'touchend'
  }
}

const userSelectNone = {
  userSelect: 'none',
  MozUserSelect: 'none',
  WebkitUserSelect: 'none',
  MsUserSelect: 'none'
}

const userSelectAuto = {
  userSelect: 'auto',
  MozUserSelect: 'auto',
  WebkitUserSelect: 'auto',
  MsUserSelect: 'auto'
}

let eventsFor = events.mouse

export default {
  replace: true,
  name: 'vue-draggable-resizable',
  components: { Icon },
  props: {
    className: {
      type: String,
      default: 'vdr'
    },
    classNameDraggable: {
      type: String,
      default: 'draggable'
    },
    classNameResizable: {
      type: String,
      default: 'resizable'
    },
    classNameDragging: {
      type: String,
      default: 'dragging'
    },
    classNameResizing: {
      type: String,
      default: 'resizing'
    },
    classNameActive: {
      type: String,
      default: 'active'
    },
    classNameHandle: {
      type: String,
      default: 'handle'
    },
    classNameRotate: {
      type: String,
      default: 'rotate'
    },
    disableUserSelect: {
      type: Boolean,
      default: true
    },
    enableNativeDrag: {
      type: Boolean,
      default: false
    },
    preventDeactivation: {
      type: Boolean,
      default: false
    },
    align: {
      type: Boolean,
      default: true
    },
    alignRange: {
      type: Number,
      default: 5,
      validator: (val) => {
        return val >= 0
      }
    },
    active: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: Boolean,
      default: true
    },
    rotatable: {
      type: Boolean,
      default: true
    },
    showTips: {
      type: Boolean,
      default: true
    },
    dropable: {
      type: Boolean,
      default: false
    },
    dropinable: {
      type: Boolean,
      default: false
    },
    resizable: {
      type: Boolean,
      default: true
    },
    lockAspectRatio: {
      type: Boolean,
      default: false
    },
    mutleDragAble: {
      type: Boolean,
      default: true
    },
    w: {
      type: [Number, String],
      default: 200,
      validator: (val) => {
        if (typeof val === 'number') {
          return val > 0
        }

        return val === 'auto'
      }
    },
    h: {
      type: [Number, String],
      default: 200,
      validator: (val) => {
        if (typeof val === 'number') {
          return val > 0
        }

        return val === 'auto'
      }
    },
    minWidth: {
      type: Number,
      default: 0,
      validator: (val) => val >= 0
    },
    minHeight: {
      type: Number,
      default: 0,
      validator: (val) => val >= 0
    },
    maxWidth: {
      type: Number,
      default: null,
      validator: (val) => val >= 0
    },
    maxHeight: {
      type: Number,
      default: null,
      validator: (val) => val >= 0
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    r: {
      type: Number,
      default: 0
    },
    z: {
      type: [String, Number],
      default: 'auto',
      validator: (val) => (typeof val === 'string' ? val === 'auto' : val >= 0)
    },
    handles: {
      type: Array,
      default: () => ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'],
      validator: (val) => {
        const s = new Set(['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml'])
        return new Set(val.filter(h => s.has(h))).size === val.length
      }
    },
    dragHandle: {
      type: String,
      default: null
    },
    dragCancel: {
      type: String,
      default: null
    },
    axis: {
      type: String,
      default: 'both',
      validator: (val) => ['x', 'y', 'both'].includes(val)
    },
    grid: {
      type: Array,
      default: () => [1, 1]
    },
    parent: {
      type: Boolean,
      default: false
    },
    scale: {
      type: Number,
      default: 1,
      validator: (val) => val > 0
    },
    onDragStart: {
      type: Function,
      default: () => true
    },
    onDrag: {
      type: Function,
      default: () => true
    },
    onResizeStart: {
      type: Function,
      default: () => true
    },
    onResize: {
      type: Function,
      default: () => true
    },
    onRotateStart: {
      type: Function,
      default: () => true
    },
    onRotate: {
      type: Function,
      default: () => true
    }
  },

  data: function () {
    return {
      left: this.x,
      top: this.y,
      right: null,
      bottom: null,
      width: null,
      height: null,
      rotate: this.r,
      widthTouched: false,
      heightTouched: false,

      aspectFactor: null,

      parentWidth: null,
      parentHeight: null,

      minW: this.minWidth,
      minH: this.minHeight,

      maxW: this.maxWidth,
      maxH: this.maxHeight,

      handle: null,
      enabled: this.active,
      resizing: false,
      dragging: false,
      rotating: false,
      zIndex: this.z,
      toolTops: ''
    }
  },

  created: function () {
    // eslint-disable-next-line
    if (this.maxWidth && this.minWidth > this.maxWidth) console.warn('[Vdr warn]: Invalid prop: minWidth cannot be greater than maxWidth')
    // eslint-disable-next-line
    if (this.maxWidth && this.minHeight > this.maxHeight) console.warn('[Vdr warn]: Invalid prop: minHeight cannot be greater than maxHeight')

    this.resetBoundsAndMouseState()
  },
  mounted: function () {
    if (!this.enableNativeDrag) {
      this.$el.ondragstart = () => false
    }

    const [parentWidth, parentHeight] = this.getParentSize()

    this.parentWidth = parentWidth
    this.parentHeight = parentHeight
    let size = domExactSize(this.$el)
    const [width, height] = [size.width, size.height]
    this.aspectFactor = (this.w !== 'auto' ? this.w : width) / (this.h !== 'auto' ? this.h : height)
    this.width = this.w !== 'auto' ? this.w : width
    this.height = this.h !== 'auto' ? this.h : height
    this.right = this.parentWidth - this.width - this.left
    this.bottom = this.parentHeight - this.height - this.top
    addEvent(window, 'resize', this.checkParentSize)
    addEvent(this.$el, 'contextmenu', this.contextMenu)
    this.$el.isDragDrop = true
    this.$EveBus.$on('deSelectElement', this.deSelectElement)
    this.$EveBus.$on('handleDrag', this.handleDrag)
    this.$EveBus.$on('mutlElementDown', this.mutlElementDown)
    this.$EveBus.$on('dropCheck', this.dropCheck)
    this.$EveBus.$on('alignCheck', this.alignCheck)
    this.$nextTick(_ => {
      this.getBoundsPoint()
    })
  },
  beforeDestroy: function () {
    removeEvent(this.$el, 'contextmenu', this.contextMenu)
    removeEvent(document.documentElement, 'mousedown', this.deselect)
    removeEvent(document.documentElement, 'touchstart', this.handleUp)
    removeEvent(document.documentElement, 'mousemove', this.move)
    removeEvent(document.documentElement, 'touchmove', this.move)
    removeEvent(document.documentElement, 'mouseup', this.handleUp)
    removeEvent(document.documentElement, 'touchend touchcancel', this.deselect)
    removeEvent(window, 'resize', this.checkParentSize)

    this.$EveBus.$off('deSelectElement', this.deSelectElement)
    this.$EveBus.$off('handleDrag', this.handleDrag)
    this.$EveBus.$off('mutlElementDown', this.mutlElementDown)
    this.$EveBus.$off('dropCheck', this.dropCheck)
    this.$EveBus.$off('alignCheck', this.alignCheck)
  },

  methods: {
    alignCheck (vm) {
      let vmLeft = vm.left
      let vmTop = vm.top
      let alignRange = vm.alignRange
      let checkpoints = [...vm.clientBoundsPoint, vm.clientCenterPoint]
      // 检测屏幕位置对齐
      if (vm._uid === this._uid) {
        let clientCenter = clientCenterPoint(document.body)
        for (let p of checkpoints) {
          let x = clientCenter.x - p.x
          if (Math.abs(x) <= alignRange) {
            let alignLeft = vmLeft + x
            if (!vm.alignLeft) {
              vm.alignLeft = alignLeft
            } else {
              vm.alignLeft = Math.abs(x) < Math.abs(vm.alignLeft - vmLeft) ? alignLeft : vm.alignLeft
            }
            this.alignLineAdd(`width:1px;left:${clientCenter.x - 1}px;top:0;bottom:0;`)
          }
          let y = clientCenter.y - p.y
          if (Math.abs(y) <= alignRange) {
            let alignTop = vmTop + y
            if (!vm.alignTop) {
              vm.alignTop = alignTop
            } else {
              vm.alignTop = Math.abs(y) < Math.abs(vm.alignTop - vmTop) ? alignTop : vm.alignTop
            }
            this.alignLineAdd(`height:1px;left:0;right:0;top:${clientCenter.y - 1}px;`)
          }
        }
      } else if (!DataCenter.select[this._uid] && !vm.$el.contains(this.$el)) {
        let points = [...this.clientBoundsPoint, this.clientCenterPoint]
        for (let cp of checkpoints) {
          for (let p of points) {
            let x = p.x - cp.x
            if (Math.abs(x) <= alignRange) {
              let alignLeft = vmLeft + x
              if (!vm.alignLeft) {
                vm.alignLeft = alignLeft
              } else {
                vm.alignLeft = Math.abs(x) < Math.abs(vm.alignLeft - vmLeft) ? alignLeft : vm.alignLeft
              }
              let top = Math.min(p.y, cp.y)
              let height = Math.abs(p.y - cp.y)
              this.alignLineAdd(`width:1px;height:${height}px;left:${p.x - 1}px;top:${top}px;`)
            }
            let y = p.y - cp.y
            if (Math.abs(y) <= alignRange) {
              let alignTop = vmTop + y
              if (!vm.alignTop) {
                vm.alignTop = alignTop
              } else {
                vm.alignTop = Math.abs(y) < Math.abs(vm.alignTop - vmTop) ? alignTop : vm.alignTop
              }
              let left = Math.min(p.x, cp.x)
              let width = Math.abs(p.x - cp.x)
              this.alignLineAdd(`height:1px;width:${width}px;left:${left}px;top:${p.y - 1}px;`)
            }
          }
        }
      }
    },
    alignInit () {
      this.alignLineRemove()
      this.alignLeft = null
      this.alignTop = null
      this.$EveBus.$emit('alignCheck', this)
    },
    alignLineAdd (css) {
      let centerDom = document.createElement('div')
      centerDom.className = 'dragdrop-align-line'
      centerDom.style.cssText = css
      document.body.appendChild(centerDom)
    },
    alignLineRemove () {
      let lines = document.querySelectorAll('.dragdrop-align-line')
      for (let line of lines) {
        line.remove()
      }
    },
    dropCheck (vm) {
      // vm 待检测
      if (this.dropinable && vm._uid !== this._uid && !vm.$el.contains(this.$el)) {
        let checkpoints = vm.clientBoundsPoint
        let points = this.clientBoundsPoint
        if (polygonIsInPolygon(checkpoints, points)) {
          if (!vm.dropNode) {
            vm.dropNode = this
          } else {
            if (vm.dropNode._uid !== this._uid) {
              if (vm.dropNode.$el.contains(this.$el)) {
                vm.dropNode = this
              } else {
                if (this.zIndex > vm.dropNode.zIndex) {
                  vm.dropNode = this
                }
              }
            }
          }
        } else {
          if (vm.dropNode && vm.dropNode._uid === this._uid) {
            vm.dropNode = null
          }
        }
      }
    },
    mutlElementDown () {
      if (this.enabled) {
        this.resetBoundsAndMouseState()
        this.reCheckParent()
        this.mouseClickPosition.left = this.left
        this.mouseClickPosition.right = this.right
        this.mouseClickPosition.top = this.top
        this.mouseClickPosition.bottom = this.bottom
        if (this.parent) {
          this.bounds = this.calcDragLimits()
        }
      }
    },
    handleDrag (deltaX, deltaY) {
      if (DataCenter.select[this._uid]) {
        const mouseClickPosition = this.mouseClickPosition
        const bounds = this.bounds
        let left = restrictToBounds(mouseClickPosition.left - deltaX, bounds.minLeft, bounds.maxLeft)
        let top = restrictToBounds(mouseClickPosition.top - deltaY, bounds.minTop, bounds.maxTop)
        let single = Object.keys(DataCenter.select).length === 1
        if (single && this.align && this.alignLeft && Math.abs(left - this.alignLeft) < this.alignRange) {
          left = this.alignLeft
        }
        if (single && this.align && this.alignTop && Math.abs(top - this.alignTop) < this.alignRange) {
          top = this.alignTop
        }
        if (this.onDrag(left, top) === false) {
          return
        }
        const right = restrictToBounds(mouseClickPosition.right + deltaX, bounds.minRight, bounds.maxRight)
        const bottom = restrictToBounds(mouseClickPosition.bottom + deltaY, bounds.minBottom, bounds.maxBottom)
        this.left = left
        this.top = top
        this.right = right
        this.bottom = bottom
        this.toolTops = `x:${this.left.toFixed(0)} y:${this.top.toFixed(0)}`
        this.$emit('dragging', this.left, this.top)
        if (this.moved) {
          this.$nextTick(_ => {
            if (this.dropable || this.align) {
              this.getBoundsPoint()
            }
            // 放置检测
            if (this.dropable) {
              this.$EveBus.$emit('dropCheck', this)
            }
            // 对齐检测 显示对齐线&停靠
            if (this.align) {
              this.alignInit()
            }
          })
        }
      }
    },
    // 多选时 取消选择
    deSelectElement (vm, sigleDrag) {
      if (this.enabled && vm._uid !== this._uid) {
        if (sigleDrag || !this.mutleDragAble || !vm.mutleDragAble) {
          this.resizing = false
          this.enabled = false
          this.dragging = false
          this.rotating = false
          this.$emit('deactivated')
          this.$emit('update:active', false)
          this.resetBoundsAndMouseState()
          this.getBoundsPoint()
          delete DataCenter.select[this._uid]
        }
      }
    },
    reSetEvent () {
      addEvent(document.documentElement, eventsFor.move, this.move)
      addEvent(document.documentElement, eventsFor.stop, this.handleUp)
      removeEvent(document.documentElement, 'mousedown', this.deselect)
      removeEvent(document.documentElement, 'touchend touchcancel', this.deselect)
      addEvent(document.documentElement, 'mousedown', this.deselect)
      addEvent(document.documentElement, 'touchend touchcancel', this.deselect)
    },
    // 重置
    resetBoundsAndMouseState () {
      this.mouseClickPosition = { mouseX: 0, mouseY: 0, x: 0, y: 0, w: 0, h: 0 }

      this.bounds = {
        minLeft: null,
        maxLeft: null,
        minRight: null,
        maxRight: null,
        minTop: null,
        maxTop: null,
        minBottom: null,
        maxBottom: null
      }
    },
    reCheckParent () {
      const [parentWidth, parentHeight] = this.getParentSize()
      this.parentWidth = parentWidth
      this.parentHeight = parentHeight
      this.right = this.parentWidth - this.width - this.left
      this.bottom = this.parentHeight - this.height - this.top
    },
    getParentSize () {
      if (this.parent) {
        let parentNode = this.$el.parentNode
        let size = domExactSize(parentNode)
        const width = size.width
        const height = size.height
        return [
          width,
          height
        ]
      }
      return [null, null]
    },
    elementTouchDown (e) {
      eventsFor = events.touch
      this.elementDown(e)
    },
    elementMouseDown (e) {
      eventsFor = events.mouse
      this.elementDown(e)
    },
    elementDown (e) {
      if (e instanceof MouseEvent && e.isTrusted && e.which !== 1) {
        return
      }
      const target = e.target || e.srcElement

      if (this.$el.contains(target)) {
        if (this.onDragStart(e) === false) {
          return
        }
        if (
          (this.dragHandle && !matchesSelectorToParentElements(target, this.dragHandle, this.$el)) ||
          (this.dragCancel && matchesSelectorToParentElements(target, this.dragCancel, this.$el))
        ) {
          this.dragging = false
          return
        }
        this.$EveBus.$emit('contextMenuHide', this)
        if (!this.enabled) {
          this.enabled = true
          this.$emit('activated')
          this.$emit('update:active', true)
          if (!e.metaKey && !e.ctrlKey) {
            DataCenter.select = {}
          }
          let sigleDrag = !e.metaKey && !e.ctrlKey
          this.$EveBus.$emit('deSelectElement', this, sigleDrag)
          DataCenter.select[this._uid] = this
          DataCenter.active = this._uid
        } else {
          if (e.metaKey || e.ctrlKey) {
            delete DataCenter.select[this._uid]
            this.resizing = false
            this.enabled = false
            this.dragging = false
            this.$emit('deactivated')
            this.$emit('update:active', false)
            return
          } else {
            DataCenter.select[this._uid] = this
            DataCenter.active = this._uid
          }
        }
        e.stopPropagation && e.stopPropagation()
        e.preventDefault && e.preventDefault()
        this.$EveBus.$emit('mutlElementDown', this)
        if (this.draggable) {
          this.dragging = true
        }
        if (this.align) {
          this.getBoundsPoint()
          this.alignInit()
        }
        this.mouseClickPosition.mouseX = e.touches ? e.touches[0].pageX : e.pageX
        this.mouseClickPosition.mouseY = e.touches ? e.touches[0].pageY : e.pageY
        this.reSetEvent()
      }
    },
    getBoundsPoint () {
      this.clientBoundsPoint = clientBoundsPoints(this.$el)
      this.clientCenterPoint = clientCenterPoint(this.$el)
    },
    calcDragLimits () {
      let rect = rectBoundsToRect(this.$el, this.$el.parentNode)
      let width = rect.width
      let height = rect.height
      let left = Math.max((width - this.width) * 0.5, 0)
      let top = Math.max((height - this.height) * 0.5, 0)
      left = left < 0.0000001 ? 0 : left
      top = top < 0.0000001 ? 0 : top
      let bounds = {}
      bounds.minLeft = Math.ceil(left / this.grid[0]) * this.grid[0]
      bounds.minRight = bounds.minLeft
      bounds.maxLeft = Math.floor((this.parentWidth - this.width - left) / this.grid[0]) * this.grid[0]
      bounds.maxRight = bounds.maxLeft
      bounds.minTop = Math.ceil(top / this.grid[1]) * this.grid[1]
      bounds.minBottom = bounds.minTop
      bounds.maxTop = Math.floor((this.parentHeight - this.height - top) / this.grid[1]) * this.grid[1]
      bounds.maxBottom = bounds.maxTop
      return bounds
    },
    calcResizeLimits () {
      let minW = this.minW
      let minH = this.minH
      let maxW = this.maxW
      let maxH = this.maxH
      const aspectFactor = this.aspectFactor
      const [gridX, gridY] = this.grid
      if (this.lockAspectRatio) {
        // 最小宽度 / 最小高度 大于宽高比 以最小宽度为准 重新计算最小高度
        if (minW / minH > aspectFactor) {
          minH = minW / aspectFactor
        } else { // 以最小高度为准 重新计算最小宽度
          minW = aspectFactor * minH
        }
        if (maxW && maxH) {
          maxW = Math.min(maxW, aspectFactor * maxH)
          maxH = Math.min(maxH, maxW / aspectFactor)
        } else if (maxW) {
          maxH = maxW / aspectFactor
        } else if (maxH) {
          maxW = aspectFactor * maxH
        }
        if (this.parent) {
          let maxPW = this.parentWidth
          let maxPH = this.parentHeight
          // 父元素 宽度 / 高度 > 宽高比 以父元素高度为准 计算宽度
          if (maxPW / maxPH > aspectFactor) {
            maxPW = aspectFactor * maxPH
          } else { // 以宽度为准 计算高度
            maxPH = maxPW / aspectFactor
          }
          minW = Math.min(minW, maxPW)
          maxW = Math.min(maxW, maxPW)
          minH = Math.min(minH, maxPH)
          maxH = Math.min(maxH, maxPH)
        }
      }
      minW = Math.ceil(minW / gridX) * gridX
      minH = Math.ceil(minH / gridY) * gridY
      maxW = Math.floor(maxW / gridX) * gridX
      maxH = Math.floor(maxH / gridY) * gridY
      let bounds = {
        minW: minW,
        minH: minH,
        maxW: maxW,
        maxH: maxH
      }
      return bounds
    },
    checkIsDragDrop (target) {
      let is = false
      is = target.isDragDrop === true
      if (is) {
        return true
      }
      if (target.parentNode) {
        is = is || this.checkIsDragDrop(target.parentNode)
      }
      return is
    },
    deselect (e) {
      const target = e.target || e.srcElement
      if (!this.checkIsDragDrop(target)) {
        if (this.enabled && !this.preventDeactivation) {
          this.enabled = false
          this.$emit('deactivated')
          this.$emit('update:active', false)
        }
        removeEvent(document.documentElement, eventsFor.move, this.move)
        DataCenter.active = -1
        delete DataCenter.select[this._uid]
        this.$EveBus.$emit('deSelectElement', this, true)
        this.$EveBus.$emit('contextMenuHide', this)
      }
      if (!this.enabled) {
        this.resetBoundsAndMouseState()
      }
      removeEvent(document.documentElement, 'mousedown', this.deselect)
      removeEvent(document.documentElement, 'touchend touchcancel', this.deselect)
    },
    handleTouchDown (handle, e) {
      eventsFor = events.touch
      this.handleDown(handle, e)
    },
    rotateTouchDown (e) {
      eventsFor = events.touch
      this.rotateDown(e)
    },
    rotateDown (e) {
      if (e instanceof MouseEvent && e.which !== 1) {
        return
      }

      if (this.onRotateStart(e) === false) {
        return
      }

      e.stopPropagation && e.stopPropagation()
      e.preventDefault && e.preventDefault()

      this.rotating = true
      this.reCheckParent()
      this.resetBoundsAndMouseState()
      this.mouseClickPosition.mouseX = e.touches ? e.touches[0].pageX : e.pageX
      this.mouseClickPosition.mouseY = e.touches ? e.touches[0].pageY : e.pageY
      this.mouseClickPosition.left = this.left
      this.mouseClickPosition.right = this.right
      this.mouseClickPosition.top = this.top
      this.mouseClickPosition.bottom = this.bottom
      if (this.align) {
        this.getBoundsPoint()
        this.alignInit()
      }
      this.initRotate()
      this.initParentBoundsPoints()
      this.reSetEvent()
      DataCenter.select = {}
      DataCenter.select[this._uid] = this
      this.$EveBus.$emit('deSelectElement', this, true)
    },
    initParentBoundsPoints () {
      let parentNode = this.$el.parentNode
      let size = domExactSize(parentNode)
      let pw = size.width
      let ph = size.height
      this.parentBoundsPoints = [
        {
          x: 0,
          y: 0
        },
        {
          x: pw,
          y: 0
        },
        {
          x: pw,
          y: ph
        },
        {
          x: 0,
          y: ph
        }
      ]
    },
    initRotate () {
      let scrollLeft = document.documentElement.scrollLeft
      let scrollTop = document.documentElement.scrollTop
      let bounds = this.$el.getBoundingClientRect()
      let width = bounds.width
      let height = bounds.height
      let left = bounds.left + scrollLeft
      let top = bounds.top + scrollTop
      let mouseY = this.mouseClickPosition.mouseY
      let mouseX = this.mouseClickPosition.mouseX

      let cx = left + width * 0.5 // 中心点
      let cy = top + height * 0.5
      let tan = height / width // 正弦
      let hd = Math.atan(tan) // 弧度
      let jd = 180 / Math.PI * hd // 角度
      this.rotateInit = {}
      this.rotateInit.initjd = jd // 初始角度
      this.rotateInit.cx = cx // 中心点
      this.rotateInit.cy = cy

      let a = Math.abs(mouseY - this.rotateInit.cy)
      let b = Math.abs(mouseX - this.rotateInit.cx)
      tan = a / b // 正切
      hd = Math.atan(tan) // 弧度
      jd = 180 / Math.PI * hd // 角度

      mouseX < this.rotateInit.cx && mouseY <= this.rotateInit.cy && (jd -= this.rotateInit.initjd)
      mouseX >= this.rotateInit.cx && mouseY < this.rotateInit.cy && (jd = 180 - jd - this.rotateInit.initjd)
      mouseX >= this.rotateInit.cx && mouseY >= this.rotateInit.cy && (jd = 180 + jd - this.rotateInit.initjd)
      mouseX < this.rotateInit.cx && mouseY > this.rotateInit.cy && (jd = -jd - this.rotateInit.initjd)

      this.rotateInit.mousejd = jd
      this.rotateInit.startjd = this.rotate

      this.centerPoint = {
        x: this.left + this.width * 0.5,
        y: this.top + this.height * 0.5
      }
      this.originalPoints = [
        {
          x: this.left,
          y: this.top
        },
        {
          x: this.left + this.width,
          y: this.top
        },
        {
          x: this.left + this.width,
          y: this.top + this.height
        },
        {
          x: this.left,
          y: this.top + this.height
        }
      ]
    },
    move (e) {
      if (e.isTrusted && e.which !== 1) {
        return
      }
      const axis = this.axis
      const grid = this.grid
      const mouseClickPosition = this.mouseClickPosition
      const tmpDeltaX = axis && axis !== 'y' ? mouseClickPosition.mouseX - (e.touches ? e.touches[0].pageX : e.pageX) : 0
      const tmpDeltaY = axis && axis !== 'x' ? mouseClickPosition.mouseY - (e.touches ? e.touches[0].pageY : e.pageY) : 0
      const [deltaX, deltaY] = snapToGrid(grid, tmpDeltaX, tmpDeltaY, this.scale)
      if (deltaX === 0 && deltaY === 0) {
        return
      }
      if (this.resizing) {
        this.handleResize(deltaX, deltaY)
      } else if (this.dragging) {
        this.moved = true
        this.$EveBus.$emit('handleDrag', deltaX, deltaY)
      } else if (this.rotating) {
        this.handleRotate(e.touches ? e.touches[0].pageX : e.pageX, e.touches ? e.touches[0].pageY : e.pageY)
      }
    },
    moveHorizontally (val) {
      const [deltaX, _] = snapToGrid(this.grid, val, this.top, this.scale)

      const left = restrictToBounds(deltaX, this.bounds.minLeft, this.bounds.maxLeft)

      this.left = left
      this.right = this.parentWidth - this.width - left
    },
    moveVertically (val) {
      const [_, deltaY] = snapToGrid(this.grid, this.left, val, this.scale)

      const top = restrictToBounds(deltaY, this.bounds.minTop, this.bounds.maxTop)

      this.top = top
      this.bottom = this.parentHeight - this.height - top
    },
    handleDown (handle, e) {
      if (e instanceof MouseEvent && e.which !== 1) {
        return
      }

      if (this.onResizeStart(handle, e) === false) {
        return
      }
      e.stopPropagation && e.stopPropagation()
      e.preventDefault && e.preventDefault()

      this.handle = handle
      this.resizing = true
      this.reCheckParent()
      this.resetBoundsAndMouseState()
      this.mouseClickPosition.mouseX = e.touches ? e.touches[0].pageX : e.pageX
      this.mouseClickPosition.mouseY = e.touches ? e.touches[0].pageY : e.pageY
      this.mouseClickPosition.left = this.left
      this.mouseClickPosition.right = this.right
      this.mouseClickPosition.top = this.top
      this.mouseClickPosition.bottom = this.bottom

      this.bounds = this.calcResizeLimits()
      let center = {
        x: this.left + this.width * 0.5,
        y: this.top + this.height * 0.5
      }
      let point = {}
      switch (this.handle) {
        case 'ml':
        case 'tm':
        case 'tl':
          point = { x: this.left + this.width, y: this.top + this.height }
          break
        case 'tr':
          point = { x: this.left, y: this.top + this.height }
          break
        case 'bl':
          point = { x: this.left + this.width, y: this.top }
          break
        case 'bm':
        case 'mr':
        case 'br':
          point = { x: this.left, y: this.top }
          break
      }
      this.lockedPoint = rotatePoint(center, point, this.rotate)
      this.initParentBoundsPoints()
      if (this.align) {
        this.getBoundsPoint()
        this.alignInit()
      }
      this.reSetEvent()
      DataCenter.select = {}
      DataCenter.select[this._uid] = this
      this.$EveBus.$emit('deSelectElement', this, true)
    },
    handleResize (deltaX, deltaY) {
      let left = this.left
      let top = this.top
      let right = this.right
      let bottom = this.bottom

      const mouseClickPosition = this.mouseClickPosition
      const aspectFactor = this.aspectFactor

      if (!this.widthTouched && deltaX) {
        this.widthTouched = true
      }

      if (!this.heightTouched && deltaY) {
        this.heightTouched = true
      }

      if (this.handle.includes('b')) {
        bottom = mouseClickPosition.bottom + deltaY
      } else if (this.handle.includes('t')) {
        top = mouseClickPosition.top - deltaY
      }
      if (this.handle.includes('r')) {
        right = mouseClickPosition.right + deltaX
      } else if (this.handle.includes('l')) {
        left = mouseClickPosition.left - deltaX
      }

      if (this.lockAspectRatio) {
        if (this.handle === 'tl') {
          let nt = this.top - (this.left - left) / aspectFactor
          let nl = this.left - (this.top - top) * aspectFactor
          if (Math.abs(this.top - nt) < Math.abs(this.left - nl)) {
            top = nt
          } else {
            left = nl
          }
        } else if (this.handle === 'tr') {
          let nt = this.top - (this.right - right) / aspectFactor
          let nr = this.right - (this.top - top) * aspectFactor
          if (Math.abs(this.top - nt) < Math.abs(this.right - nr)) {
            top = nt
          } else {
            right = nr
          }
        } else if (this.handle === 'br') {
          let nb = this.bottom - (this.right - right) / aspectFactor
          let nr = this.right - (this.bottom - bottom) * aspectFactor
          if (Math.abs(this.bottom - nb) < Math.abs(this.right - nr)) {
            bottom = nb
          } else {
            right = nr
          }
        } else if (this.handle === 'bl') {
          let nb = this.bottom - (this.left - left) / aspectFactor
          let nl = this.left - (this.bottom - bottom) * aspectFactor
          if (Math.abs(this.bottom - nb) < Math.abs(this.left - nl)) {
            bottom = nb
          } else {
            left = nl
          }
        } else if (this.handle === 'bm') {
          right = this.right - (this.bottom - bottom) * aspectFactor
        } else if (this.handle === 'tm') {
          left = this.left - (this.top - top) * aspectFactor
        } else if (this.handle === 'mr') {
          bottom = this.bottom - (this.right - right) / aspectFactor
        } else if (this.handle === 'ml') {
          top = this.top - (this.left - left) / aspectFactor
        }
      }

      const width = computeWidth(this.parentWidth, left, right)
      const height = computeHeight(this.parentHeight, top, bottom)

      if (!this.checkResizeWidthHeight(width, height)) {
        return
      }

      if (this.onResize(this.handle, left, top, width, height) === false) {
        return
      }

      let center = {
        x: left + width * 0.5,
        y: top + height * 0.5
      }
      let point = {}
      let pointRotated = {}
      let movex, movey
      switch (this.handle) {
        case 'ml':
        case 'tm':
        case 'tl':
          point = { x: left + width, y: top + height }
          break
        case 'tr':
          point = { x: left, y: top + height }
          break
        case 'bl':
          point = { x: left + width, y: top }
          break
        case 'bm':
        case 'mr':
        case 'br':
          point = { x: left, y: top }
          break
      }
      pointRotated = rotatePoint(center, point, this.rotate)
      movex = (pointRotated.x - this.lockedPoint.x)
      movey = (pointRotated.y - this.lockedPoint.y)
      left -= movex
      top -= movey
      right += movex
      bottom += movey

      let movedBoundsPoints = []
      let movedCenter = {
        x: left + width * 0.5,
        y: top + height * 0.5
      }
      point = { x: left, y: top }
      pointRotated = rotatePoint(movedCenter, point, this.rotate)
      movedBoundsPoints.push(pointRotated)
      point = { x: left + width, y: top }
      pointRotated = rotatePoint(movedCenter, point, this.rotate)
      movedBoundsPoints.push(pointRotated)
      point = { x: left + width, y: top + height }
      pointRotated = rotatePoint(movedCenter, point, this.rotate)
      movedBoundsPoints.push(pointRotated)
      point = { x: left, y: top + height }
      pointRotated = rotatePoint(movedCenter, point, this.rotate)
      movedBoundsPoints.push(pointRotated)

      if (this.parent && !this.checkResizeBounds(movedBoundsPoints)) {
        return
      }
      this.left = left
      this.top = top
      this.right = right
      this.bottom = bottom
      this.width = width
      this.height = height
      this.toolTops = `w:${width.toFixed(0)} h:${height.toFixed(0)}`
      if (this.align) {
        this.$nextTick(_ => {
          this.getBoundsPoint()
          this.alignInit()
        })
      }
      this.$emit('resizing', this.left, this.top, this.width, this.height)
    },
    handleRotate (mouseX, mouseY) {
      let a = Math.abs(mouseY - this.rotateInit.cy)
      let b = Math.abs(mouseX - this.rotateInit.cx)
      let tan = a / b // 正切
      let hd = Math.atan(tan) // 弧度
      let jd = 180 / Math.PI * hd // 角度
      mouseX < this.rotateInit.cx && mouseY <= this.rotateInit.cy && (jd -= this.rotateInit.initjd)
      mouseX >= this.rotateInit.cx && mouseY < this.rotateInit.cy && (jd = 180 - jd - this.rotateInit.initjd)
      mouseX >= this.rotateInit.cx && mouseY >= this.rotateInit.cy && (jd = 180 + jd - this.rotateInit.initjd)
      mouseX < this.rotateInit.cx && mouseY > this.rotateInit.cy && (jd = -jd - this.rotateInit.initjd)
      jd = jd === 360 ? 0 : jd
      let add = Math.abs(jd - this.rotateInit.mousejd)
      let z = this.rotateInit.startjd
      add = jd < this.rotateInit.mousejd ? add * -1 : add
      z += add
      z = z / 360.0 >= 1.0 ? z % 360 : z
      let boundsPoints = []
      for (let p of this.originalPoints) {
        boundsPoints.push(rotatePoint(this.centerPoint, p, z))
      }
      if (this.parent && !this.checkResizeBounds(boundsPoints)) {
        return
      }
      this.rotate = z
      this.toolTops = `角度: ${z.toFixed(2)}`
      if (this.align) {
        this.$nextTick(_ => {
          this.getBoundsPoint()
          this.alignInit()
        })
      }
    },
    changeWidth (val) {
      const [newWidth, _] = snapToGrid(this.grid, val, 0, this.scale)

      let right = restrictToBounds(
        (this.parentWidth - newWidth - this.left),
        this.bounds.minRight,
        this.bounds.maxRight
      )
      let bottom = this.bottom

      if (this.lockAspectRatio) {
        bottom = this.bottom - (this.right - right) / this.aspectFactor
      }

      const width = computeWidth(this.parentWidth, this.left, right)
      const height = computeHeight(this.parentHeight, this.top, bottom)

      this.right = right
      this.bottom = bottom
      this.width = width
      this.height = height
    },
    changeHeight (val) {
      const [_, newHeight] = snapToGrid(this.grid, 0, val, this.scale)

      let bottom = restrictToBounds(
        (this.parentHeight - newHeight - this.top),
        this.bounds.minBottom,
        this.bounds.maxBottom
      )
      let right = this.right

      if (this.lockAspectRatio) {
        right = this.right - (this.bottom - bottom) * this.aspectFactor
      }

      const width = computeWidth(this.parentWidth, this.left, right)
      const height = computeHeight(this.parentHeight, this.top, bottom)

      this.right = right
      this.bottom = bottom
      this.width = width
      this.height = height
    },
    checkParentSize () {
      if (this.parent) {
        const [newParentWidth, newParentHeight] = this.getParentSize()
        this.parentWidth = newParentWidth
        this.parentHeight = newParentHeight
      }
    },
    checkResizeBounds (points) {
      return polygonIsInPolygon(points, this.parentBoundsPoints)
    },
    checkResizeWidthHeight (width, height) {
      let bounds = this.bounds
      if (width < bounds.minW || (bounds.maxW && width > bounds.maxW)) {
        return false
      }
      if (height < bounds.minH || (bounds.maxH && height > bounds.maxH)) {
        return false
      }
      return true
    },
    contextMenu (e) {
      e.stopPropagation && e.stopPropagation()
      e.preventDefault && e.preventDefault()

      if (!this.enabled) {
        this.enabled = true
        this.$emit('activated')
        this.$emit('update:active', true)
        if (!e.metaKey && !e.ctrlKey) {
          DataCenter.select = {}
        }
        let sigleDrag = !e.metaKey && !e.ctrlKey
        this.$EveBus.$emit('deSelectElement', this, sigleDrag)
        DataCenter.select[this._uid] = this
        DataCenter.active = this._uid
      } else {
        DataCenter.active = this._uid
      }
      this.$EveBus.$emit('mutlElementDown', this)
      if (this.draggable) {
        this.dragging = true
      }
      addEvent(document.documentElement, 'mousedown', this.deselect)
      addEvent(document.documentElement, 'touchend touchcancel', this.deselect)
      this.$emit('contextmenu', e, this, DataCenter.select)
    },
    handleUp (e) {
      this.alignLineRemove()
      removeEvent(document.documentElement, eventsFor.move, this.move)
      this.handle = null
      if (!this.enabled) {
        this.resetBoundsAndMouseState()
      }
      this.getBoundsPoint()
      if (this.resizing) {
        this.resizing = false
        this.$emit('resizestop', this.left, this.top, this.width, this.height)
      }
      if (this.dragging) {
        this.dragging = false
        this.$emit('dragstop', this.left, this.top)
      }
      if (this.rotating) {
        this.rotating = false
        this.$emit('rotatestop', this.left, this.top, this.rotate)
      }
      removeEvent(document.documentElement, 'mouseup', this.handleUp)
      // 多选时判断是否拖动 没拖动过 就是鼠标点击 把其余的选择取消掉
      if ((!this.moved && !e.metaKey && !e.ctrlKey)) {
        this.$EveBus.$emit('deSelectElement', this, true)
      }
      this.moved = false
      if (this.dropNode) {
        if (!this.dropParentNode || !this.$el.parentNode.isSameNode(this.dropNode.$el)) {
          this.moveToDropNode()
        } else {
          this.dropNode = null
        }
      }
    },
    moveToDropNode () {
      for (let id in DataCenter.select) {
        let vm = DataCenter.select[id]
        let rect = rectBoundsToRect(vm.$el, this.dropNode.$el)
        let left = rect.left + (rect.width - vm.width) * 0.5
        let top = rect.top + (rect.height - vm.height) * 0.5
        if (vm.parent) {
          if (left < 0 || top < 0 ||
            (left + vm.width > this.dropNode.width) ||
            (top + vm.height > this.dropNode.height)) {
            continue
          }
        }
        vm.left = left
        vm.top = top
        vm.rotate = rect.deg
        this.dropNode.$el.appendChild(vm.$el)
        vm.dropParentNode = this.dropNode
      }
      this.dropNode = null
    }
  },
  computed: {
    style () {
      return {
        transform: `rotate(${this.rotate}deg)`,
        left: `${this.left}px`,
        top: `${this.top}px`,
        width: this.computedWidth,
        height: this.computedHeight,
        zIndex: this.zIndex,
        ...(this.dragging && this.disableUserSelect ? userSelectNone : userSelectAuto)
      }
    },
    actualHandles () {
      if (!this.resizable) return []
      return this.handles
    },
    computedWidth () {
      if (this.w === 'auto') {
        if (!this.widthTouched) {
          return 'auto'
        }
      }

      return this.width + 'px'
    },
    computedHeight () {
      if (this.h === 'auto') {
        if (!this.heightTouched) {
          return 'auto'
        }
      }

      return this.height + 'px'
    },
    resizingOnX () {
      return (Boolean(this.handle) && (this.handle.includes('l') || this.handle.includes('r')))
    },
    resizingOnY () {
      return (Boolean(this.handle) && (this.handle.includes('t') || this.handle.includes('b')))
    },
    isCornerHandle () {
      return (Boolean(this.handle) && ['tl', 'tr', 'br', 'bl'].includes(this.handle))
    }
  },

  watch: {
    active: {
      handler (val) {
        this.enabled = val
        this.toolTops = ''
        if (val) {
          removeEvent(document.documentElement, 'mousedown', this.deselect)
          removeEvent(document.documentElement, 'touchend touchcancel', this.deselect)
          addEvent(document.documentElement, 'mousedown', this.deselect)
          addEvent(document.documentElement, 'touchend touchcancel', this.deselect)
          this.$emit('activated')
        } else {
          this.$emit('deactivated')
        }
      },
      immediate: true,
      deep: true
    },
    z (val) {
      if (val >= 0 || val === 'auto') {
        this.zIndex = val
      }
    },
    x (val) {
      if (this.resizing || this.dragging) {
        return
      }

      if (this.parent) {
        this.bounds = this.calcDragLimits()
      }

      this.moveHorizontally(val)
    },
    y (val) {
      if (this.resizing || this.dragging) {
        return
      }

      if (this.parent) {
        this.bounds = this.calcDragLimits()
      }

      this.moveVertically(val)
    },
    lockAspectRatio (val) {
      if (val) {
        this.aspectFactor = this.width / this.height
      } else {
        this.aspectFactor = undefined
      }
    },
    minWidth (val) {
      if (val > 0 && val <= this.width) {
        this.minW = val
      }
    },
    minHeight (val) {
      if (val > 0 && val <= this.height) {
        this.minH = val
      }
    },
    maxWidth (val) {
      this.maxW = val
    },
    maxHeight (val) {
      this.maxH = val
    },
    w (val) {
      if (this.resizing || this.dragging) {
        return
      }

      if (this.parent) {
        this.bounds = this.calcResizeLimits()
      }

      this.changeWidth(val)
    },
    h (val) {
      if (this.resizing || this.dragging) {
        return
      }

      if (this.parent) {
        this.bounds = this.calcResizeLimits()
      }

      this.changeHeight(val)
    }
  }
}
</script>
