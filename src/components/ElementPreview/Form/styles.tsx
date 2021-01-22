import { css } from 'emotion'

const styles = {
  element: css`
    position: absolute;
    &:focus {
      outline: none;
    }
  `,
  hover: css`
    border: 1px dashed var(--primary);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    pointer-events: none;
  `,
  background: css`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-size: cover !important;
    background-attachment: scroll !important;
    background-origin: content-box !important;
    background-position: center center !important;
    background-repeat: no-repeat !important;
  `,
  button: css`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
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
