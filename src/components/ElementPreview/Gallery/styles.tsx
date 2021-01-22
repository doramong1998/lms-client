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
  gallery: css`
    top: 0;
    left: 0;
    overflow: hidden;
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: auto;
  `,
}

export default styles
