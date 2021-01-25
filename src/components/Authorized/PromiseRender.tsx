import type {
  ComponentClass,
  FC,
  ReactNode } from 'react'
import React, {
  cloneElement,
  Component,
  isValidElement,
} from 'react'
import { Spin } from 'antd'
import isEqual from 'lodash/isEqual'
import { isComponentClass } from './Secured'

type Props<T, K> = {
  ok: T
  error: K
  promise: Promise<boolean>
}

type PromiseRenderState = {
  component: ComponentClass | FC
}

export default class PromiseRender<T, K> extends Component<Props<T, K>, PromiseRenderState> {
  state: PromiseRenderState = {
    component: () => null,
  }

  componentDidMount() {
    this.setRenderComponent(this.props)
  }

  shouldComponentUpdate = (nextProps: Props<T, K>, nextState: PromiseRenderState) => {
    const { component } = this.state
    if (!isEqual(nextProps, this.props)) {
      this.setRenderComponent(nextProps)
    }
    if (nextState.component !== component) return true
    return false
  }

  // set render Component : ok or error
  setRenderComponent(props: Props<T, K>) {
    const ok = this.checkIsInstantiation(props.ok)
    const error = this.checkIsInstantiation(props.error)
    props.promise
      .then(() => {
        this.setState({
          component: ok,
        })
        return true
      })
      .catch(() => {
        this.setState({
          component: error,
        })
      })
  }

  // Determine whether the incoming component has been instantiated
  // AuthorizedRoute is already instantiated
  // Authorized  render is already instantiated, children is no instantiated
  // Secured is not instantiated
  checkIsInstantiation = (target: ReactNode | ComponentClass): FC => {
    if (isComponentClass(target)) {
      const Target = target as ComponentClass
      return (props: any) => <Target {...props} />
    }
    if (isValidElement(target)) {
      return (props: any) => cloneElement(target, props)
    }
    return () => target as ReactNode & null
  }

  render() {
    const { ok, error, promise, ...rest } = this.props

    return Component ? (
      <Component {...rest} />
    ) : (
      <div
        style={{
          width: '100%',
          height: '100%',
          margin: 'auto',
          paddingTop: 50,
          textAlign: 'center',
        }}
      >
        <Spin size="large" />
      </div>
    )
  }
}
