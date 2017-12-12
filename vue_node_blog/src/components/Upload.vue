<template>
  <Upload
    :action="`${$golbal.host}/upload`"
    :max-size="2048"
    :format="['jpg','jpeg','png', 'gif']"
    :on-exceeded-size="handleMaxSize"
    :on-format-error="handleFormatError"
    :show-upload-list="false"
    :on-success="handleSuccess">
    <div class="upload-wrap">
      <Icon type="ios-cloud-upload" size="40"></Icon>
      <p>点击上传图片</p>
      <div class="img-wrap" v-if="picUrl">
        <img :value="value" :src="picUrl">
      </div>
    </div>
  </Upload>
</template>

<style lang="stylus">
  .upload-wrap
    position relative
    display flex
    justify-content center
    align-items center
    flex-direction column
    width 240px
    height 180px
    border 1px solid #eee
    border-radius 4px
    cursor pointer
  .img-wrap
    position absolute
    left 0
    top 0
    justify-content center
    align-items center
    img
      width 238px
      height 178px
</style>

<script>
  export default {
    name: 'upload',
    props: {
      value: String
    },
    data () {
      return {
        picUrl: ''
      }
    },
    watch: {
      value (val) {
        this.picUrl = val
      },
      picUrl (val) {
        this.$emit('input', val)
      }
    },
    mounted () {
      this.picUrl = this.value
    },
    methods: {
      // 判断文件大小
      handleMaxSize (file) {
        console.log(file)
        this.$Message.warning(`${file.name}文件大小超过最大限制，请重新编辑上传！`)
      },
      // 判断文件类型
      handleFormatError (file) {
        this.$Message.warning(`${file.name}文件格式不在指定的格式中，请重新选择上传！`)
      },
      // 图片上传成功
      handleSuccess (res, file) {
        this.picUrl = res.files.file.path
      }
    }
  }
</script>
