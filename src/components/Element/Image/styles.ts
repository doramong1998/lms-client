import { css } from 'emotion'

const styles = {
  element: css`
    position: absolute;

    &:focus {
      outline: none;
    }
  `,
  hover: css`
    border: 1px dashed red;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
    pointer-events: none;
  `,
  cropImage: css`
    border: 1px solid var(--primary);
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 1000;
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
  video: css`
    position: absolute;
    width: 100%;
    height: 100%;
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
}

export default styles
