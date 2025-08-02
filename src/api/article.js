import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3000',
  timeout: 5000
})

export default {
  // 获取文章列表
  getArticles: () => api.get('/articles'),
  // 获取分类列表
  getCategories: () => api.get('/category'),

  // 新增文章
  createArticle: (data) => api.post('/articles', data),

  // 更新文章
  updateArticle: (id, data) => api.put(`/articles/${id}`, data),

  // 获取文章详情
  getArticle: (id) => api.put(`/articles/${id}`),

  // 删除文章
  deleteArticle: (id) => api.delete(`/articles/${id}`)
}
