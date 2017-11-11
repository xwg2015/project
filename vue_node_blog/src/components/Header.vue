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
          <Button type="text" size="small" class="btn-login" @click="handleLogin">登录</Button>
          <Button type="text" size="small" class="btn-register" @click="handleRegister">注册</Button>
        </MenuItem>
      </div>
    </Menu>
    <Modal
      v-model="userModal"
      :title="`${typeZh[userForm.type]}`"
      :ok-text="`${typeZh[userForm.type]}`"
      width="300"
      @on-ok="handleSubmit">
      <Form ref="userForm" :model="userForm" :rules="rules">
        <FormItem prop="username">
          <Input type="text" v-model="userForm.username" placeholder="请输入用户名">
            <Icon type="person" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="text" v-model="userForm.password" placeholder="请输入密码">
            <Icon type="ios-locked" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="passwordAgain" v-if="userForm.type === 'register'">
          <Input type="text" v-model="userForm.passwordAgain" placeholder="请确认密码">
            <Icon type="ios-locked" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="code" v-if="userForm.type === 'register'">
          <Input type="text" v-model="userForm.code" placeholder="拥有邀请码的用户可升为平台管理员">
            <Icon type="card" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
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
  export default {
    name: 'header',
    data () {
      return {
        userModal: false,
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
            { required: true, message: '用户名都不输，鬼知道你是谁', trigger: 'blur' }
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
      handleLogin () {
        this.userModal = true
        this.userForm.type = 'login'
      },
      handleRegister () {
        this.userModal = true
        this.userForm.type = 'register'
      },
      handleSubmit () {

      }
    }
  }
</script>
