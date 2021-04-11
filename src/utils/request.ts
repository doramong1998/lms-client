// https://github.com/umijs/umi-request
import { extend } from 'umi-request'
import { formatMessage, history } from 'umi'
import { notification } from 'antd'

// Xử lý ngoại lệ
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error
  if (!response) {
    notification.destroy()
    notification.error({
      message: formatMessage({ id: 'error' }),
      description: formatMessage({ id: 'error.network' }),
    })
  }
  if (error?.response?.status === 401) {
    notification.error({
      message: 'Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!',
    })
    history.push('/user/login')
  }

  throw error
}

const request = extend({
// call API = umi-request
  errorHandler,
})

request.interceptors.request.use((url, options) => {
  return {
    url,
    options: {
      ...options,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  }
})

export default request
