<template>
  <section class="mod-side-card mod-shadow">
    <dl :class="row">
      <dt>{{ title }}</dt>
      <slot
        name="articles"
        v-for="item in data"
        :title="item.title"
        :id="item._id">
      </slot>
      <slot
        name="tags"
        v-for="item in data"
        :tag-name="item.name"
        :count="item.count">
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
    width: ($baseWidth - $baseGap) * 0.25
    background-color: $white
    border-radius: $baseRadius
    dt
      padding: 0 $baseGap
      line-height: $baseHeight * 0.6
      color: lighten($themeColor, 40%)
    dd
      @include display-flex()
      @include align-items()
      min-height: $baseHeight * 0.6
      border-top: 1px solid rgba($themeColor, 0.05)
    .dd-tags
      min-height: $baseHeight * 0.4
      a
        padding: 10px $baseGap
    h3
      width: 100%
      font-size: 14px
      font-weight: normal
    a
      display: block
      padding: 20px $baseGap
      color: $themeColor
      text-align: justify
      transition: $baseTransition
      &:hover
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
