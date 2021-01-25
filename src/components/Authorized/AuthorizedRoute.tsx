import { Redirect, Route } from 'umi'

import type { ComponentClass, FC, ReactNode } from 'react'
import React from 'react'
import Authorized from './Authorized'
import type { IAuthorityType } from './CheckPermissions'

type Props = {
  currentAuthority: string
  component: ComponentClass<any, any>
  render: (props: any) => ReactNode
  redirectPath: string
  authority: IAuthorityType
}

const AuthorizedRoute: FC<Props> = ({
  component: Component,
  render,
  authority,
  redirectPath,
  ...rest
}) => (
  <Authorized
    authority={authority}
    noMatch={<Route {...rest}
      render={() => <Redirect to={{ pathname: redirectPath }} />} />}
  >
    <Route
      {...rest}
      render={(props: any) => (Component ? <Component {...props} /> : render(props))}
    />
  </Authorized>
)

export default AuthorizedRoute
