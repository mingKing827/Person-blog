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
  getArticle: (id) => api.get(`/articles/${id}`),

  // 删除文章
  deleteArticle: (id) => api.delete(`/articles/${id}`),

  // 评论相关API
  // 获取文章评论
  getComments: (articleId) => api.get(`/articles/${articleId}/comments`),
  // 添加评论
  addComment: (articleId, data) => api.post(`/articles/${articleId}/comments`, data),
  // 更新评论
  updateComment: (articleId, commentId, data) => api.put(`/articles/${articleId}/comments/${commentId}`, data),
  // 删除评论
  deleteComment: (articleId, commentId) => api.delete(`/articles/${articleId}/comments/${commentId}`)

}
