import { css } from 'emotion'

const styles = {
  element: css`
    position: absolute;
    height: auto;
    &:focus {
      outline: none;
    }
  `,
  hoverLine: css`
    border: 1px dashed var(--primary);
    position: absolute;
    width: 100%;
    height:100%;
    top: 0;
    left: 0;
    z-index: 1000;
    pointer-events: none;
  `,
  lineLine: css`
    position: relative;
    width: 100%;
    height:100%;
    overflow: hidden;
  `,
  border: css`
    width: 100%;
    pointer-events: none;
    position:relative;
    height: 100%;
  `,
  overlay: css`
    position: absolute;
    top: 0;
    left: 0;
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
}

export default styles
