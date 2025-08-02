<template>
  <div class="article-detail-container">
    <div class="article-header">
      <h1 class="article-title">{{ article.title }}</h1>
      <div class="article-meta">
        <span class="article-date">{{ article.date }}</span>
        <span class="article-category">{{ article.category }}</span>
        <span class="article-read-time">{{ article.readTime }}分钟</span>
      </div>
    </div>
    <div class="article-content">
      <div v-html="article.excerpt"></div>
    </div>
    <div class="article-footer">
      <el-button @click="goBack" type="primary" size="small">返回列表</el-button>
    </div>

    <!-- 评论区域 -->
    <div class="comment-section">
      <h3 class="comment-title">评论 <span class="comment-count">({{ comments.length }})</span></h3>

      <!-- 评论表单 -->
      <div class="comment-form">
        <el-input
          v-model="commentAuthor"
          placeholder="请输入您的昵称"
          style="margin-bottom: 10px;"
        ></el-input>
        <el-input
          v-model="commentContent"
          type="textarea"
          placeholder="写下你的评论..."
          :rows="4"
        ></el-input>
        <div class="form-footer">
          <el-button @click="submitComment" type="primary" :loading="submitting">{{ editingCommentId ? '更新评论' : '提交评论' }}</el-button>
          <el-button v-if="editingCommentId" @click="cancelEdit" type="default" style="margin-right: 10px;">取消</el-button>
        </div>
      </div>

      <!-- 评论列表 -->
      <div class="comment-list" v-if="comments.length > 0">
        <div class="comment-item" v-for="comment in comments" :key="comment.id">
          <div class="comment-avatar">
            <img src="@/assets/avatar.png" alt="用户头像">
          </div>
          <div class="comment-body">
            <div class="comment-header">
              <span class="comment-author">{{ comment.author }}</span>
              <span class="comment-time">{{ comment.time }}</span>
              <div class="comment-actions">
                <el-button @click="editComment(comment)" type="text" size="small">编辑</el-button>
                <el-button @click="deleteComment(comment.id)" type="text" size="small" style="color: #f56c6c;">删除</el-button>
              </div>
            </div>
            <div class="comment-content">{{ comment.content }}</div>
          </div>
        </div>
      </div>
      <div class="no-comment" v-else>
        暂无评论，快来抢沙发吧~</div>
    </div>
  </div>
</template>

<script>
import api from '@/api/article'

export default {
  name: 'ArticleDetail',
  data () {
    return {
      article: {
        id: '',
        title: '',
        date: '',
        category: '',
        readTime: '',
        excerpt: ''
      },
      comments: [
        {
          id: 1,
          author: '用户1',
          content: '这是一条评论',
          time: '2024-05-01 12:00:00'
        }
      ],
      commentAuthor: '',
      commentContent: '',
      submitting: false,
      editingCommentId: null
    }
  },
  created () {
    // 获取路由参数中的文章ID
    const id = this.$route.params.id
    // 根据ID获取文章详情
    this.getArticleDetail(id)
    // 获取文章评论
    this.getArticleComments(id)
  },
  methods: {
    getArticleDetail (id) {
      api.getArticle(id)
        .then(response => {
          this.article = response.data
        })
        .catch(error => {
          console.error('获取文章详情失败', error)
          this.$message.error('获取文章详情失败')
        })
    },
    getArticleComments (articleId) {
      api.getComments(articleId)
        .then(response => {
          this.comments = response.data
        })
        .catch(error => {
          console.error('获取评论失败', error)
          this.$message.error('获取评论失败')
        })
    },
    submitComment () {
      if (!this.commentAuthor.trim()) {
        this.$message.warning('请输入您的昵称')
        return
      }
      if (!this.commentContent.trim()) {
        this.$message.warning('评论内容不能为空')
        return
      }

      this.submitting = true
      const articleId = this.article.id
      const commentData = {
        author: this.commentAuthor,
        content: this.commentContent
      }

      if (this.editingCommentId) {
        // 更新评论
        api.updateComment(articleId, this.editingCommentId, commentData)
          .then(() => {
            this.$message.success('评论更新成功')
            this.commentContent = ''
            this.editingCommentId = null
            this.getArticleComments(articleId)
          })
          .catch(error => {
            console.error('更新评论失败', error)
            this.$message.error('更新评论失败')
          })
          .finally(() => {
            this.submitting = false
          })
      } else {
        // 添加新评论
        api.addComment(articleId, commentData)
          .then(() => {
            this.$message.success('评论成功')
            this.commentAuthor = ''
            this.commentContent = ''
            this.getArticleComments(articleId)
          })
          .catch(error => {
            console.error('提交评论失败', error)
            this.$message.error('提交评论失败')
          })
          .finally(() => {
            this.submitting = false
          })
      }
    },
    deleteComment (commentId) {
      this.$confirm('确定要删除这条评论吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        api.deleteComment(this.article.id, commentId)
          .then(() => {
            this.$message.success('删除评论成功')
            this.getArticleComments(this.article.id)
          })
          .catch(error => {
            console.error('删除评论失败', error)
            this.$message.error('删除评论失败')
          })
      }).catch(() => {
        // 取消删除
      })
    },
    editComment (comment) {
      this.commentAuthor = comment.author
      this.commentContent = comment.content
      this.editingCommentId = comment.id
      // 滚动到评论表单
      document.querySelector('.comment-form').scrollIntoView({ behavior: 'smooth' })
    },
    cancelEdit () {
      this.commentAuthor = ''
      this.commentContent = ''
      this.editingCommentId = null
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.article-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.article-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.article-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
  line-height: 1.3;
}

.article-meta {
  display: flex;
  align-items: center;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.article-date,
.article-category,
.article-read-time {
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
}

.article-date:before,
.article-category:before,
.article-read-time:before {
  margin-right: 0.5rem;
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}

.article-date:before {
  content: '\f073';
}

.article-category:before {
  content: '\f02b';
}

.article-read-time:before {
  content: '\f02d';
}

.article-content {
  margin-bottom: 2rem;
  line-height: 1.8;
  color: #333;
}

.article-content p {
  margin-bottom: 1rem;
}

.article-content h2,
.article-content h3 {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.article-content img {
  max-width: 100%;
  height: auto;
  margin: 1rem 0;
}

.article-footer {
  display: flex;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

/* 评论区域样式 */
.comment-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
}

.comment-title {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  font-weight: 600;
}

.comment-count {
  color: #3498db;
  font-size: 0.9rem;
}

.comment-form {
  margin-bottom: 2rem;
}

.form-footer {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.comment-list {
  margin-top: 2rem;
}

.comment-item {
  padding: 1rem 0;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 1rem;
  flex-shrink: 0;
}

.comment-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.comment-body {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.comment-author {
  font-weight: 600;
  color: #2c3e50;
}

.comment-time {
  color: #95a5a6;
  font-size: 0.8rem;
}

.comment-actions {
  display: flex;
}

.comment-content {
  color: #333;
  line-height: 1.6;
}

.no-comment {
  text-align: center;
  padding: 2rem 0;
  color: #95a5a6;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style>
