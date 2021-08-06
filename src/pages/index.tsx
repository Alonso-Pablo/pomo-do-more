import PageLayout from 'components/layout/page'
import Container from 'components/layout/container'
import { useEffect, useRef, useState } from 'react'
import style from '../css/index.module.css'
import { useToggleState } from 'hooks/use-toggle-state'
import TaskList from '../components/common/TaskList'

const HomePage = () => {
  const isFocusTime = useToggleState(false)
  const oneDigitNumb = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)

  const toDoList = useRef(null)
  const clock = useRef(null)
  const startButton = useRef(null)
  const stopButton = useRef(null)

  useEffect(() => {
    if (isFocusTime.isOn) {
      setTimeout(() => {
        if (minutes > 0) {
          if (seconds > 0) {
            return setSeconds(seconds - 1)
          } else {
            setSeconds(59)
            return setMinutes(minutes - 1)
          }
        } else if (seconds > 0) {
          return setSeconds(seconds - 1)
        } else {
          return isFocusTime.handleOff()
        }
      }, 1000)
    }
  }, [isFocusTime, minutes, seconds])

  return (
    <PageLayout headProps={{ title: 'Pomo For Do More | Alonso Pablo' }}>
      <Container ref={toDoList} className={style.todoList}>
        <TaskList />
      </Container>

      <div className={style.clockShadow}>
        <Container ref={clock} className={style.clock}>
          <p className={style.timer}>
            {oneDigitNumb.includes(minutes) ? 0 : null}
            {minutes}:{oneDigitNumb.includes(seconds) ? 0 : null}
            {seconds}
          </p>
        </Container>
      </div>

      <div className={style.separator}></div>

      <div className={style.controllerContainer}>
        <button
          onClick={isFocusTime.handleOn}
          className={style.shadowController}
          ref={startButton}
        >
          <div className={style.topController}>
            <span className={style.textController}>START</span>
          </div>
        </button>

        <button
          onClick={isFocusTime.handleOff}
          className={style.shadowController}
          ref={stopButton}
        >
          <div className={style.topController}>
            <span className={style.textController}>STOP</span>
          </div>
        </button>
      </div>
    </PageLayout>
  )
}

export default HomePage
