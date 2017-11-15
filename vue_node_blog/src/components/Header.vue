<template>
  <header class="layout-header">
    <Menu mode="horizontal" theme="dark" :active-name="curMenuName">
      <div class="logo">小熊的后台很硬</div>
      <div class="nav">
        <MenuItem name="home">
          <Icon type="ios-home"></Icon>
          首页
        </MenuItem>
        <template v-if="userInfo.username === ''">
          <MenuItem name="user-unlogin">
            <Button type="text" size="small" class="btn-login" @click="handleLogin">登录</Button>
            <Button type="text" size="small" class="btn-register" @click="handleRegister">注册</Button>
          </MenuItem>
        </template>
        <template v-if="userInfo.username !== ''">
          <MenuItem name="user-logined">
            <Icon type="person"></Icon>
            <span>你好，{{ userInfo.username }}</span>
            <Button type="text" size="small" class="btn-register" @click="handleLogout">退出</Button>
          </MenuItem>
        </template>
      </div>
    </Menu>
    <Modal
      v-model="userModal"
      :title="`${typeZh[userForm.type]}信息`"
      :ok-text="`${typeZh[userForm.type]}`"
      width="300">
      <Form ref="userForm" :model="userForm" :rules="rules">
        <FormItem prop="username">
          <Input type="text" v-model="userForm.username" placeholder="请输入用户名">
            <Icon type="person" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="userForm.password" placeholder="请输入密码">
            <Icon type="ios-locked" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="passwordAgain" v-if="userForm.type === 'register'">
          <Input type="password" v-model="userForm.passwordAgain" placeholder="请确认密码">
            <Icon type="ios-locked" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="code" v-if="userForm.type === 'register'">
          <Input type="text" v-model="userForm.code" placeholder="拥有邀请码的用户可升为平台管理员">
            <Icon type="card" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
      <div class="tip-text">
        <Button type="text" size="small" @click="handleSwitchModal('login')" v-if="userForm.type === 'register'">已有账号，点击登录</Button>
        <Button type="text" size="small" @click="handleSwitchModal('register')" v-if="userForm.type === 'login'">没有账号，点击注册</Button>
      </div>
      <div slot="footer">
        <Button type="primary" size="large" long :loading="userLoading" @click="handleSubmit('userForm')">{{ typeZh[userForm.type] }}</Button>
      </div>
    </Modal>
  </header>
</template>

<style lang="stylus">
  .layout-header
    .logo
      line-height 30px
      font-size 16px
      color #fff
      float left
      position relative
      top 15px
      left 20px
    .nav
      float right
    .btn-login, .btn-register, .btn-user
      color rgba(255,255,255,.7)
  .tip-text
    text-align right
  .ivu-btn-text
    color #999
</style>

<script>
  import axios from 'axios'
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'header',
    data () {
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.userForm.passwordAgain !== '') {
            this.$refs.userForm.validateField('passwordAgain')
          }
          callback()
        }
      }
      const validatePasswordAgain = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.userForm.password) {
          callback(new Error('两次密码不一致，请重新输入'))
        } else {
          callback()
        }
      }
      return {
        curMenuName: 'home',
        userModal: false,
        userLoading: false,
        userForm: {
          type: '',
          username: '',
          password: '',
          passwordAgain: '',
          code: ''
        },
        typeZh: {
          register: '注册',
          login: '登录'
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, validator: validatePassword, trigger: 'blur' }
          ],
          passwordAgain: [
            { required: true, validator: validatePasswordAgain, trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {
      this.GetUserInfo()
    },
    computed: {
      ...mapState({
        userInfo: state => state.userInfo
      })
    },
    methods: {
      ...mapMutations([
        'STATE_USERINFO'
      ]),
      ...mapActions([
        'GetUserInfo'
      ]),
      // 切换登录、注册
      handleSwitchModal (type) {
        this.userForm = {
          type: type,
          username: '',
          password: '',
          passwordAgain: '',
          code: ''
        }
      },
      // 信息重置
      dataReset () {
        this.userForm = {
          type: '',
          username: '',
          password: '',
          passwordAgain: '',
          code: ''
        }
      },
      // 登录弹层
      handleLogin () {
        this.userModal = true
        this.userForm.type = 'login'
      },
      // 注册弹层
      handleRegister () {
        this.userModal = true
        this.userForm.type = 'register'
      },
      // 退出登录
      handleLogout () {
        var _this = this
        axios.post(`${this.$golbal.host}/logout`).then(function (res) {
          if (res.data.code === 0) {
            _this.$Message.success('退出成功！')
            setTimeout(function () {
              window.location.reload()
            }, 500)
          } else {
            _this.$Message.error('退出失败！')
          }
        }).catch(function () {
          _this.$Message.error('接口异常！')
        })
      },
      // 注册、登录提交
      handleSubmit (name) {
        this.userLoading = true

        var _this = this
        var data = {
          username: this.userForm.username,
          password: this.userForm.password
        }

        if (this.userForm.type === 'register') {
          data.code = this.userForm.code
        }

        this.$refs[name].validate((valid) => {
          if (valid) {
            let _this = this
            axios.post(`${this.$golbal.host}/${_this.userForm.type}`, data).then(function (res) {
              _this.userLoading = false
              if (res.data.code === 0) {
                _this.$Message.success(`${_this.typeZh[_this.userForm.type]}成功！`)
                _this.userModal = false
                // 注册立即登录
                if (_this.userForm.type === 'register') {
                  axios.post(`${_this.$golbal.host}/login`, data).then(function (res) {
                    setTimeout(function () {
                      window.location.reload()
                    }, 500)
                  })
                }
              } else {
                // 用户名已被注册
                if (_this.userForm.type === 'register') {
                  _this.userForm.username = ''
                }
                _this.$Message.error(res.data.msg)
              }
            }).catch(function () {
              _this.$Message.error('接口异常！')
            })
          } else {
            _this.userLoading = false
            _this.$Message.error('信息填写有误！')
          }
        })
      }
    }
  }
</script>
