<template>
  <section class="page page-blog-article">
    <header class="mod-header">
      <h2>文章管理</h2>
      <Button type="primary" @click="handleAddArcticle" :disabled="permission">新建文章</Button>
    </header>
    <Tabs v-model="curTab" @on-click="handleChangeTab">
      <TabPane label="技术文章" name="article">
        <Table border :row-class-name="rowClassName" :columns="articleColumns" :loading="loading" :data="articleData"></Table>
      </TabPane>
      <TabPane label="日志" name="journal">
        <Table border :row-class-name="rowClassName" :columns="articleColumns" :loading="loading" :data="articleData"></Table>
      </TabPane>
    </Tabs>
    <Page :total="page.total" :current="page.current" :page-size="page.size" class-name="mod-pagination" show-total @on-change="handleChangePage"></Page>
    <Modal
      v-model="articleModal"
      width="80"
      :title="`${typeZh[articleForm.type]}文章`">
      <Form :model="articleForm" ref="articleForm" :rules="rules" :label-width="50">
        <FormItem label="标题" prop="title">
          <Input v-model="articleForm.title" placeholder="请输入标题"></Input>
        </FormItem>
        <FormItem label="类型">
          <Select v-model="articleForm.tab" style="width:100px">
            <Option value="article">技术文章</Option>
            <Option value="journal">日志</Option>
          </Select>
        </FormItem>
        <FormItem label="标签" prop="tags">
          <Tag v-for="item in articleForm.tags" :key="item" :name="item" closable @on-close="handleCloseTag">{{item}}</Tag>
          <Input v-model="curTag" size="small" class="tag-input" @keyup.enter.native="handleAddTag" placeholder="请输入标签名"></Input>
          <Button icon="ios-plus-empty" type="dashed" size="small" @click="handleAddTag">添加标签</Button>
        </FormItem>
        <FormItem label="内容" prop="content">
          <input type="hidden" v-model="articleForm.content">
          <mavon-editor v-model="articleForm.content" default_open="edit" />
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" :loading="submitloading" @click="handleSubmit('articleForm')">提 交</Button>
      </div>
    </Modal>
  </section>
</template>

<style lang="stylus">
.page-blog-article
  .tag-input
    width 100px
</style>

