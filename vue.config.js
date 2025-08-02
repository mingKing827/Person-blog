module.exports = {
  devServer: {
    proxy: {
      '/articles': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
}
