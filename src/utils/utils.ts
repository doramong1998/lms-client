import { Modal } from 'antd'
import { parse } from 'querystring'
import { formatMessage } from 'umi'

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\\+\\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\\+\\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\\+~%\\/.\w-_]*)?\??(?:[-\\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export const isUrl = (path: string): boolean => reg.test(path)

export const getPageQuery = () => parse(window.location.href.split('?')[1])

export const API_URL = 'http://149.28.158.115:3000'

export const BUILDER_URL = 'http://recbook-builder.2soft.top'
// export const BUILDER_URL = 'http://localhost:3000'

export const modalConfirmDelete = (onOk?: any) => {
  Modal.confirm({
    title: formatMessage({ id: 'button.delete.selected.confirm' }),
    okText: formatMessage({ id: 'button.yes' }),
    okType: 'danger',
    cancelText: formatMessage({ id: 'button.cancel' }),
    onOk,
  })
}
