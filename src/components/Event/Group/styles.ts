import { css } from 'emotion'

const styles = {
  element: css`
    position: absolute;
    border: 1px dashed var(--primary) !important;
  `,
  container: css`
    position: absolute !important;
    width: 100% !important;
    height: 100% !important;
    top: 0 !important;
    left: 0 !important;
    cursor: default !important;
    margin: auto 0;
    min-width: 15px !important;
  `,
  groupable: css`
    border: 1px dashed var(--primary) !important;
    z-index: 1000;
  `,
}

export default styles
