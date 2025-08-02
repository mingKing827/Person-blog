<template>
  <div class="article-container">
    <!-- 操作工具栏 -->
    <div class="toolbar">
      <el-button type="primary" @click="handleCreate">新建文章</el-button>
    </div>

    <!-- 数据表格 -->
     <el-table
      :data="paginatedData"
      stripe
      style="width: 100%"
      :header-cell-style="{ background: '#f5f7fa' }"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" min-width="200" />
      <el-table-column prop="excerpt" label="描述" min-width="250" />
      <el-table-column prop="date" label="日期" width="120" />
      <el-table-column prop="category" label="类别" width="120" />
      <el-table-column prop="readTime" label="阅读时间" width="100">
          <template #default="{ row }">
            {{ row.readTime }}分钟
          </template>
        </el-table-column>

      <!-- 操作列 -->
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <el-button size="small" @click="handleEdit(row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <div class="pagination-container">
      <el-pagination
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :page-sizes="[5, 10, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 编辑弹窗 -->
    <el-dialog
      :visible.sync="dialogVisible"
      :title="dialogTitle"
      v-model="dialogVisible"
      width="600px"
      @close="resetForm"
    >
      <el-form :model="formData" label-width="80px" ref="formRef">
        <el-form-item label="标题" prop="title">
          <el-input v-model="formData.title" />
        </el-form-item>
        <el-form-item label="描述" prop="excerpt">
          <el-input v-model="formData.excerpt" type="textarea" rows="3" />
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="formData.date"
            type="date"
            value-format="YYYY-MM-DD"
            placeholder="选择日期"
          />
        </el-form-item>
        <el-form-item label="类别" prop="category">
          <el-select v-model="formData.category" placeholder="请选择">
            <el-option
              v-for="item in categories"
              :key="item"
              :label="item"
              :value="item"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="阅读时间" prop="readTime">
          <el-input v-model="formData.readTime">
            <template #append>分钟</template>
          </el-input>
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submitForm">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import api from '@/api/article'
export default {
  created () {
    api.getArticles().then(response => {
      console.log('后端返回原始数据:', response.data)
      this.tableData = response.data
    })
  },
  name: 'BlogArticle',
  data () {
    return {
      tableData: [],
      dialogVisible: false,
      dialogTitle: '新建文章',
      formData: {
        id: null,
        title: '',
        excerpt: '',
        date: '',
        category: '',
        readTime: ''
      },
      categories: ['前端框架', 'JavaScript', 'CSS', '工程化', '性能优化'],
      currentPage: 1,
      pageSize: 10
    }
  },
  computed: {
    paginatedData () {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.tableData.slice(startIndex, endIndex)
    }
  },
  methods: {
    handleCreate () {
      this.dialogTitle = '新建文章'
      this.dialogVisible = true
    },
    handleEdit (row) {
      this.dialogTitle = '编辑文章'
      this.formData = { ...row }
      this.dialogVisible = true
    },
    async handleDelete (row) {
      try {
        await this.$confirm('确认删除该文章吗？', '提示', {
          type: 'warning'
        })
        // 调用删除接口
        // 优化分页逻辑
        const currentLength = this.paginatedData.length
        this.tableData = this.tableData.filter(item => item.id !== row.id)
        // 如果删除的是当前页的最后一条数据，且不是第一页，则页码减1
        if (currentLength === 1 && this.currentPage > 1) {
          this.currentPage--
        }
        this.$message.success('删除成功')
      } catch (error) {
        console.log('取消删除')
      }
    },
    submitForm () {
      this.$refs.formRef.validate(async (valid) => {
        if (valid) {
          // 调用保存接口
          if (this.formData.id) {
            // 更新操作
            const index = this.tableData.findIndex(item => item.id === this.formData.id)
            this.tableData.splice(index, 1, { ...this.formData })
            this.$message.success('更新成功')
          } else {
            // 新增操作
            await api.createArticle(this.formData)
            this.formData.id = Date.now()
            this.tableData.unshift({ ...this.formData })
            // 新增文章后跳转到第一页
            this.currentPage = 1
            this.$message.success('添加成功')
          }
          this.dialogVisible = false
        }
      })
    },
    resetForm () {
      this.formData = {
        id: null,
        title: '',
        excerpt: '',
        date: '',
        category: '',
        readTime: ''
      }
      this.$refs.formRef.resetFields()
    },
    handleSizeChange (val) {
      this.pageSize = val
    },
    handleCurrentChange (val) {
      this.currentPage = val
    }
  }
}
</script>

<style scoped>
.article-container {
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.toolbar {
  margin-bottom: 20px;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>
