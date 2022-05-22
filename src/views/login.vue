<template>
  <div class="login-warp">
    <div class="welcome-title">
      <img src="../assets/img/logo.png" alt="" class="logo">
      <span>欢 迎 使 用 马 涛 多 功 能 平 台</span>
    </div>
    <el-form label-position="left" ref="userRef" :rules="userRules" :model="userForm" labler-width="0px" class="loginForm login-container">
      <h3 class="title">用户登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model='userForm.username' placeholder="账号/手机号" prefix-icon="el-icon-user" clearable ></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="userForm.password" placeholder="密码" clearable prefix-icon="el-icon-unlock" @keyup.enter.native="login">
        </el-input>
      </el-form-item>
      <el-row style="margin-top: -10px">
        <el-col :span="8">
          <el-checkbox class="remember" v-model="remembered">记住密码</el-checkbox>
        </el-col>
        <el-col :span="16">
          <el-button type="text" style="float: right" @click="register_dialog=true">立即注册</el-button>
        </el-col>
      </el-row>
      <el-form-item style="width: 100%; margin-top: 20px">
        <el-button type="primary" style="width: 100%" @click="login" :loading="logging">登录</el-button>
      </el-form-item>
    </el-form>
    <el-link class="footer" href="https://element.eleme.io" target="_blank" :underline="false">暂无国家备案号</el-link>
    <el-dialog
      title="注册用户"
      :visible.sync="register_dialog"
      width="450px"
      destroy-on-close
      :append-to-body="true">
      <el-form ref="registerRef" :rules="registerRules" :model="registerForm" label-width="80px">
        <el-form-item prop="username" label="账号">
          <el-input v-model='registerForm.username' placeholder="请输入登录账号" clearable ></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model='registerForm.password' placeholder="请输入8-18位密码" clearable ></el-input>
        </el-form-item>
        <el-form-item prop="password_repeat" label="确认密码">
          <el-input v-model='registerForm.password_repeat' placeholder="请输入确认密码" clearable ></el-input>
        </el-form-item>
        <el-form-item prop="nick" label="昵称">
          <el-input v-model="registerForm.nick" placeholder="请输入用户昵称"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机">
          <el-input v-model='registerForm.phone' placeholder="请输入手机号码" clearable ></el-input>
        </el-form-item>
        <el-form-item prop="email" label="邮箱">
          <el-input v-model='registerForm.email' placeholder="请输入邮箱地址" clearable ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="register">注册</el-button>
      </span>
      </el-dialog>
  </div>
</template>

<script>
import { setCookie, delCookie } from '@/utils/base_func'

export default {
  name: 'LoginPage',
  data () {
    const validateMobile = (rule, value, callback) => {
      if (value.length !== 11 || !(/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1})|)+\d{8})$/.test(value))) {
        callback(new Error('手机号码格式不正确！'))
      } else {
        callback()
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('密码不能为空'))
      } else {
        if (value.length < 8 || value.length > 18) {
          callback(new Error('密码长度不规范'))
        } else if (this.registerForm.password_repeat !== '') {
          this.$refs.registerRef.validateField('password_repeat')
        }
        callback()
      }
    };
    const validatePasswordRepeat = (rule, value, callback) => {
      if (value === "") {
        callback(new Error('密码不能为空'))
      } else if (value.length < 8 || value.length > 18) {
        callback(new Error('密码长度不规范'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次密码输入不一致'))
      }
      callback()
    }
    return {
      register_dialog: false,
      logging: false,
      remembered: false,
      userForm: {
        username: '',
        password: ''
      },
      userRules: {
        username: [
          { require: true, message: '请输入用户名', trigger: 'blur' },
          { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { require: true, message: '请输入密码', trigger: 'blur' },
          { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
        ]
      },
      registerForm: {
        username: '',
        password: '',
        password_repeat: '',
        nick: '',
        phone: '',
        email: ''
      },
      registerRules: {
        username: [
          { require: true, message: '请输入用户名', trigger: 'blur' },
          { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
        ],
        password: [
          { require: true, message: '请输入密码', trigger: 'blur', validator: validatePassword },
          { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
        ],
        password_repeat: [
          { require: true, message: '请输入确认密码', trigger: 'blur', validator: validatePasswordRepeat },
          { min: 8, max: 18, message: '长度在 8 到 18 个字符', trigger: 'blur' }
        ],
        phone: [
          { require: false, validator: validateMobile },
          { min: 11, max: 11, message: '手机号码长度为11', trigger: 'blur' }
        ]
      },
    }
  },
  methods: {
    login () {
      this.$refs.userRef.validate(async valid => {
        if (valid) {
          this.logging = true
          // 此处可进行密码加密，后端进行密码解密
          const { data: loginResponse } = await this.$axios.post('/user/login/', this.$qs.stringify(this.userForm))
          console.log(loginResponse)
          if (loginResponse.code === 200) {
            if (this.remembered) {
              // 设置cookie
              setCookie('user', this.userForm.username, 7)
              setCookie('pwd', this.userForm.password, 7)
            } else {
              // 删除cookie
              delCookie('user')
              delCookie('pwd')
            }
            window.sessionStorage.setItem("token", loginResponse.data.token)
            this.$msg.success(loginResponse.msg)
            await this.$router.push('/index')
          } else {
            this.logging = false
            this.$msg.error(loginResponse.msg)
          }
        }
      })
    },
    register () {
      this.$refs.registerRef.validate( async valid => {
        if (valid) {
          const { data: registerResponse } = await this.$axios.post('/user/register/', this.$qs.stringify(this.registerForm))
          if (registerResponse === 200) {
            this.$msg.success(registerResponse.msg)
          } else {
            this.$msg.error(registerResponse.msg)
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.login-warp {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding-top: 10%;
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;
}
.welcome-title {
  font-family: initial;
  text-align: center;
  font-size: 36px;
  margin-bottom: 40px;
}
.logo {
  width: 40px;
  height: 40px;
  margin-bottom: -6px;
}
.login-container {
  border-radius: 10px;
  margin: 0 auto;
  width: 350px;
  padding: 30px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  text-align: left;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.1);
}
.title {
  font-family: initial;
  font-size: 20px;
  text-align: center;
  margin: 0 auto 40px auto;
  color: #505458;
}
.remember {
  margin: 11px 0 0 0;
}
.footer {
  position: fixed;
  font-size: 12px;
  left: 0;
  right: 0;
  bottom: 10px;
}
</style>
