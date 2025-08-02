const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// 临时数据存储
let articles = [
  {
    id: 1,
    title: 'Vue 3 新特性解析',
    excerpt: '深入探讨Vue 3的核心改进',
    date: '2023-03-20',
    category: '前端框架',
    readTime: 8
  },
  {
    id: 2,
    title: 'Node.js 性能优化技巧',
    excerpt: '提升Node.js应用性能的实用方法',
    date: '2023-04-15',
    category: '后端开发',
    readTime: 10
  },
  {
    id: 3,
    title: '前端安全最佳实践',
    excerpt: '保护Web应用的安全性和用户数据',
    date: '2023-05-10',
    category: '安全',
    readTime: 6
  },
  {
    id: 4,
    title: '数据库索引优化',
    excerpt: '提高数据库查询效率的关键策略',
    date: '2023-06-05',
    category: '数据库',
    readTime: 12
  },
  {
    id: 5,
    title: 'React 组件优化技巧',
    excerpt: '提升React应用性能的有效方法',
    date: '2023-07-01',
    category: '前端框架',
    readTime: 15
  },
  {
    id: 6,
    title: 'TypeScript 高级类型',
    excerpt: '利用TypeScript的高级类型功能',
    date: '2023-08-01',
    category: '前端框架',
    readTime: 18
  },
  {
    id: 7,
    title: 'GraphQL 基础概念',
    excerpt: '理解GraphQL的核心概念和优势',
    date: '2023-09-01',
    category: '前端框架',
    readTime: 20
  },
  {
    id: 8,
    title: 'Docker 容器化应用',
    excerpt: '利用Docker简化应用部署和管理',
    date: '2023-10-01',
    category: '开发工具',
    readTime: 25
  },
  {
    id: 9,
    title: 'Kubernetes 容器编排',
    excerpt: '利用Kubernetes简化容器部署和管理',
    date: '2023-11-01',
    category: '开发工具',
    readTime: 30
  },
  {
    id: 10,
    title: '微服务架构设计',
    excerpt: '构建可扩展和可靠的微服务系统',
    date: '2023-12-01',
    category: '架构设计',
    readTime: 28
  },
  {
    id: 11,
    title: '云原生应用开发',
    excerpt: '利用云平台简化应用部署和管理',
    date: '2024-01-01',
    category: '架构设计',
    readTime: 35
  },
  {
    id: 12,
    title: 'Serverless 架构应用',
    excerpt: '利用无服务器架构简化应用开发和部署',
    date: '2024-02-01',
    category: '架构设计',
    readTime: 40
  },
  {
    id: 13,
    title: '边缘计算应用',
    excerpt: '利用边缘计算提升应用性能和响应速度',
    date: '2024-03-01',
    category: '架构设计',
    readTime: 38
  },
  {
    id: 14,
    title: '物联网应用开发',
    excerpt: '利用物联网技术构建智能应用',
    date: '2024-04-01',
    category: '架构设计',
    readTime: 45
  },
  {
    id: 15,
    title: '数据隐私和安全',
    excerpt: '保护用户数据隐私和安全的重要考虑因素',
    date: '2024-05-01',
    category: '安全',
    readTime: 42
  },
  {
    id: 16,
    title: '数据隐私和安全',
    excerpt: '保护用户数据隐私和安全的重要考虑因素',
    date: '2024-05-01',
    category: '安全',
    readTime: 42
  },
  {
    id: 17,
    title: '数据隐私和安全',
    excerpt: '保护用户数据隐私和安全的重要考虑因素',
    date: '2024-05-01',
    category: '安全',
    readTime: 42
  },
  {
    id: 18,
    title: '数据隐私和安全',
    excerpt: '保护用户数据隐私和安全的重要考虑因素',
    date: '2024-05-01',
    category: '安全',
    readTime: 42
  },
  {
    id: 19,
    title: '数据隐私和安全',
    excerpt: '保护用户数据隐私和安全的重要考虑因素',
    date: '2024-05-01',
    category: '安全',
    readTime: 42
  }
]

// 文章CRUD接口
app.get('/articles', (req, res) => res.json(articles))
app.get('/category', (req, res) => res.json(req.category))
app.post('/articles', (req, res) => {
  const newArticle = { id: Date.now(), ...req.body }
  articles.unshift(newArticle)
  res.json(newArticle)
})
app.put('/articles/:id', (req, res) => {
  const index = articles.findIndex(a => a.id === parseInt(req.params.id))
  articles[index] = { ...articles[index], ...req.body }
  res.json(articles[index])
})
app.delete('/articles/:id', (req, res) => {
  articles = articles.filter(a => a.id !== parseInt(req.params.id))
  res.sendStatus(204)
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
