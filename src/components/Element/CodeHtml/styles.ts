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
  codeHtml: css`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #f5f5f5;
    color: #828282;
  `,
  content: css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 12px;
  `,
}

export default styles
