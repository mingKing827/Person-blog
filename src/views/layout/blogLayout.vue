<script>
import api from '@/api/article'
export default {
  name: 'BlogLayout',
  created () {
    // 可以在这里进行一些初始化操作，比如获取文章列表等
    api.getArticles().then(response => {
      this.posts = response.data
    })
  },
  data () {
    return {
      posts: [
      ],
      categories: ['全部', '前端框架', 'JavaScript', 'CSS', 'HTML', '性能优化', '工程化', '安全', '数据库'],
      tags: ['Vue', 'React', 'JavaScript', 'CSS3', 'HTML5', 'Webpack', 'Vite', '性能优化', '响应式设计'],
      selectedCategory: '全部'
    }
  },
  computed: {
    filteredPosts () {
      if (this.selectedCategory === '全部') {
        return this.posts
      }
      return this.posts.filter(post => post.category === this.selectedCategory)
    }
  },
  methods: {
    selectCategory (category) {
      this.selectedCategory = category
    }
  }
}
</script>
<template>
  <div class="blog-container">
    <!-- 导航栏 -->
    <header class="blog-header">
      <div class="container">
        <div class="header-content">
          <h1 class="blog-title"><router-link to="/">Tech Insights</router-link></h1>
          <nav class="main-nav">
            <ul>
              <li><router-link to="/">首页</router-link></li>
              <li><router-link to="/article">文章</router-link></li>
              <li><router-link to="/category">分类</router-link></li>
              <li><router-link to="/about">关于</router-link></li>
            </ul>
          </nav>
          <div class="mobile-menu-toggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="blog-main">
      <div class="container">
        <div class="content-wrapper">
          <!-- 文章列表 -->
          <section class="post-list">
            <div class="category-filter">
              <ul>
                <li v-for="category in categories" :key="category"
                    :class="{ 'active': selectedCategory === category }"
                    @click="selectCategory(category)">
                  {{ category }}
                </li>
              </ul>
            </div>

            <article class="post-card" v-for="post in filteredPosts" :key="post.id">
              <div class="post-content">
                <div class="post-meta">
                  <span class="post-date">{{ post.date }}</span>
                  <span class="post-category">{{ post.category }}</span>
                  <span class="post-read-time">{{ post.readTime }}分钟</span>
                </div>
                <h2 class="post-title"><router-link :to="'/article/' + post.id">{{ post.title }}</router-link></h2>
                <p class="post-excerpt">{{ post.excerpt }}</p>
                <router-link :to="'/article/' + post.id" class="read-more">阅读全文 →</router-link>
              </div>
            </article>
          </section>

          <!-- 侧边栏 -->
          <aside class="blog-sidebar">
            <!-- 作者信息 -->
            <div class="author-card">
              <div class="author-avatar">
                 <img src="@/assets/avatar.png" alt="">
              </div>
              <h3 class="author-name">明</h3>
              <p class="author-bio">前端开发工程师，致力于分享Web开发技术和经验</p>
              <!-- <div class="social-links">
                <a href="#" class="social-icon"><i class="fab fa-github"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-linkedin"></i></a>
                <a href="#" class="social-icon"><i class="fab fa-medium"></i></a>
              </div> -->
            </div>

            <!-- 热门标签 -->
            <div class="sidebar-widget">
              <h3 class="widget-title">热门标签</h3>
              <div class="tag-cloud">
                <a v-for="tag in tags" :key="tag" class="tag-item">{{ tag }}</a>
              </div>
            </div>

            <!-- 最新文章 -->
            <div class="sidebar-widget">
              <h3 class="widget-title">最新文章</h3>
              <ul class="recent-posts">
                <li v-for="post in posts.slice(0, 3)" :key="post.id">
                  <router-link :to="'/article/' + post.id">{{ post.title }}</router-link>
                  <span class="post-date">{{ post.date }}</span>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>

    <!-- 页脚 -->
    <footer class="blog-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-info">
            <h3>Tech Insights</h3>
            <p>分享前端技术，记录学习心得</p>
          </div>
          <div class="footer-links">
            <ul>
              <li><router-link to="/about">关于我</router-link></li>
              <li><router-link to="/contact">联系我</router-link></li>
              <li><router-link to="/privacy">隐私政策</router-link></li>
            </ul>
          </div>
        </div>
        <div class="copyright">
          <p>&copy; {{ new Date().getFullYear() }} Tech Insights. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
<style lang="scss">
/* 基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f8f9fa;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

a {
  text-decoration: none;
  color: #333;
  transition: color 0.3s ease;
}

ul {
  list-style: none;
}

/* 导航栏样式 */
.blog-header {
  background-color: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 80px;
}

