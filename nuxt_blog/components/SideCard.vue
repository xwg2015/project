<template>
  <section class="mod-side-card mod-shadow">
    <dl :class="row">
      <dt>{{ title }}</dt>
      <slot
        name="articles"
        v-for="item in data"
        :title="item.title"
        :url="item.url">
      </slot>
      <slot
        name="tags"
        v-for="item in data"
        :tag-name="item.name"
        :num="item.num"
        :url="item.url">
      </slot>
    </dl>
  </section>
</template>

<script>
  export default {
    name: 'SideCard',
    props: {
      row: {
        type: String,
        default: 'single'
      },
      title: {
        type: String
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      }
    }
  }
</script>

<style lang="sass">
  @import '~assets/sassCore/_function.scss'

  .mod-side-card
    width: 240px
    background-color: $white
    border-radius: 2px
    dt
      padding: 0 20px
      line-height: 60px
      color: lighten($themeColor, 40%)
    dd
      @include display-flex()
      @include align-items()
      min-height: 49px
      border-top: 1px solid rgba($themeColor, 0.05)
    h3
      width: 100%
      font-size: 14px
      font-weight: normal
    a
      display: block
      padding: 20px
      color: $themeColor
      text-align: justify
      transitions: 0.5s
    a:hover
      color: lighten($themeColor, 20%)
    .multi
      a
        @include display-flex()
        @include justify-content()
        @include align-items()
        width: 100%
      .num
        color: lighten($themeColor, 40%)
</style>
