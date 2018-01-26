<template>
  <section class="page page-blog-project">
    <Alert class="mod-alert" show-icon closable>
      温馨提示：如果个人项目有自己的服务器请填写链接，如果没有可以联系超管帮忙上传到服务器并给到你链接，仅限于静态页面。
    </Alert>
    <header class="mod-header">
      <h2>项目管理</h2>
      <Button type="primary" @click="handleAddProject" :disabled="permission">新建项目</Button>
    </header>
    <Table border :row-class-name="rowClassName" :columns="projectColumns" :loading="loading" :data="projectData"></Table>
    <Page :total="page.total" :current="page.current" :page-size="page.size" class-name="mod-pagination" show-total @on-change="handleChangePage"></Page>
    <Modal
      v-model="projectModal"
      width="30"
      :title="`${typeZh[projectForm.type]}项目`">
      <Form :model="projectForm" ref="projectForm" label-position="top" :rules="rules">
        <FormItem label="项目名称（限25个字之内）" prop="name">
          <Input v-model="projectForm.name" placeholder="请输入项目名称"></Input>
        </FormItem>
        <FormItem label="项目简介（限150个字之内）" prop="about">
          <Input v-model="projectForm.about" type="textarea" :rows="4" placeholder="请输入项目简介"></Input>
        </FormItem>
        <FormItem label="项目链接（可选）">
          <Input v-model="projectForm.link" placeholder="请输入项目链接">
            <span slot="prepend">(http|https:)//</span>
          </Input>
        </FormItem>
        <FormItem label="项目源码（可选）">
          <Input v-model="projectForm.src" placeholder="请输入项目源码">
            <span slot="prepend">(http|https:)//</span>
          </Input>
        </FormItem>
        <FormItem label="封面图" prop="cover">
          <input v-model="projectForm.cover" type="hidden">
          <XUpload v-model="projectForm.cover"></XUpload>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="primary" size="large" :loading="submitloading" @click="handleSubmit('projectForm')">提 交</Button>
      </div>
    </Modal>
  </section>
</template>

<style lang="stylus">
</style>

<script>
import axios from 'axios'
import { datetime } from '../../lib/format-time'
import XUpload from '../../components/Upload'
export default {
  name: 'project',
  components: { XUpload },
  data () {
    return {
      permission: true,
      projectModal: false,
      projectForm: {
        id: '',
        type: '',
        name: '',
        about: '',
        link: '',
        src: '',
        cover: ''
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
      loading: false,
      submitloading: false,
      projectData: [],
      projectColumns: [
        {
          type: 'index',
          width: 60,
          align: 'center'
        },
        {
          title: '名称',
          key: 'name'
        },
        {
          title: '作者',
          key: 'author'
        },
        // {
        //   title: '简介',
        //   key: 'about'
        // },
        {
          title: '链接',
          key: 'link',
          render: (h, params) => {
            return h(
              'a',
              {
                attrs: {
                  target: '_blank',
                  href: `//${params.row.link}`
                }
              },
              params.row.link
            )
          }
        },
        {
          title: '封面',
          key: 'cover',
          width: 156,
          render: (h, params) => {
            return h(
              'img',
              {
                attrs: {
                  src: params.row.cover
                },
                style: {
                  width: '120px',
                  height: '90px',
                  marginTop: '6px'
                }
              }
            )
          }
        },
        {
          title: '创建时间',
          key: 'createTime',
          render: (h, params) => {
            return h('span', this.formattime(new Date(params.row.createTime)))
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
                  title: '你确定要删除这个项目吗？'
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
                        this.handleDeleteProject(params.index)
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
        name: [{ required: true, min: 1, max: 25, message: '项目名称限1-25个字', trigger: 'blur' }],
        about: [{ required: true, min: 1, max: 150, message: '项目简介限1-150个字', trigger: 'blur' }],
        cover: [{ required: true, message: '请上传封面图', trigger: 'blur' }]
      }
    }
  },
  mounted () {
    this.getData(this.page.current)
  },
  methods: {
    // 隐藏项目行样式
    rowClassName (row, index) {
      if (!this.projectData[index].isShow) {
        return 'table-hide-row'
      } else {
        return ''
      }
    },
    // 隐藏按钮文案
    hideText (index) {
      return this.projectData[index].isShow ? '隐藏' : '取消隐藏'
    },
    // 时间格式化
    formattime (time) {
      return datetime(time / 1000)
    },
    // 隐藏项目
    handleHideArcticle (index) {
      let _this = this
      let text
      axios.post(`${_this.$golbal.host}/hideProject`, {
        id: _this.projectData[index]._id,
        isShow: !_this.projectData[index].isShow
      }).then(function (res) {
        if (res.data.code === 0) {
          text = _this.projectData[index].isShow ? '隐藏' : '取消隐藏'
          _this.$Message.success(`${text}成功！该操作只会影响前台页面的展示而已。`)
          _this.getData(1)
        } else {
          _this.$Message.error(`${text}失败！`)
        }
      }).catch(function () {
        _this.$Message.error('接口异常！')
      })
    },
    // 删除项目
    handleDeleteProject (index) {
      this.projectForm = {
        id: this.projectData[index]._id,
        type: 'delete',
        name: '',
        about: '',
        link: '',
        src: '',
        cover: ''
      }
    },
    // 新建项目
    handleAddProject () {
      this.projectModal = true
      this.projectForm = {
        id: '',
        type: 'add',
        name: '',
        about: '',
        link: '',
        src: '',
        cover: ''
      }
    },
    // 编辑项目
    handleEditArcticle (index) {
      this.projectModal = true
      this.projectForm = {
        id: this.projectData[index]._id,
        type: 'update',
        name: this.projectData[index].name,
        about: this.projectData[index].about,
        link: this.projectData[index].link,
        src: this.projectData[index].src,
        cover: this.projectData[index].cover
      }
    },
    // 获取项目列表
    getData (current) {
      this.loading = true
      let _this = this
      axios.get(`${_this.$golbal.host}/getProject`, {
        params: {
          pageCurrent: current,
          pageSize: _this.page.size
        }
      }).then(function (res) {
        _this.loading = false
        if (res.data.code === 0) {
          _this.permission = false
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
    },
    // 提交项目
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
      var _this = this
      console.log(_this.projectForm.cover)
      axios.post(`${_this.$golbal.host}/${_this.projectForm.type}Project`, {
        id: _this.projectForm.id,
        name: _this.projectForm.name,
        about: _this.projectForm.about,
        link: _this.projectForm.link,
        src: _this.projectForm.src,
        cover: _this.projectForm.cover,
        createTime: new Date()
      }).then(function (res) {
        _this.submitloading = false
        _this.projectModal = false
        if (res.data.code === 0) {
          _this.$Message.success(`${_this.typeZh[_this.projectForm.type]}成功！`)
          _this.getData(1)
        } else {
          _this.$Message.error(res.data.msg)
        }
      }).catch(function () {
        _this.$Message.error('接口异常！')
      })
    }
  }
}
</script>