.blog-title {
  font-size: 1.8rem;
  font-weight: 700;
}

.blog-title a {
  color: #2c3e50;
}

.main-nav ul {
  display: flex;
}

.main-nav li {
  margin-left: 2rem;
}

.main-nav a {
  font-weight: 500;
  color: #555;
  padding: 8px 0;
  position: relative;
}

.main-nav a:hover {
  color: #3498db;
}

.main-nav a:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #3498db;
  transition: width 0.3s ease;
}

.main-nav a:hover:after {
  width: 100%;
}

.mobile-menu-toggle {
  display: none;
  cursor: pointer;
}

.mobile-menu-toggle span {
  display: block;
  width: 25px;
  height: 3px;
  background-color: #333;
  margin: 5px 0;
  border-radius: 3px;
}

/* 主要内容区样式 */
.blog-main {
  padding: 4rem 0;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
}

/* 分类筛选 */
.category-filter {
  margin-bottom: 2rem;
  overflow-x: auto;
}

.category-filter ul {
  display: flex;
  white-space: nowrap;
  padding-bottom: 10px;
}

.category-filter li {
  margin-right: 1rem;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  background-color: #eaeaea;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-filter li.active,
.category-filter li:hover {
  background-color: #3498db;
  color: #fff;
}

/* 文章卡片 */
.post-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.post-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.post-content {
  padding: 2rem;
}

.post-meta {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  color: #7f8c8d;
  font-size: 0.9rem;
}

.post-date,
.post-category,
.post-read-time {
  display: flex;
  align-items: center;
}

.post-date:before,
.post-category:before,
.post-read-time:before {
  margin-right: 0.5rem;
}

.post-date:before {
  content: '\f073';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}

.post-category:before {
  content: '\f02b';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}

.post-read-time:before {
  content: '\f02d';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
}

.post-date:not(:last-child),
.post-category:not(:last-child) {
  margin-right: 1.5rem;
}

.post-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.post-title a {
  color: #2c3e50;
  transition: color 0.3s ease;
}

.post-title a:hover {
  color: #3498db;
}

.post-excerpt {
  color: #7f8c8d;
  margin-bottom: 1.5rem;
  line-height: 1.7;
}

.read-more {
  display: inline-block;
  color: #3498db;
  font-weight: 500;
  transition: all 0.3s ease;
}

.read-more:hover {
  color: #2980b9;
  transform: translateX(5px);
}

/* 侧边栏样式 */
.blog-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar-widget {
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.widget-title {
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #f1f1f1;
  color: #2c3e50;
}

/* 作者卡片 */
.author-card {
  text-align: center;
}

.author-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 1rem;
  border: 3px solid #f1f1f1;
}

.author-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-name {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
}

.author-bio {
  color: #7f8c8d;
  margin-bottom: 1rem;
}

// .social-links {
//   display: flex;
//   justify-content: center;
//   gap: 1rem;
// }

// .social-icon {
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 36px;
//   height: 36px;
//   border-radius: 50%;
//   background-color: #f1f1f1;
//   color: #333;
//   transition: all 0.3s ease;
// }

// .social-icon:hover {
//   background-color: #3498db;
//   color: #fff;
//   transform: translateY(-3px);
// }

/* 标签云 */
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-item {
  padding: 0.3rem 0.8rem;
  background-color: #f1f1f1;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.tag-item:hover {
  background-color: #3498db;
  color: #fff;
}

/* 最新文章列表 */
.recent-posts li {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed #eee;
}

.recent-posts li:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.recent-posts a {
  display: block;
  margin-bottom: 0.3rem;
  transition: color 0.3s ease;
}

.recent-posts a:hover {
  color: #3498db;
}

.recent-posts .post-date {
  font-size: 0.8rem;
  color: #999;
}

/* 页脚样式 */
.blog-footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 3rem 0 2rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-info h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.footer-info p {
  color: #bdc3c7;
}

.footer-links ul {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.footer-links a {
  color: #bdc3c7;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #3498db;
}

.copyright {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid #34495e;
  color: #bdc3c7;
  font-size: 0.9rem;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .content-wrapper {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .header-content {
    flex-wrap: wrap;
  }

  .main-nav {
    display: none;
    width: 100%;
    margin-top: 1rem;
  }

  .main-nav.active {
    display: block;
  }

  .main-nav ul {
    flex-direction: column;
  }

  .main-nav li {
    margin: 0.5rem 0;
  }

  .mobile-menu-toggle {
    display: block;
  }

  .footer-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .blog-title {
    font-size: 1.5rem;
  }

  .blog-main {
    padding: 2rem 0;
  }

  .post-title {
    font-size: 1.3rem;
  }
}
</style>
