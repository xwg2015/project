<template>
  <section class="page page-system-user">
    <header class="mod-header">
      <h2>用户管理</h2>
    </header>
    <Table border :columns="articleColumns" :loading="loading" :data="userData"></Table>
    <Page :total="page.total" :current="page.current" :page-size="page.size" class-name="mod-pagination" show-total @on-change="handleChangePage"></Page>
  </section>
</template>

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
        size: 10,
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
