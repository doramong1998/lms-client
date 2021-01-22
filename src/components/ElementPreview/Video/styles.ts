import { css } from 'emotion'

const styles = {
  element: css`
    position: absolute;

    &:focus {
      outline: none;
    }
  `,
  video: css`
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
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
  iframe: css`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  `,
}

export default styles
