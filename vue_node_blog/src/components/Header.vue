<template>
  <header class="layout-header">
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="logo">小熊的后台很硬</div>
      <div class="nav">
        <MenuItem name="1">
          <Icon type="ios-home"></Icon>
          首页
        </MenuItem>
        <MenuItem name="2">
          <Icon type="person"></Icon>
          <template v-if="userInfo.username === ''">
            <Button type="text" size="small" class="btn-login" @click="handleLogin">登录</Button>
            <Button type="text" size="small" class="btn-register" @click="handleRegister">注册</Button>
          </template>
          <template v-if="userInfo.username !== ''">
              你好，{{ userInfo.username }}
              <Button type="text" size="small" class="btn-register" @click="handleLogout">退出</Button>
          </template>
        </MenuItem>
      </div>
    </Menu>
    <Modal
      v-model="userModal"
      :title="`${typeZh[userForm.type]}`"
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
    .btn-login, .btn-register
      color rgba(255,255,255,.7)
</style>

<script>
  import axios from 'axios'
  export default {
    name: 'header',
    data () {
      return {
        userModal: false,
        userLoading: false,
        userInfo: {
          username: ''
        },
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
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          passwordAgain: [
            { required: true, message: '请确认确认密码', trigger: 'blur' }
          ]
        }
      }
    },
    mounted () {

    },
    methods: {
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
      // 退出登录
      handleLogout () {

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
      // 注册、登录提交
      handleSubmit (name) {
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
            axios.post(`${this.$golbal.host}/${_this.userForm.type}`, data).then(function (response) {
              if (response.data.code === 0) {
                _this.userInfo.username = response.data.userInfo.username
                _this.$Message.success(`${_this.typeZh[_this.userForm.type]}成功！`)
                _this.userModal = false
                _this.dataReset()
              } else {
                _this.$Message.error(response.data.msg)
              }
            }).catch(function () {
              _this.$Message.error('接口异常！')
            })
          } else {
            _this.$Message.error('信息填写有误！')
          }
        })
      }
    }
  }
</script>
