<template>
  <section class="page page-check-summary">
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
                this.pushText(params.index)
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
      let page = this.$route.query.page ? this.$route.query.page : 1
      this.page.current = Number(page)
      this.summaryData = this.allData.slice((page - 1) * this.page.size, page * this.page.size)
    } else {
      this.getData()
    }
  },
  methods: {
    // 隐藏按钮文案
    pushText (index) {
      return this.summaryData[index].isPushed ? '今日已发送' : '发送通知'
    },
    // 获取汇总数据
    getData (current) {
      let _this = this
      _this.loading = true
      axios.get(`${_this.$golbal.host}/getCheck`)
        .then((res) => {
          _this.loading = false
          if (res.data.code === 0) {
            res.data.data.info.forEach((val, idx, arr) => {
              val.isPushed = false
            })
            sessionStorage.setItem('summaryData', JSON.stringify(res.data.data.info))
            _this.allData = res.data.data.info
            _this.summaryData = _this.allData.slice(0, _this.page.size)
            _this.page.total = _this.allData.length
          } else {
            _this.$Message.error(res.data.msg)
          }
        }).catch((err) => {
          console.log(err)
          _this.$Message.error('请求报错！')
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
        validateStatus (status) {
          return (status >= 200 && status < 300) || status === 400
        },
        headers: {
          'Authorization': 'Basic YTczODIwYjk0NDg3NTdiMmVlYjY4MDg4OjhkYzNjNjM0NjhmYjJiN2IxNDc5ODhmZQ=='
        }
      })
      // 推送分非延期和延期
      // 延期必须通知段务
      let audience = {
        tag: [
          this.summaryData[this.curIndex].teams,
          this.summaryData[this.curIndex].workshop
        ]
      }
      if (this.summaryData[this.curIndex].status === 3) {
        audience.tag.push('南昌西工务段段机关')
      }
      jgpsuhAxios.post('/proxy/v3/push', {
        platform: 'all',
        audience: audience,
        notification: {
          alert: this.curMessage
        }
      }).then((res) => {
        if (res.status === 400) {
          this.$Message.error(res.data.error.message)
        } else {
          this.$Message.success('消息发送成功！')
          let newData = JSON.parse(sessionStorage.getItem('summaryData'))
          newData[this.curIndex].isPushed = true
          sessionStorage.setItem('summaryData', JSON.stringify(newData))
          window.location.reload()
        }
      }).catch((err) => {
        console.log(err)
        this.$Message.error('请求报错！')
      })
    },
    // 翻页
    handleChangePage (page) {
      this.$router.push({
        name: 'CheckSummary',
        query: {
          page: page
        }
      })
      this.page.current = page
      this.summaryData = this.allData.slice((page - 1) * this.page.size, page * this.page.size)
    }
  }
}
</script>

