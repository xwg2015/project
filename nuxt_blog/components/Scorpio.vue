<template>
  <svg width="200" height="200" class="scorpio" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <g>
      <image
        class="star"
        xlink:href="~static/image/star.png"
        v-for="(item, index) in points"
        :key="index"
        :x="item.x - type[item.size]/2"
        :y="item.y - type[item.size]/2"
        :width="type[item.size]"
        :height="type[item.size]">
      </image>
    </g>
    <polyline class="line line1" :points="line1" />
    <polyline class="line line2" :points="line2" />
    <polyline class="line line3" :points="line3" />
  </svg>
</template>

<script>
  export default {
    name: 'Scorpio',
    data () {
      return {
        type: {
          mini: 8,
          small: 12,
          large: 14
        },
        animation: {
          mini: 1,
          small: 2,
          large: 3
        },
        points: [
          { x: 4, y: 164, size: 'mini' },
          { x: 30, y: 150, size: 'mini' },
          { x: 20, y: 180, size: 'mini' },
          { x: 40, y: 196, size: 'mini' },
          { x: 70, y: 190, size: 'mini' },
          { x: 90, y: 170, size: 'small' },
          { x: 100, y: 140, size: 'mini' },
          { x: 90, y: 106, size: 'mini' },
          { x: 104, y: 76, size: 'small' },
          { x: 120, y: 60, size: 'small' },
          { x: 144, y: 50, size: 'large' },
          { x: 176, y: 24, size: 'small' },
          { x: 160, y: 4, size: 'mini' },
          { x: 190, y: 60, size: 'small' },
          { x: 196, y: 86, size: 'mini' }
        ]
      }
    },
    computed: {
      line1 () {
        let tmp = []
        this.points.forEach((val, idx, arr) => {
          if (idx < 12) {
            tmp.push(`${val.x} ${val.y}`)
          }
        })
        return tmp.join(',')
      },
      line2 () {
        let tmp = []
        this.points.forEach((val, idx, arr) => {
          if (idx > 10 && idx < 13) {
            tmp.push(`${val.x} ${val.y}`)
          }
        })
        return tmp.join(',')
      },
      line3 () {
        let tmp = []
        this.points.forEach((val, idx, arr) => {
          if (idx === 11) {
            tmp.push(`${val.x} ${val.y}`)
          }
          if (idx > 12) {
            tmp.push(`${val.x} ${val.y}`)
          }
        })
        return tmp.join(',')
      }
    },
    mounted () {
      this.twinkle()
    },
    methods: {
      twinkle () {
        let stars = document.querySelectorAll('.star')
        stars.forEach((val, idx, arr) => {
          val.style.animation = `twinkle${this.animation[this.points[idx].size]} ${Math.floor(Math.random() * 3 + 2)}s linear infinite`
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '~assets/sassCore/_function.scss'

  .scorpio
    &:hover .line1
      animation: lineMove 2s linear forwards
    &:hover .line2
      animation: lineMove 1.5s 2s linear forwards
    &:hover .line3
      animation: lineMove 1.5s 2s linear forwards
  .star
    @include transform-origin(center)
  .line
    stroke: rgba(255, 255, 255, 0.5)
    fill: none
    stroke-width: 1
  .line1
    stroke-dasharray: 400
    stroke-dashoffset: 400
  .line2, .line3
    stroke-dasharray: 100
    stroke-dashoffset: 100
  @include keyframes(lineMove)
    to
      stroke-dashoffset: 0
  @include keyframes(twinkle1)
    0%
      transform: scale(0.6)
      @include opacity(60)
    50%
      transform: scale(1.0)
      @include opacity(100)
    100%
      transform: scale(0.6)
      @include opacity(60)
  @include keyframes(twinkle2)
    0%
      transform: scale(0.7)
      @include opacity(60)
    50%
      transform: scale(1.1)
      @include opacity(100)
    100%
      transform: scale(0.7)
      @include opacity(60)
  @include keyframes(twinkle3)
    0%
      transform: scale(0.8)
      @include opacity(60)
    50%
      transform: scale(1.2)
      @include opacity(100)
    100%
      transform: scale(0.8)
      @include opacity(60)
</style>
