<template>
  <div class="login-container">
    <el-tabs v-model="activeTab" stretch>
      <!-- 登录表单 -->
      <el-tab-pane label="登录" name="login">
        <el-form ref="loginForm" :model="form" :rules="rules" @submit.native.prevent="handleLogin">
          <el-form-item prop="phone">
            <el-input
              v-model="form.phone"
              prefix-icon="el-icon-mobile"
              placeholder="请输入手机号"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              type="password"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              native-type="submit"
              class="submit-btn"
            >登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>

      <!-- 注册表单 -->
      <el-tab-pane label="注册" name="register">
        <el-form ref="registerForm" :model="form" :rules="rules" @submit.native.prevent="handleRegister">
          <el-form-item prop="phone">
            <el-input
              v-model="form.phone"
              prefix-icon="el-icon-mobile"
              placeholder="请输入手机号"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="form.password"
              prefix-icon="el-icon-lock"
              placeholder="请输入密码"
              type="password"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              v-model="form.confirmPassword"
              prefix-icon="el-icon-lock"
              placeholder="请再次输入密码"
              type="password"
              size="small"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="success"
              size="small"
              native-type="submit"
              class="submit-btn"
            >立即注册</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
export default {
  name: 'BlogLogin',
  data () {
    const validatePhone = (rule, value, callback) => {
      if (!/^1[3-9]\d{9}$/.test(value)) {
        callback(new Error('请输入有效的手机号码'))
      } else {
        callback()
      }
    }
    const validateConfirm = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }

    return {
      activeTab: 'login',
      form: {
        phone: '17719472069',
        password: '123456',
        confirmPassword: '123456'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { validator: validateConfirm, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 处理登录
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$router.push('/')
          this.$message({
            message: '登录成功',
            type: 'success'
          })
        }
      })
    },
    // 处理注册
    handleRegister () {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          // 这里添加注册逻辑
          this.activeTab = 'login'
          this.$message({
            message: '注册成功，请登录',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f2f5; /* 移除背景图，添加浅灰色背景 */
}
.el-tabs {
  width: 360px;
  padding: 30px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}
.submit-btn {
  width: 100%;
  margin-top: 10px;
}

.el-tabs__item {
  font-size: 16px;
}

.el-form-item {
  margin-bottom: 20px;
}
</style>
