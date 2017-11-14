<template>
  <section class="page page-system-user">
    <header class="mod-header">
      <h2>用户管理</h2>
    </header>
    <Table border :columns="articleColumns" :loading="loading" :data="userData"></Table>
    <Page :total="page.total" :current="page.current" :page-size="page.size" class-name="mod-pagination" show-total @on-change="handleChangePage"></Page>
    <!-- <Modal
      v-model="articleModal"
      width="80"
      :title="`${typeZh[articleForm.type]}文章`"
      ok-text="提交"
      @on-ok="handleSubmit">
      <Form :model="articleForm" :label-width="50">
        <FormItem label="标题">
          <Input v-model="articleForm.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="类型">
          <Select v-model="articleForm.tab" style="width:100px">
            <Option value="article">技术文章</Option>
            <Option value="journal">日志</Option>
          </Select>
        </FormItem>
        <FormItem label="标签">
          <Tag v-for="item in articleForm.tags" :key="item" :name="item" closable @on-close="handleCloseTag">{{item}}</Tag>
          <Input v-model="curTag" size="small" class="tag-input" @keyup.enter.native="handleAddTag" placeholder="请输入标签名"></Input>
          <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAddTag">添加标签</Button>
        </FormItem>
        <FormItem label="内容">
          <mavon-editor v-model="articleForm.content" />
        </FormItem>
      </Form>
    </Modal> -->
  </section>
</template>

<style lang="stylus">
  .mod-header
    display flex
    align-items center
    justify-content space-between
    height 60px
  .mod-pagination
    margin 30px 0
    text-align center
</style>

<script>
import axios from 'axios'
import { datetime } from '../../lib/format-time'
export default {
  data () {
    return {
      articleModal: false,
      articleForm: {
        id: '',
        type: '',
        title: '',
        tab: '',
        tags: [],
        content: ''
      },
      typeZh: {
        add: '新建',
        edit: '编辑'
      },
      page: {
        current: 1,
        size: 5,
        total: 0
      },
      curTag: '',
      curTab: 'article',
      loading: false,
      userData: [],
      articleColumns: [
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '角色',
          key: 'role',
          render: (h, params) => {
            if (params.row.role === 1) {
              return h('span', '游客')
            } else if (params.row.role === 2) {
              return h('span', '管理员')
            } else if (params.row.role === 3) {
              return h('span', '超级管理员')
            }
          }
        },
        {
          title: '时间',
          key: 'time',
          render: (h, params) => {
            return h('span', this.formattime(new Date(params.row.time)))
          }
        },
        {
          title: '操作',
          key: 'action',
          width: 240,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.handleAdminUser(params.index)
                    }
                  }
                },
                '22'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.handleEditArcticle(params.index)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'error',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.handleHideArcticle(params.index)
                    }
                  }
                },
                '33'
              )
            ])
          }
        }
      ]
    }
  },
  mounted () {
    this.getData(this.page.current)
  },
  computed: {
  },
  methods: {
    // 置顶按钮文案
    topText (index) {
      return this.userData[index].isTop ? '取消置顶' : '置顶'
    },
    // 隐藏按钮文案
    hideText (index) {
      return this.userData[index].isShow ? '隐藏' : '取消隐藏'
    },
    // 时间格式化
    formattime (time) {
      return datetime(time / 1000)
    },
    // 置顶文章
    handleTopArcticle (index) {
      let _this = this
      let text
      axios.post(`${this.$golbal.host}/topArticle`, {
        id: _this.userData[index]._id,
        isTop: !_this.userData[index].isTop
      }).then(function (response) {
        if (response.status === 200) {
          text = _this.userData[index].isTop ? '取消置顶' : '置顶'
          _this.$Message.success(`${text}成功！`)
          _this.getData(1, _this.curTab)
        } else {
          _this.$Message.error(`${text}失败！`)
        }
      }).catch(function () {
        _this.$Message.error('接口异常！')
      })
    },
    // 隐藏文章
    handleHideArcticle (index) {
      let _this = this
      let text
      axios.post(`${this.$golbal.host}/hideArticle`, {
        id: _this.userData[index]._id,
        isShow: !_this.userData[index].isShow
      }).then(function (response) {
        if (response.status === 200) {
          text = _this.userData[index].isShow ? '隐藏' : '取消隐藏'
          _this.$Message.success(`${text}成功！只会隐藏前台页面的展示而已。`)
          _this.getData(1, _this.curTab)
        } else {
          _this.$Message.error(`${text}失败！`)
        }
      }).catch(function () {
        _this.$Message.error('接口异常！')
      })
    },
    // 获取用户列表
    getData (current) {
      this.loading = true
      let _this = this
      axios.get(`${this.$golbal.host}/getUser`, {
        params: {
          pageCurrent: current,
          pageSize: _this.page.size
        }
      }).then(function (response) {
        _this.loading = false
        if (response.status === 200) {
          _this.userData = response.data.data
          _this.page.total = response.data.total
        }
      }).catch(function () {
        _this.$Message.error('接口异常！')
      })
    },
    // 翻页
    handleChangePage (page) {
      this.page.current = page
      this.getData(page)
    },
    // 提交文章
    handleSubmit () {
      let _this = this
      axios.post(`${this.$golbal.host}/${this.articleForm.type}Article`, {
        id: _this.articleForm.id,
        title: _this.articleForm.title,
        type: _this.articleForm.tab,
        tags: _this.articleForm.tags.join(','),
        content: _this.articleForm.content
      }).then(function (response) {
        if (response.status === 200) {
          _this.$Message.success('新建成功！')
          _this.getData(1, _this.curTab)
        } else {
          _this.$Message.error('新建失败！')
        }
      }).catch(function () {
        _this.$Message.error('接口异常！')
      })
    }
  }
}
</script>
