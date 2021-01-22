import { css } from 'emotion'

const styles = {
  element: css`
    position: absolute;
    cursor: pointer;
    &:focus {
      outline: none;
    } 
    &:active {
      transform: translateY(3px);
    }

    a {
      color: inherit;
      text-decoration: underline;
    }
  `,
  button: css`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  `,
  background: css`
    height: 100%;
    width: 100%;
    pointer-events: none;
    
  `,
  overlay: css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
  `,
  wrapContent: css`
    position: absolute;
    width: 100% !important;
    height: 100% !important;
    top: 0 !important;
    left: 0 !important;
    display: table;
    user-select: none;
    -webkit-user-select: none;
  `,
  content: css`
    display: table-cell;
    vertical-align: middle;
    width: 100%;
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
