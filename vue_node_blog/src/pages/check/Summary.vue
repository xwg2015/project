<template>
  <section class="page page-system-user">
    <Alert class="mod-alert" show-icon closable>
      温馨提示：目前只有超级管理员才有权限访问。
    </Alert>
    <header class="mod-header">
      <h2>检查汇总</h2>
    </header>
    <Table
      border
      :columns="summaryColumns"
      :loading="loading"
      :data="summaryData">
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
import { datetime } from '../../lib/format-time'
export default {
  data () {
    return {
      dialog: false,
      curIndex: 0,
      curMessage: '',
      typeZh: {
        add: '新建',
        edit: '编辑'
      },
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      loading: false,
      allData: [],
      summaryData: [],
      summaryColumns: [
        {
          title: '#',
          width: 60,
          align: 'center',
          render: (h, params) => {
            return h('span', params.index + 1 + (this.page.current - 1) * this.page.size)
          }
        },
        {
          title: '车间',
          key: 'workshop',
          align: 'center'
        },
        {
          title: '班组',
          key: 'teams',
          align: 'center'
        },
        {
          title: '检查区段',
          width: 180,
          key: 'stations',
          align: 'center'
        },
        {
          title: '车站设备编号',
          align: 'center',
          render: (h, params) => {
            if (params.row.type !== 1) {
              return h('span', params.row.station + (params.row.code || ''))
            }
          }
        },
        {
          title: '最晚检查时间',
          align: 'center',
          render: (h, params) => {
            return h('span', params.row.plan_time.substr(0, 10))
          }
        },
        {
          title: '备注',
          align: 'center',
          render: (h, params) => {
            if (params.row.status === 2) {
              return h(
                'span',
                {
                  style: {
                    color: '#f0ad4e'
                  }
                },
                params.row.description
              )
            } else if (params.row.status === 3) {
              return h(
                'span',
                {
                  style: {
                    color: '#d43f3a'
                  }
                },
                params.row.description
              )
            }
          }
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
    if (sessionStorage.getItem('summaryData')) {
      this.allData = JSON.parse(sessionStorage.getItem('summaryData'))
      this.page.total = this.allData.length
      this.summaryData = this.allData.slice(0, this.page.size)
    } else {
      this.getData()
    }
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
    // 获取汇总数据
    getData (current) {
      let _this = this
      _this.loading = true
      axios.get(`${_this.$golbal.host}/getCheck`)
        .then((res) => {
          _this.loading = false
          if (res.data.code === 0) {
            sessionStorage.setItem('summaryData', JSON.stringify(res.data.data.info))
            _this.allData = res.data.data.info
            _this.summaryData = _this.allData.slice(0, _this.page.size)
            _this.page.total = _this.allData.length
          } else {
            _this.$Message.error(res.data.msg)
          }
        }).catch(() => {
          _this.$Message.error('接口异常！')
        })
    },
    handleMessage (index) {
      let project, text1, text2
      project = this.summaryData[index].type !== 1 ? this.summaryData[index].station + (this.summaryData[index].code || '') : this.summaryData[index].stations
      text1 = this.summaryData[index].status === 3 ? '已超' : '距离'
      text2 = this.summaryData[index].status === 3 ? '' : '还剩'
      this.curIndex = index
      this.dialog = true
      this.curMessage = `${this.summaryData[index].workshop}${this.summaryData[index].teams}${project}上一次检查时间是${this.summaryData[index].actual_time.substr(0, 10)}，${text1}最晚检查时间（${this.summaryData[index].plan_time.substr(0, 10)}） ${text2}${this.summaryData[index].description.match(/[0-9]+/)[0]}天`
    },
    handleSubmit () {
      let jgpsuhAxios = axios.create({
        headers: {
          'Authorization': 'Basic YTczODIwYjk0NDg3NTdiMmVlYjY4MDg4OjhkYzNjNjM0NjhmYjJiN2IxNDc5ODhmZQ=='
        }
      })
      jgpsuhAxios.post('/proxy/v3/push', {
        platform: 'all',
        audience: 'all',
        notification: {
          alert: 'Hello, JPush!'
        }
      }).then(() => {
        this.$Message.success('消息发送成功！')
      }).catch(() => {
        this.$Message.error('接口异常！')
      })
    },
    // 翻页
    handleChangePage (page) {
      this.page.current = page
      this.summaryData = this.allData.slice((page - 1) * this.page.size, page * this.page.size)
    }
  }
}
</script>

