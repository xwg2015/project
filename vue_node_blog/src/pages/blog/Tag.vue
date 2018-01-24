<template>
  <section class="page page-blog-tag">
    <header class="mod-header">
      <h2>文章标签</h2>
    </header>
    <Table
      border
      :columns="projectColumns"
      :loading="loading"
      :data="projectData">
    </Table>
    <Page
      :total="page.total"
      :current="page.current"
      :page-size="page.size"
      class-name="mod-pagination"
      show-total
      @on-change="handleChangePage">
    </Page>
  </section>
</template>

<style lang="stylus">
</style>

<script>
import axios from 'axios'
export default {
  name: 'tag',
  data () {
    return {
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      loading: false,
      projectData: [],
      projectColumns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '标签名',
          key: 'name'
        },
        {
          title: '标签分类',
          key: 'type'
        },
        {
          title: '标签文章',
          key: 'articles',
          render: (h, params) => {
            return h('span', params.row.articles.join('，'))
          }
        }
      ]
    }
  },
  mounted () {
    this.getData(this.page.current)
  },
  methods: {
    // 获取标签列表
    getData (current) {
      this.loading = true
      let _this = this
      axios.get(`${_this.$golbal.host}/getTag`, {
        params: {
          pageCurrent: current,
          pageSize: _this.page.size
        }
      }).then(function (res) {
        _this.loading = false
        if (res.data.code === 0) {
          _this.projectData = res.data.data
          _this.page.total = res.data.total
        } else {
          _this.$Message.error(res.data.msg)
        }
      }).catch(function () {
        _this.$Message.error('接口异常！')
      })
    },
    // 翻页
    handleChangePage (page) {
      this.page.current = page
      this.getData(page)
    }
  }
}
</script>
