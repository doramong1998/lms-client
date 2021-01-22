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
  background: css`
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
}

export default styles
