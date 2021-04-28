import type { FC, ReactNode } from 'react'
import React from 'react'
import { Result } from 'antd'
import type { IAuthorityType } from './CheckPermissions'
import check from './CheckPermissions'

import type AuthorizedRoute from './AuthorizedRoute'
import type Secured from './Secured'

type Props = {
  authority: IAuthorityType
  noMatch?: ReactNode
}

type IAuthorizedType = FC<Props> & {
  Secured: typeof Secured
  check: typeof check
  AuthorizedRoute: typeof AuthorizedRoute
}

const Authorized: FC<Props> = ({
  children,
  authority,
  noMatch = (
    <Result
      status="403"
      title="403"
      subTitle="Bạn không có quyền truy cập trang này!"
    />
  ),
}) => {
  const childrenRender: React.ReactNode = typeof children === 'undefined' ? null : children
  const dom = check(authority, childrenRender, noMatch)
  return <>{dom}</>
}

export default Authorized as IAuthorizedType
