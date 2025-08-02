<template>
  <div class="category-container">
    <div class="category-header">
      <h2>文章分类</h2>
    </div>
    <div class="category-list">
      <el-button
        v-for="category in categories"
        :key="category"
        :type="selectedCategory === category ? 'primary' : 'default'"
        @click="selectCategory(category)"
        size="small"
      >
        {{ category }}
        <span class="category-count">({{ getCategoryCount(category) }})</span>
      </el-button>
    </div>
    <div class="article-list">
      <el-card v-for="article in filteredArticles" :key="article.id" class="article-card">
        <div slot="header" class="clearfix">
          <span>{{ article.title }}</span>
          <span class="article-date">{{ article.date }}</span>
        </div>
        <div class="article-content">
          {{ article.excerpt || article.content || '暂无内容' }}{{ (article.excerpt || article.content) && (article.excerpt.length > 100 || (article.content && article.content.length > 100)) ? '...' : '' }}
        </div>
        <div class="article-footer">
          <span class="article-category">{{ article.category }}</span>
          <el-button type="text" size="small" @click="viewArticle(article.id)">查看详情</el-button>
        </div>
      </el-card>
      <div v-if="filteredArticles.length === 0" class="no-articles">
        暂无该分类的文章
      </div>
    </div>
  </div>
</template>

<script>
import articleApi from '@/api/article.js'

export default {
  name: 'BlogCategory',
  data () {
    return {
      articles: [
      ],
      categories: ['全部', '前端框架', 'JavaScript', 'CSS', 'HTML', '性能优化', '工程化', '安全', '数据库'],
      selectedCategory: '全部'
    }
  },
  computed: {
    filteredArticles () {
      if (this.selectedCategory === '全部') {
        return this.articles
      }
      return this.articles.filter(article => article.category === this.selectedCategory)
    }
  },
  methods: {
    // 获取文章列表
    getArticles () {
      articleApi.getArticles()
        .then(res => {
          this.articles = res.data
        })
        .catch(err => {
          console.error('获取文章失败', err)
          this.$message.error('获取文章失败')
        })
    },
    // 选择分类
    selectCategory (category) {
      this.selectedCategory = category
    },
    // 格式化日期
    formatDate (dateString) {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = String(date.getMonth() + 1).padStart(2, '0')
      const day = String(date.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    },
    // 获取分类计数
    getCategoryCount (category) {
      if (category === '全部') {
        return this.articles.length
      }
      return this.articles.filter(article => article.category === category).length
    },
    // 查看文章详情
    viewArticle (id) {
      this.$router.push(`/article/${id}`)
    }
  },
  mounted () {
    this.getArticles()
  }
}
</script>

<style lang="scss" scoped>
.category-container {
  padding: 20px;
}
.category-header {
  margin-bottom: 20px;
}
.category-list {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.category-count {
  margin-left: 5px;
  font-size: 12px;
  color: #999;
}
.article-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.article-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.article-date {
  float: right;
  font-size: 12px;
  color: #999;
}
.article-content {
  flex: 1;
  margin: 10px 0;
  color: #666;
  line-height: 1.6;
}
.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
  margin-top: 10px;
}
.article-category {
  background-color: #f0f2f5;
  padding: 2px 8px;
  border-radius: 4px;
}
.no-articles {
  text-align: center;
  padding: 40px 0;
  color: #999;
}
</style>
