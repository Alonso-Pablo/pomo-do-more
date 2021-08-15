import style from '../../css/components/clock.module.css'
import { ClockProps } from 'ts/types'

const Clock: React.FC<ClockProps> = ({
  buttonPause,
  restartClock,
  timeRest
}) => {
  const oneDigitNum = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const seconds = timeRest % 60
  const minutes = Math.floor(timeRest / 60) % 60

  return (
    <div
      onClick={() => {
        buttonPause.current?.play(), restartClock()
      }}
      className={style.clockShadow}
    >
      <div className={style.clock}>
        <p className={style.timer}>
          {oneDigitNum.includes(minutes) ? 0 : null}
          {minutes}:{oneDigitNum.includes(seconds) ? 0 : null}
          {seconds}
        </p>
      </div>
    </div>
  )
}

export default Clock
