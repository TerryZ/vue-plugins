<template>
  <div class="v-gallery">
    <div
      ref="links"
      class="lightBoxGallery"
      @click="openGallery($event, true)"
      v-if="isGallery"
    >
      <!--
      slot template:
      <a href="javascript:void(0);" :data-image="img.url" :title="img.title" v-for="img in images">
        <img :src="img.url">
      </a>
      -->
      <slot />
    </div>

    <div
      class="light-gallery"
      :class="{'dark-theme': dark}"
      @click="openGallery($event, false)"
      ref="innerLinks"
      v-if="isGallery"
    >
      <a
        href="javascript:void(0)"
        :data-image="img.href"
        :data-title="img.title"
        :key="index"
        v-for="(img,index) in list"
      >
        <div class="image-container"><img
          :src="img.thumbnail"
          :alt="img.title"
        ></div>
        <div
          class="image-caption"
          v-text="img.title"
          v-if="caption"
        />
      </a>
    </div>

    <div
      :class="[ctlClass]"
      id="blueimp-gallery"
      ref="container"
    >
      <div class="slides" />
      <h3
        class="title"
        v-if="controlTitle"
      />
      <a class="prev">‹</a>
      <a class="next">›</a>
      <a
        class="close"
        v-show="type.toLowerCase() === 'gallery'"
      >×</a>
      <a
        class="play-pause"
        v-if="controlPause"
      />
      <ol class="indicator" />
    </div>
  </div>
</template>

<script>
import 'blueimp-gallery/css/blueimp-gallery.min.css'
import './gallery.scss'
import gallery from 'blueimp-gallery'

export default {
  name: 'VGallery',
  props: {
    type: { type: String, default: 'gallery' },
    /**
     * data format:
     * [
     *   {title: 'img1', url:'http://image_url', thumbnail:'http://image_thumbnail'},
     *   {...}
     * ]
     */
    images: { type: Array, required: true },
    controlPause: { type: Boolean, default: false },
    controlTitle: { type: Boolean, default: true },
    dark: { type: Boolean, default: false },
    caption: { type: Boolean, default: false }
  },
  data () {
    return {
      ctlClass: {
        'blueimp-gallery': true,
        'blueimp-gallery-carousel': false,
        'blueimp-gallery-controls': true,
        'light-carousel': false
      },
      list: []
    }
  },
  computed: {
    isGallery () {
      return this.type.toLowerCase() === 'gallery' &&
        'default' in this.$scopedSlots === false
    }
  },
  methods: {
    openGallery (e, custom) {
      const that = this
      const target = e.target || e.srcElement
      const link = target.src ? target.parentNode : target
      if (
        link.className.includes('v-gallery') ||
        link.className.includes('lightBoxGallery') ||
        link.className.includes('light-gallery')
      ) return
      const options = {
        index: link.closest('a'),
        event: e,
        container: that.$refs.container,
        titleProperty: 'title',
        urlProperty: 'image',
        closeOnSlideClick: false, // 点击非图片区域，非控制按钮的空白区域时，是否关闭图片显示
        closeOnSwipeUpOrDown: false, // 图片上下拖动，到屏幕尽头时，关闭图片显示
        enableKeyboardNavigation: true, // 是否打开键盘导航
        toggleControlsOnReturn: false, // 是否允许回车，显示/隐藏控制按钮
        toggleControlsOnSlideClick: false, // 是否允许鼠标点击图片，显示/隐藏控制按钮
        startSlideshow: false, // 是否自动开始播放图片轮播
        onslide: function (index) {
          that.showed(index)
        },
        onclosed: function () {
          that.showed(-1)
        }
      }
      const main = custom ? that.$refs.links : that.$refs.innerLinks
      const links = main.getElementsByTagName('a')
      // console.log(e);
      // console.log(link.tagName);
      gallery(links, options)
    },
    openCarousel () {
      const { list } = this

      if (!list.length) return

      const that = this
      this.ctlClass['blueimp-gallery-carousel'] = true
      this.ctlClass['light-carousel'] = true
      this.$nextTick(() => {
        gallery(list, {
          container: that.$refs.container,
          carousel: true,
          toggleControlsOnSlideClick: false,
          onslide: function (index) {
            that.showed(index)
          }
        })
      })
    },
    showed (idx) {
      if (typeof (idx) === 'number') this.$emit('showed', idx)
    },
    convert () {
      if (Array.isArray(this.images) && this.images.length) {
        this.list = this.images.concat().map((val, idx) => {
          return {
            title: val.title ? val.title : 'Image' + (idx + 1),
            thumbnail: val.thumbnail ? val.thumbnail : val.url,
            href: val.url
          }
        })
      }
    },
    closestPolyfill () {
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
                        Element.prototype.webkitMatchesSelector
      }

      if (!Element.prototype.closest) {
        Element.prototype.closest = function (s) {
          var el = this
          if (!document.documentElement.contains(el)) return null
          do {
            if (el.matches(s)) return el
            el = el.parentElement || el.parentNode
          } while (el !== null && el.nodeType === 1)
          return null
        }
      }
    }
  },
  beforeMount () {
    this.convert()
  },
  watch: {
    images () {
      this.convert()
      if (this.type.toLowerCase() === 'carousel') this.openCarousel()
    }
  },
  mounted () {
    this.closestPolyfill()
    if (this.type.toLowerCase() === 'carousel') this.openCarousel()
  }
}
</script>
