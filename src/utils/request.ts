// https://github.com/umijs/umi-request
import { extend } from 'umi-request'
import { formatMessage } from 'umi'
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
