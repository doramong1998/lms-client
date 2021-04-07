import type { FC } from 'react'
import { Button, Result } from 'antd'
import { history } from 'umi'

const NoFoundPage: FC<{}> = () => (
  <Result
    status="404"
    title="Trang không tồn tại!"
    subTitle="Đường dẫn không đúng hoặc bạn không có quyền truy cập trang web này!"
    extra={
      <Button type="primary"
        onClick={() => history.push('/')}>
        Quay lại
      </Button>
    }
  />
)

export default NoFoundPage
