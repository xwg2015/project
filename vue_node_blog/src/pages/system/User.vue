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
          type: 'index',
          width: 60,
          align: 'center'
        },
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
          width: 160,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: this.adminDisabled(params.index)
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
                this.adminText(params.index)
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
    // 设置、取消管理员
    adminText (index) {
      if (this.userData[index].role === 1) {
        return '设置管理员'
      } else if (this.userData[index].role === 2) {
        return '取消管理员'
      } else {
        return '超级管理员'
      }
    },
    adminDisabled (index) {
      if (this.userData[index].role === 3) {
        return true
      } else {
        return false
      }
    },
    // 隐藏按钮文案
    hideText (index) {
      return this.userData[index].isShow ? '隐藏' : '取消隐藏'
    },
    // 时间格式化
    formattime (time) {
      return datetime(time / 1000)
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
      }).then(function (res) {
        _this.loading = false
        if (res.data.code === 0) {
          _this.userData = res.data.data
          _this.page.total = res.data.total
        } else {
          _this.$Message.error(res.data.msg)
        }
      }).catch(function () {
        _this.$Message.error('接口异常！')
      })
    },
    // 设置、取消管理员
    handleAdminUser (index) {
      let _this = this
      let role, text
      if (this.userData[index].role === 2) {
        role = 1
        text = '取消'
      } else {
        role = 2
        text = '设置'
      }
      axios.post(`${this.$golbal.host}/adminUser`, {
        id: _this.userData[index]._id,
        role: role
      }).then(function (res) {
        if (res.data.code === 0) {
          _this.$Message.success(`${text}管理员成功！`)
          _this.getData(_this.page.current)
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
