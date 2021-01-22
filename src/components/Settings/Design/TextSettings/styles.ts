import { css } from 'emotion'

const styles = {
  active: css`
    color: var(--primary) !important;
    font-weight: 600 !important;
  `,
  iconCustom: css`
    padding: 12px !important;
    cursor: pointer;
    &:hover{
        color: var(--primary) !important;
    }
  `,
  textCenter: css`
    text-align: center !important;
    font-weight: bold !important;
  `,
}

export default styles
