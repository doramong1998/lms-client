import { Modal } from 'antd'
import { parse } from 'querystring'
import { formatMessage } from 'umi'

const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\\+\\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\\+\\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\\+~%\\/.\w-_]*)?\??(?:[-\\+=&;%@.\w_]*)#?(?:[\w]*))?)$/

export const isUrl = (path: string): boolean => reg.test(path)

export const getPageQuery = () => parse(window.location.href.split('?')[1])

export const API_URL = 'http://localhost:3000/api'
export const KEY_API = '51048b28ab891f17a50c22327a4d2414fe42f65d568a0a168712e204de2d975a'
export const VIRUSTOTAL_URL = 'https://www.virustotal.com/vtapi/v2/file'
export const TYPE_DATE = 'DD/MM/YYYY'

export const modalConfirmDelete = (onOk?: any) => {
  Modal.confirm({
    title: formatMessage({ id: 'button.delete.selected.confirm' }),
    okText: formatMessage({ id: 'button.yes' }),
    okType: 'danger',
    cancelText: formatMessage({ id: 'button.cancel' }),
    onOk,
  })
}

export const getParamsFromUrl = (url: string) => {
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
};