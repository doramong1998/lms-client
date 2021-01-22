import { css } from 'emotion'

const styles = {
  section: css`
    width: 100%;
    margin: 0 auto;
    position: relative;
  `,
  background: css`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
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
  hidden: css`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    pointer-events: none;
    background-color: var(--white);
    z-index: 999;
    opacity: 0.8;
    filter: brightness(98%);
  `,
}

export default styles
