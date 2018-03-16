<template>
  <section class="page page-check-admin">
    <Alert class="mod-alert" show-icon closable>
      温馨提示：目前只有超级管理员才有权限访问。
    </Alert>
    <header class="mod-header">
      <h2>管理员列表</h2>
    </header>
    <Table
      border
      :columns="adminColumns"
      :loading="loading"
      :data="adminData">
    </Table>
    <Page
      :total="page.total"
      :current="page.current"
      :page-size="page.size"
      class-name="mod-pagination"
      show-total
      @on-change="handleChangePage">
    </Page>
    <Modal
      v-model="dialog"
      title="消息通知"
      @on-ok="handleSubmit">
      <Input
        v-model="curMessage"
        type="textarea"
        :rows="4">
      </Input>
    </Modal>
  </section>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      dialog: false,
      curIndex: 0,
      curMessage: '',
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      loading: false,
      allData: [],
      adminData: [],
      adminColumns: [
        {
          title: '#',
          width: 60,
          align: 'center',
          render: (h, params) => {
            return h('span', params.index + 1 + (this.page.current - 1) * this.page.size)
          }
        },
        {
          title: '名字',
          key: 'real_name',
          align: 'center'
        },
        {
          title: '角色',
          key: 'role_name',
          align: 'center'
        },
        {
          title: '管辖范围',
          align: 'center',
          render: (h, params) => {
            return h('span', this.handleRealArea(params.row.role_name, params.row.real_area))
          }
        },
        {
          title: '邮箱',
          key: 'email',
          align: 'center'
        },
        {
          title: '备注',
          key: 'remark',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
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
                  on: {
                    click: () => {
                      this.handleMessage(params.index)
                    }
                  }
                },
                '发送通知'
              )
            ])
          }
        }
      ]
    }
  },
  mounted () {
    if (sessionStorage.getItem('adminData')) {
      this.allData = JSON.parse(sessionStorage.getItem('adminData'))
      this.page.total = this.allData.length
      this.adminData = this.allData.slice(0, this.page.size)
    } else {
      this.getData()
    }
  },
  methods: {
    // 处理real_area字段
    handleRealArea (role, area) {
      if (role === '段务') {
        return '南昌西工段'
      } else if (role === '车间长') {
        return Object.keys(area).join('，')
      } else if (role === '工区长') {
        return this.getAreaValue(area).join('，')
      }
    },
    getAreaValue (obj) {
      let tmp = []
      for (var key in obj) {
        tmp = tmp.concat(obj[key])
      }
      return tmp
    },
    // 获取管理员数据
    getData (current) {
      let _this = this
      _this.loading = true
      axios.get(`${_this.$golbal.host}/getAdmin`)
        .then((res) => {
          _this.loading = false
          if (res.data.code === 0) {
            sessionStorage.setItem('adminData', JSON.stringify(res.data.data.info))
            _this.allData = res.data.data.info
            _this.adminData = _this.allData.slice(0, _this.page.size)
            _this.page.total = _this.allData.length
          } else {
            _this.$Message.error(res.data.msg)
          }
        }).catch(() => {
          _this.$Message.error('接口异常！')
        })
    },
    handleMessage (index) {
      this.dialog = true
      this.curIndex = index
      this.curMessage = ''
    },
    handleSubmit () {
      if (this.curMessage) {
        let jgpsuhAxios = axios.create({
          validateStatus (status) {
            return (status >= 200 && status < 300) || status === 400
          },
          headers: {
            'Authorization': 'Basic YTczODIwYjk0NDg3NTdiMmVlYjY4MDg4OjhkYzNjNjM0NjhmYjJiN2IxNDc5ODhmZQ=='
          }
        })
        // 个性通知，通知设备名称
        let audience = {
          alias: [this.adminData[this.curIndex].real_name]
        }
        jgpsuhAxios.post('/proxy/v3/push', {
          platform: 'all',
          audience: audience,
          notification: {
            alert: this.curMessage
          }
        }).then((res) => {
          this.$Message.success('消息发送成功！')
          console.log(`res:${res}`)
        }).catch((err) => {
          console.log(`err:${err}`)
          this.$Message.error('请求报错！')
        })
      }
    },
    // 翻页
    handleChangePage (page) {
      this.page.current = page
      this.adminData = this.allData.slice((page - 1) * this.page.size, page * this.page.size)
    }
  }
}
</script>

