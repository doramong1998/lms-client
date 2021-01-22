import React, {
  FunctionComponent,
} from 'react'
import InnerHTML from 'dangerously-set-html-content'
import { CodeHtmlProps } from '../../../utils/types/templates'

export interface Props {
  el: CodeHtmlProps
}

const CodeHtml: FunctionComponent<Props> = ({ el }) => (
  <InnerHTML html={el?.code || ''} />
)

export default CodeHtml
