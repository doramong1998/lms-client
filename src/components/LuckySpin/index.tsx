import React, {
  FunctionComponent, useState, useEffect,
} from 'react'
import swal from 'sweetalert'
import './styles.scss'
import { css } from 'emotion'
import { LuckySpinProps } from '../../utils/types/templates'

export interface Props {
  el: LuckySpinProps
}

const LuckySpin: FunctionComponent<Props> = ({ el }) => {
  const [rotate, setRotate] = useState(0)
  const [data, setData] = useState([])
  const [turn, setTurn] = useState(0)
  const [lastValue, setLastValue] = useState(0)

  useEffect(() => {
    const newData:any = []
    el?.listPrize?.split('\n').map((value: string) => value.trim().split('|').map((value: string) => value.trim())).reduce((accumulator, currentValue, index) => {
      const newObject = {
        value: index,
        code: currentValue[0],
        text: currentValue[1],
        percent: currentValue[2],
      }
      newData.push(newObject)
      return newObject
    }, {})
    setData(newData)
    setTurn(el?.turn || 0)
  }, [el])

  const calcSpin = () => {
    if (turn > 0) {
      const dataPercent: any = []
      data.map((item: any) => {
        for (let i = 0; i < parseInt(item.percent || 0, 10); i++) {
          dataPercent.push(item.value)
        }
        return item
      })
      const percent = Math.floor(Math.random() * dataPercent.length)
      const randomRound = Math.floor(Math.random() * 15) + 4
      setRotate(lastValue * 360 + randomRound * 360 + (360 / data?.length) * dataPercent[percent] + (360 / data?.length) / 2)
      const dataSelect: any = data.find((item: any) => item.value === dataPercent[percent])
      const getText = el?.message?.replace('{{coupon_text}}', dataSelect?.text || '').replace('{{coupon_code}}', dataSelect?.code || '').replace('{{spin_turn_left}}', (turn - 1).toString() || '0')
      setTimeout(() => swal(`${getText}`, '', 'success'), 7200)
      setLastValue(randomRound)
      setTurn(turn - 1)
    } else {
      swal('Bạn đã hết lượt quay!', '', 'error')
    }
  }

  const calcRotate = (index: number) => {
    const rotate = (360 / data?.length) * (index)
    return css`
    transform: rotate(-${rotate + (360 / data?.length) / 2}deg) translateY(-50%);
  `
  }

  return (
    <div
      className="container-spin"
    >

      <div className="spin-round" style={{ transform: `rotate(${rotate}deg)` }}>
        <div style={{
          background: `url(${el?.background})`, width: '100%', height: '100%', position: 'absolute', transform: `rotate(${el?.rotateBackground}deg)`,
        }}
        />
        {data?.map((value: any, index: number) => (
          <div
            className={`lucky-item ${calcRotate(index)}`}
            style={{
              textDecorationLine: el?.textDecorationLine,
              textTransform: el?.textTransform,
              padding: `${el?.padding} px`,
              lineHeight: el?.lineHeight,
              letterSpacing: el?.letterSpacing,
            }}
            key={index}
          >
            {value.text}
          </div>
        ))}
      </div>
      <div className="button-start" onClick={() => calcSpin()} style={{ backgroundImage: `url(${el?.button})` }} />
    </div>
  )
}

export default LuckySpin
