import { css } from 'emotion'

const styles = {
  noMargin: css`
    p {
      margin: 0px;
    }
    ul {
      margin: 0px;
      padding-inline-start: 0px;
    }
    li{
      margin-left: calc(1.5em + 1px) !important;
    }
  `,
}

export default styles