<script>
import axios from 'axios'
import { datetime } from '../../lib/format-time'
export default {
  data () {
    const validateTags = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('请输入至少一个标签'))
      } else {
        callback()
      }
    }
    return {
      permission: true,
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
        update: '更新',
        delete: '删除'
      },
      page: {
        current: 1,
        size: 10,
        total: 0
      },
      curTag: '',
      curTab: 'article',
      loading: false,
      submitloading: false,
      articleData: [],
      articleColumns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '标题',
          key: 'title'
        },
        {
          title: '作者',
          key: 'author'
        },
        {
          title: '标签',
          key: 'tags'
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
          width: 280,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.handleTopArcticle(params.index)
                    }
                  }
                },
                this.topText(params.index)
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
                    type: 'warning',
                    size: 'small'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.handleHideArcticle(params.index)
                    }
                  }
                },
                this.hideText(params.index)
              ),
              h('Poptip', {
                props: {
                  confirm: true,
                  width: '200',
                  title: '你确定要删除这个项目吗？',
                  transfer: true
                },
                on: {
                  'on-ok': () => {
                    this.handleSubmit()
                  }
                }
              }, [
                h('Button',
                  {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    on: {
                      click: () => {
                        this.handleDeleteArticle(params.index)
                      }
                    }
                  },
                  '删除'
                )
              ])
            ])
          }
        }
      ],
      rules: {
        title: [{ required: true, min: 1, max: 15, message: '文章标题限1-25个字', trigger: 'blur' }],
        tags: [{ required: true, validator: validateTags, trigger: 'change' }],
        content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.getData(this.page.current, this.curTab)
  },
  computed: {
  },
  methods: {
    // 隐藏项目行样式
    rowClassName (row, index) {
      if (!this.articleData[index].isShow) {
        return 'table-hide-row'
      } else {
        return ''
      }
    },
    // 置顶按钮文案
    topText (index) {
      return this.articleData[index].isTop ? '取消置顶' : '置顶'
    },
    // 隐藏按钮文案
    hideText (index) {
      return this.articleData[index].isShow ? '隐藏' : '取消隐藏'
    },
    // 时间格式化
    formattime (time) {
      return datetime(time / 1000)
    },
    // 新增文章标签
    handleAddTag () {
      this.articleForm.tags.push(this.curTag)
      this.curTag = ''
    },
    // 删除文章标签
    handleCloseTag (event, name) {
      let index = this.articleForm.tags.indexOf(name)
      this.articleForm.tags.splice(index, 1)
    },
    // 置顶文章
    handleTopArcticle (index) {
      let _this = this
      let text
      axios.post(`${this.$golbal.host}/topArticle`, {
        id: _this.articleData[index]._id,
        isTop: !_this.articleData[index].isTop
      }).then(function (res) {
        if (res.data.code === 0) {
          text = _this.articleData[index].isTop ? '取消置顶' : '置顶'
          _this.$Message.success(`${text}成功！`)
          _this.getData(1, _this.curTab)
        } else {
          _this.$Message.error(res.data.msg)
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
        id: _this.articleData[index]._id,
        isShow: !_this.articleData[index].isShow
      }).then(function (res) {
        if (res.status === 200) {
          text = _this.articleData[index].isShow ? '隐藏' : '取消隐藏'
          _this.$Message.success(`${text}成功！该操作只会影响前台页面的展示而已。`)
          _this.getData(1, _this.curTab)
        } else {
          _this.$Message.error(`${text}失败！`)
        }
      }).catch(function () {
        _this.$Message.error('接口异常！')
      })
    },
    // 新建文章
    handleAddArcticle () {
      this.articleModal = true
      this.articleForm = {
        id: '',
        type: 'add',
        title: '',
        tab: this.curTab,
        tags: [],
        content: ''
      }
    },
    // 编辑文章
    handleEditArcticle (index) {
      this.articleModal = true
      this.articleForm = {
        id: this.articleData[index]._id,
        type: 'update',
        title: this.articleData[index].title,
        tab: this.articleData[index].type,
        tags: this.articleData[index].tags.split(','),
        content: this.articleData[index].content
      }
    },
    // 删除文章
    handleDeleteArticle (index) {
      this.articleForm = {
        id: this.articleData[index]._id,
        type: 'delete',
        title: '',
        tab: '',
        tags: [],
        content: ''
      }
    },
    // 获取文章列表
    getData (current, type) {
      this.loading = true
      let _this = this
      axios.get(`${this.$golbal.host}/getArticle`, {
        params: {
          pageCurrent: current,
          pageSize: _this.page.size,
          type: type
        }
      }).then(function (res) {
        _this.loading = false
        if (res.data.code === 0) {
          _this.permission = false
          _this.articleData = res.data.data
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
      this.getData(page, this.curTab)
    },
    // tab切换
    handleChangeTab (tab) {
      this.curTab = tab
      this.getData(1, tab)
    },
    // 提交文章
    handleSubmit (name) {
      let _this = this
      // 新增、更新
      if (name) {
        _this.$refs[name].validate((valid) => {
          if (valid) {
            _this.submitloading = true
            _this.axiosSubmit()
          }
        })
        // 删除
      } else {
        _this.axiosSubmit()
      }
    },
    // 提交请求
    axiosSubmit () {
      let _this = this
      axios.post(`${_this.$golbal.host}/${_this.articleForm.type}Article`, {
        id: _this.articleForm.id,
        title: _this.articleForm.title,
        type: _this.articleForm.tab,
        tags: _this.articleForm.tags.join(','),
        content: _this.articleForm.content
      }).then(function (res) {
        _this.submitloading = false
        _this.articleModal = false
        if (res.data.code === 0) {
          _this.$Message.success(`${_this.typeZh[_this.articleForm.type]}成功！`)
          _this.getData(1, _this.curTab)
        } else {
          _this.$Message.error(`${_this.typeZh[_this.articleForm.type]}失败！`)
        }
      }).catch(function () {
        _this.$Message.error('接口异常！')
      })
    }
  }
}
</script>
