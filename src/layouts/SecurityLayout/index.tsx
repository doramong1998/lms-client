import type { FC } from 'react'
import { stringify } from 'querystring'
import { connect, Redirect } from 'umi'
import type { UserAndLogin } from '@/pages/user/login/data'

type Props = {
  children: any
  userAndLogin: UserAndLogin
}

const SecurityLayout: FC<Props> = ({ children, userAndLogin }) => {
  const isLogin = userAndLogin?.accessToken
  const queryString = stringify({
    redirect: window.location.href,
  })

  if (!isLogin && window.location.pathname !== '/user/login') {
    return <Redirect to={`/user/login?${queryString}`} />
  }
  return children
}

export default connect(({ userAndLogin }: { userAndLogin: UserAndLogin }) => ({
  userAndLogin,
}))(SecurityLayout)
