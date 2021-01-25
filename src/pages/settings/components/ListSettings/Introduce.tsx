import type { FC } from 'react'
import { Steps } from 'antd'
import { connect } from 'umi'
import { UserAddOutlined, MailOutlined, CheckOutlined } from '@ant-design/icons'

const { Step } = Steps

type Props = {
}

const Introduce: FC<Props> = () => {
  return (
    <Steps>
      <Step status="finish" title="ĐĂNG KÝ TÀI KHOẢN" icon={<UserAddOutlined />} />
      <Step status="finish" title="XÁC THỰC TÀI KHOẢN" description="Click vào link xác thực trong email Landing Page gửi cho bạn sau khi đăng ký tài khoản." icon={<MailOutlined />} />
      <Step status="process" title="NÂNG CẤP TÀI KHOẢN" description="Nâng cấp tài khoản Landing Page với thời hạn tối thiểu 12 tháng để tham gia chương trình." icon={<CheckOutlined />} />
    </Steps>

  )
}

export default connect()(Introduce)
