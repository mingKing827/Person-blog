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
      }
    }
  },
  created () {
    // 获取路由参数中的文章ID
    const id = this.$route.params.id
    // 根据ID获取文章详情
    this.getArticleDetail(id)
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
</style>
