import style from '../../../css/index.module.css'
import { ClockProps } from 'ts/types'

const Clock: React.FC<ClockProps> = ({
  stopClock,
  stopFocusTime,
  initialMinutes,
  initialSeconds,
  setMinutes,
  setSeconds,
  minutes,
  seconds
}) => {
  const oneDigitNumb = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

  return (
    <div
      onClick={() => {
        stopClock()
        stopFocusTime()
        setTimeout(() => {
          setMinutes(initialMinutes)
          setSeconds(initialSeconds)
        }, 1001)
      }}
      className={style.clockShadow}
    >
      <div className={style.clock}>
        <p className={style.timer}>
          {oneDigitNumb.includes(minutes) ? 0 : null}
          {minutes}:{oneDigitNumb.includes(seconds) ? 0 : null}
          {seconds}
        </p>
      </div>
    </div>
  )
}

export default Clock
