<script>
import { Message } from 'element-ui'
import router from '@/router'
export default {
  name: 'BlogAbout',
  data () {
    return {
      userInfo: {
        nickname: '明',
        gender: '男',
        age: 28,
        city: '北京',
        bio: '前端开发工程师，致力于分享Web开发技术和经验。热爱编程、设计和新技术探索。',
        email: 'example@techinsights.com'
      },
      isEditing: false,
      originalInfo: {}
    }
  },
  created () {
    // 深拷贝用户信息，用于取消编辑
    this.originalInfo = JSON.parse(JSON.stringify(this.userInfo))
  },
  methods: {
    startEditing () {
      this.isEditing = true
    },
    saveInfo () {
      // 这里可以添加保存逻辑，比如发送到服务器
      this.originalInfo = JSON.parse(JSON.stringify(this.userInfo))
      this.isEditing = false
      // 保存成功提示
      Message.success('个人信息保存成功！')
    },
    cancelEditing () {
      // 恢复原始信息
      this.userInfo = JSON.parse(JSON.stringify(this.originalInfo))
      this.isEditing = false
    },
    logout () {
      // 清除登录状态
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      // 跳转到登录页
      router.push('/login')
      // 显示退出登录成功提示
      Message.success('退出登录成功！')
    }
  }
}
</script>
<template>
  <div class="about-container" style="background-color: #e6f7ff; min-height: 100vh; padding: 40px 20px;">
    <el-card class="about-card" style="max-width: 800px; margin: 0 auto; border-radius: 12px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);">
      <div class="about-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
        <h1 style="color: #1890ff; font-size: 28px; margin: 0;">关于我</h1>
        <div style="display: flex; gap: 10px;">
          <el-button
            type="primary"
            @click="isEditing ? cancelEditing() : startEditing()"
            :icon="isEditing ? 'el-icon-refresh-right' : 'el-icon-edit'"
            size="medium"
          >
            {{ isEditing ? '取消' : '编辑' }}
          </el-button>
          <el-button
            type="danger"
            @click="logout"
            icon="el-icon-exit"
            size="medium"
          >
            退出登录
          </el-button>
        </div>
      </div>

      <div class="profile-content" style="display: flex; flex-direction: column; align-items: center;">
        <!-- 头像 -->
        <div class="avatar-container" style="width: 180px; height: 180px; border-radius: 50%; overflow: hidden; margin-bottom: 30px; border: 4px solid #1890ff;">
          <img src="@/assets/avatar.png" alt="个人头像" style="width: 100%; height: 100%; object-fit: cover;">
        </div>

        <!-- 个人信息表单 -->
        <el-form :model="userInfo" label-width="100px" style="width: 100%; max-width: 600px;">
          <el-form-item label="昵称" prop="nickname">
            <el-input v-if="isEditing" v-model="userInfo.nickname" placeholder="请输入昵称" clearable></el-input>
            <span v-else class="info-value" style="font-size: 18px; font-weight: 500;">{{ userInfo.nickname }}</span>
          </el-form-item>

          <el-form-item label="性别" prop="gender">
            <el-select v-if="isEditing" v-model="userInfo.gender" placeholder="请选择性别" clearable>
              <el-option label="男" value="男"></el-option>
              <el-option label="女" value="女"></el-option>
              <el-option label="保密" value="保密"></el-option>
            </el-select>
            <span v-else class="info-value" style="font-size: 18px;">{{ userInfo.gender }}</span>
          </el-form-item>

          <el-form-item label="年龄" prop="age">
            <el-input v-if="isEditing" v-model.number="userInfo.age" type="number" placeholder="请输入年龄" min="0"></el-input>
            <span v-else class="info-value" style="font-size: 18px;">{{ userInfo.age }}</span>
          </el-form-item>

          <el-form-item label="城市" prop="city">
            <el-input v-if="isEditing" v-model="userInfo.city" placeholder="请输入城市" clearable></el-input>
            <span v-else class="info-value" style="font-size: 18px;">{{ userInfo.city }}</span>
          </el-form-item>

          <el-form-item label="邮箱" prop="email">
            <el-input v-if="isEditing" v-model="userInfo.email" type="email" placeholder="请输入邮箱" clearable></el-input>
            <span v-else class="info-value" style="font-size: 18px; color: #1890ff;">{{ userInfo.email }}</span>
          </el-form-item>

          <el-form-item label="个人简介" prop="bio">
            <el-input
              v-if="isEditing"
              v-model="userInfo.bio"
              type="textarea"
              placeholder="请输入个人简介"
              :rows="5"
            ></el-input>
            <div v-else class="info-value" style="font-size: 16px; line-height: 1.8; white-space: pre-line;">{{ userInfo.bio }}</div>
          </el-form-item>

          <el-form-item v-if="isEditing" style="text-align: right; margin-top: 20px;">
            <el-button type="primary" @click="saveInfo" size="medium">保存</el-button>
            <el-button @click="cancelEditing" size="medium" style="margin-left: 10px;">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<style scoped>
/* 响应式调整 */
@media (max-width: 768px) {
  .about-container {
    padding: 20px 15px;
  }
  .avatar-container {
    width: 150px; height: 150px;
  }
  .about-header h1 {
    font-size: 24px;
  }
  .about-header {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
  el-form {
    width: 90%;
  }
}
</style>
