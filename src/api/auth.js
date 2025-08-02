export default {
  login: (credentials) => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.phone === '17719472069' && credentials.password === '123456') {
        resolve({
          data: {
            user: { phone: credentials.phone },
            token: 'mock_jwt_token_' + Math.random().toString(36).substr(2)
          }
        })
      } else {
        reject(new Error('手机号或密码错误'))
      }
    }, 1000)
  }),
  register: (credentials) => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.phone === '17719472069' && credentials.password === '123456') {
        resolve({
          data: {
            user: { phone: credentials.phone },
            token: 'mock_jwt_token_' + Math.random().toString(36).substr(2)
          }
        })
      } else {
        reject(new Error('手机号已存在'))
      }
    }, 1000)
  })
}
