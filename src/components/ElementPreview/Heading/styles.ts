import { css } from 'emotion'

const styles = {
  element: css`
    position: absolute;

    &:focus {
      outline: none;
    }

    a {
      color: inherit;
      text-decoration: underline;
    }
  `,
  content: css`
    width: 100%;
    outline: none;
    display: inline-block;
    margin: 0;
    word-break: break-word;
  `,
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
